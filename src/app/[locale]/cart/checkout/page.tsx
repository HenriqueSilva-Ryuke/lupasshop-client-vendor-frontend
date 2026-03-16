'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronRight,
  MapPin,
  Plus,
  Tag,
  Truck,
  CreditCard,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import {
  useCurrentUser,
  useAddresses,
  useCreateAddress,
  useValidateCoupon,
} from '@lupa/api-client/hooks';
import { getApiClient, CREATE_ORDER, CREATE_ORDER_ITEM, PROCESS_PAYMENT } from '@lupa/api-client';
import { PaymentMethodType } from '@lupa/types';
import type { CreateAddressInput, CreateOrderInput, CreateOrderItemInput, ProcessPaymentInput } from '@lupa/types';
import { useCartStore } from '@/stores/cartStore';

type Step = 'review' | 'address' | 'coupon' | 'shipping' | 'payment' | 'confirmation';

const STEPS: Step[] = ['review', 'address', 'coupon', 'shipping', 'payment', 'confirmation'];

const PAYMENT_METHODS: { value: PaymentMethodType; label: string }[] = [
  { value: PaymentMethodType.MULTICAIXA_EXPRESS, label: 'Multicaixa Express' },
  { value: PaymentMethodType.CARD, label: 'Cartão de Crédito/Débito' },
  { value: PaymentMethodType.DIGITAL_WALLET, label: 'Carteira Digital' },
  { value: PaymentMethodType.BANK_TRANSFER, label: 'Transferência Bancária' },
];

const SHIPPING_COST_PER_STORE = 25;

const emptyAddressForm: CreateAddressInput = {
  label: '',
  fullName: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Angola',
  phone: '',
  isDefault: false,
};

export default function CheckoutPage() {
  const locale = useLocale();
  const { items, clearCart } = useCartStore();
  const { data: user } = useCurrentUser();
  const { data: addresses = [], isLoading: addressesLoading } = useAddresses(user?.id, !!user);
  const createAddress = useCreateAddress();
  const validateCoupon = useValidateCoupon();

  const [step, setStep] = useState<Step>('review');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethodType.MULTICAIXA_EXPRESS
  );
  const [confirmedOrderIds, setConfirmedOrderIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<CreateAddressInput>({ ...emptyAddressForm });

  const itemsByStore = useMemo(() => {
    const grouped = new Map<string, typeof items>();
    items.forEach((item) => {
      if (!grouped.has(item.storeId)) grouped.set(item.storeId, []);
      grouped.get(item.storeId)!.push(item);
    });
    return Array.from(grouped.entries());
  }, [items]);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);
  const shippingTotal = itemsByStore.length * SHIPPING_COST_PER_STORE;
  const discountAmount = appliedCoupon?.discountAmount ?? 0;
  const total = subtotal + shippingTotal - discountAmount;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
  const shippingAddressStr = selectedAddress
    ? `${selectedAddress.fullName}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postalCode}`
    : '';

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    validateCoupon.mutate(
      { code: couponCode, purchaseAmount: subtotal },
      {
        onSuccess: (result) => {
          if (result?.isValid && result.coupon) {
            setAppliedCoupon({ code: result.coupon.code, discountAmount: result.discountAmount ?? 0 });
          } else {
            setCouponError(result?.message ?? 'Cupom inválido');
          }
        },
        onError: () => setCouponError('Erro ao validar cupom'),
      }
    );
  };

  const handleFinishOrder = async () => {
    if (!user?.id) return;
    setIsProcessing(true);
    setPaymentError('');
    const client = getApiClient();
    const orderIds: string[] = [];

    try {
      for (const [storeId, storeItems] of itemsByStore) {
        const storeTotal = storeItems.reduce((s, i) => s + i.price * i.quantity, 0);

        const { data: orderData } = await client.mutate<{ createOrder: { id: string } }>({
          mutation: CREATE_ORDER,
          variables: {
            input: {
              userId: user.id,
              storeId,
              totalAmount: storeTotal,
              shippingAddress: shippingAddressStr,
            } satisfies CreateOrderInput,
          },
        });

        const orderId = orderData!.createOrder.id;
        orderIds.push(orderId);

        for (const item of storeItems) {
          await client.mutate({
            mutation: CREATE_ORDER_ITEM,
            variables: {
              input: {
                orderId,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.price,
              } satisfies CreateOrderItemInput,
            },
          });
        }

        await client.mutate({
          mutation: PROCESS_PAYMENT,
          variables: {
            input: {
              orderId,
              amount: storeTotal,
              currency: 'AOA',
              paymentMethodType: selectedPaymentMethod,
            } satisfies ProcessPaymentInput,
          },
        });
      }

      clearCart();
      setConfirmedOrderIds(orderIds);
      setStep('confirmation');
    } catch {
      setPaymentError('Falha ao processar o pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const stepIndex = STEPS.indexOf(step);

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
        <p className="text-lg text-muted-foreground mb-4">Seu carrinho está vazio</p>
          <Link href={`/${locale}/marketplace`} className="text-primary underline">
            Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/${locale}/cart`} className="text-muted-foreground hover:text-primary text-sm">
            ← Voltar ao carrinho
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Finalizar Compra</h1>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {(['review', 'address', 'coupon', 'shipping', 'payment'] as Step[]).map((s, i) => {
              const isDone = STEPS.indexOf(s) < stepIndex;
              const isCurrent = s === step;
              return (
                <div key={s} className="flex items-center gap-2 shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDone
                        ? 'bg-primary text-white'
                        : isCurrent
                          ? 'bg-primary text-white ring-4 ring-primary/20'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  {i < 4 && <ChevronRight className="w-4 h-4 text-border" />}
                </div>
              );
            })}
          </div>
        )}

        {/* ── REVIEW ── */}
        {step === 'review' && (
          <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Revisão do Pedido
            </h2>

            {!user && (
              <div className="mb-6 p-4 bg-accent/30 border border-accent rounded-lg">
                <p className="text-sm text-accent-foreground mb-2">Faça login para continuar o checkout</p>
                <Link
                  href={`/${locale}/auth/login?redirect=/${locale}/cart/checkout`}
                  className="text-primary font-bold underline text-sm"
                >
                  Entrar na minha conta
                </Link>
              </div>
            )}

            {itemsByStore.map(([storeId, storeItems]) => {
              const storeName = storeItems[0]?.storeName || 'Loja';
              return (
                <div key={storeId} className="mb-6 last:mb-0">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-3">{storeName}</p>
                  {storeItems.map((item) => (
                    <div key={item.id} className="flex gap-3 mb-3">
                      <div
                        className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0 border bg-muted"
                        style={{ backgroundImage: item.image ? `url(${item.image})` : undefined }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm shrink-0">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="border-t pt-4 mb-6 space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1">
                <span>Total estimado</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('address')}
              disabled={!user}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Continuar para endereço <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── ADDRESS ── */}
        {step === 'address' && (
          <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Endereço de Entrega
            </h2>

            {addressesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold text-sm">{addr.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                        </p>
                        <p className="text-xs text-muted-foreground">{addr.phone}</p>
                        {addr.isDefault && (
                          <span className="text-xs text-primary font-bold">Padrão</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 text-primary text-sm font-bold mb-6 hover:underline"
                  >
                    <Plus className="w-4 h-4" /> Adicionar novo endereço
                  </button>
                )}

                {showAddressForm && (
                  <div className="rounded-lg border border-border p-4 mb-6">
                    <h3 className="font-semibold mb-3 text-sm">Novo Endereço</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { key: 'fullName', label: 'Nome completo', type: 'text', colSpan: 2 },
                          { key: 'street', label: 'Rua / Endereço', type: 'text', colSpan: 2 },
                          { key: 'city', label: 'Cidade', type: 'text', colSpan: 1 },
                          { key: 'state', label: 'Província', type: 'text', colSpan: 1 },
                          { key: 'postalCode', label: 'Código Postal', type: 'text', colSpan: 1 },
                          { key: 'phone', label: 'Telefone', type: 'tel', colSpan: 1 },
                        ] as { key: keyof CreateAddressInput; label: string; type: string; colSpan: number }[]
                      ).map(({ key, label, type, colSpan }) => (
                        <div key={key} className={colSpan === 2 ? 'col-span-2' : ''}>
                          <label className="block text-xs font-medium mb-1">{label}</label>
                          <input
                            type={type}
                            required
                            value={(addressForm[key] as string) ?? ''}
                            onChange={(e) =>
                              setAddressForm((prev) => ({ ...prev, [key]: e.target.value }))
                            }
                            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          createAddress.mutate(addressForm, {
                            onSuccess: (newAddr) => {
                              setShowAddressForm(false);
                              if (newAddr?.id) setSelectedAddressId(newAddr.id);
                              setAddressForm({ ...emptyAddressForm });
                            },
                          });
                        }}
                        disabled={createAddress.isPending}
                        className="flex items-center gap-1 px-4 py-2 bg-primary text-white text-sm rounded-lg disabled:opacity-50"
                      >
                        {createAddress.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                        Salvar
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 border text-sm rounded-lg hover:bg-muted/50"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep('coupon')}
                  disabled={!selectedAddressId}
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Continuar <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        )}

        {/* ── COUPON ── */}
        {step === 'coupon' && (
          <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5" /> Cupom de Desconto
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Tem um cupom? Insira o código abaixo para aplicar o desconto.
            </p>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError('');
                }}
                placeholder="CÓDIGO DO CUPOM"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={validateCoupon.isPending || !couponCode.trim()}
                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg disabled:opacity-50 flex items-center gap-1"
              >
                {validateCoupon.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Aplicar'
                )}
              </button>
            </div>

            {couponError && <p className="text-xs text-destructive mb-4">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-sm text-primary mb-4 font-semibold">
                ✓ Cupom {appliedCoupon.code} — desconto de R$ {appliedCoupon.discountAmount.toFixed(2)}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('shipping')}
                className="flex-1 border border-border font-bold py-3 rounded-lg hover:bg-muted/50 text-sm text-muted-foreground"
              >
                Pular
              </button>
              <button
                onClick={() => setStep('shipping')}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                Continuar <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── SHIPPING ── */}
        {step === 'shipping' && (
          <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Frete
            </h2>

            <div className="space-y-3 mb-6">
              {itemsByStore.map(([storeId, storeItems]) => {
                const storeName = storeItems[0]?.storeName || 'Loja';
                return (
                  <div
                    key={storeId}
                    className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-sm">{storeName}</p>
                      <p className="text-xs text-muted-foreground">Entrega padrão · 3–7 dias úteis</p>
                    </div>
                    <p className="font-bold text-sm">R$ {SHIPPING_COST_PER_STORE.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete ({itemsByStore.length} loja{itemsByStore.length > 1 ? 's' : ''})</span>
                <span>R$ {shippingTotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-primary">
                  <span>Cupom ({appliedCoupon.code})</span>
                  <span>- R$ {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              Continuar para pagamento <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ── PAYMENT ── */}
        {step === 'payment' && (
          <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Forma de Pagamento
            </h2>

            <div className="space-y-3 mb-6">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPaymentMethod === method.value
                      ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={selectedPaymentMethod === method.value}
                    onChange={() => setSelectedPaymentMethod(method.value)}
                  />
                  <span className="font-semibold text-sm">{method.label}</span>
                </label>
              ))}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total a pagar</span>
                <span className="font-black text-xl">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {paymentError && (
              <p className="text-sm text-destructive mb-4">{paymentError}</p>
            )}

            <button
              onClick={handleFinishOrder}
              disabled={isProcessing}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processando...
                </>
              ) : (
                'Finalizar Pedido'
              )}
            </button>
          </div>
        )}

        {/* ── CONFIRMATION ── */}
        {step === 'confirmation' && (
          <div className="rounded-xl bg-card p-8 shadow-sm border border-border text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Pedido Confirmado!</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Seu pagamento foi processado com sucesso. Em breve você receberá a confirmação.
            </p>

            {confirmedOrderIds.length > 0 && (
              <div className="mb-6 text-sm bg-muted/50 rounded-lg p-4">
                <p className="font-semibold mb-2 text-foreground">
                  {confirmedOrderIds.length > 1 ? 'Pedidos criados:' : 'Pedido criado:'}
                </p>
                {confirmedOrderIds.map((id) => (
                  <p key={id} className="font-mono text-xs text-muted-foreground break-all">
                    {id}
                  </p>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/user/orders`}
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 block"
              >
                Ver Meus Pedidos
              </Link>
              <Link
                href={`/${locale}/marketplace`}
                className="w-full border border-border font-bold py-3 rounded-lg hover:bg-muted/50 block text-foreground"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

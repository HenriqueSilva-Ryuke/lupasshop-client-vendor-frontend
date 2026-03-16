'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
  useCurrentUser,
} from '@lupa/api-client/hooks';
import type { CreateAddressInput } from '@lupa/types';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { inputBaseClass, labelClass, pageContainerClass, sectionTitleClass, surfaceClass } from '@/components/ui/primitives';

const emptyForm: CreateAddressInput = {
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

export default function AddressesPage() {
  const t = useTranslations('user.customer.addresses');
  const { data: user } = useCurrentUser();
  const { data: addresses = [], isLoading } = useAddresses(user?.id, !!user);
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateAddressInput>(emptyForm);

  const handleDelete = (id: string) => {
    deleteAddress.mutate(id);
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress.mutate(id);
  };

  const handleEdit = (address: (typeof addresses)[0]) => {
    setFormData({
      label: address.label ?? '',
      fullName: address.fullName,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAddress.mutate(
        { id: editingId, input: formData },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingId(null);
            setFormData(emptyForm);
          },
        }
      );
    } else {
      createAddress.mutate(formData, {
        onSuccess: () => {
          setShowForm(false);
          setFormData(emptyForm);
        },
      });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const isMutating = createAddress.isPending || updateAddress.isPending;

  const renderAddressForm = () => (
    <div className={`${surfaceClass} p-6 mb-6`}>
      <h3 className="text-xl font-semibold mb-4">
        {editingId ? t('form.edit') : t('addNew')}
      </h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label className={`${labelClass} mb-2`}>{t('form.label')}</label>
          <input
            type="text"
            value={formData.label ?? ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.label')}
          />
        </div>
        <div className="md:col-span-2">
          <label className={`${labelClass} mb-2`}>{t('form.fullName')}</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.fullName')}
          />
        </div>
        <div className="md:col-span-2">
          <label className={`${labelClass} mb-2`}>{t('form.street')}</label>
          <input
            type="text"
            required
            value={formData.street}
            onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.street')}
          />
        </div>
        <div>
          <label className={`${labelClass} mb-2`}>{t('form.city')}</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.city')}
          />
        </div>
        <div>
          <label className={`${labelClass} mb-2`}>{t('form.state')}</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.state')}
          />
        </div>
        <div>
          <label className={`${labelClass} mb-2`}>{t('form.postalCode')}</label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.postalCode')}
          />
        </div>
        <div>
          <label className={`${labelClass} mb-2`}>{t('form.phone')}</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className={inputBaseClass}
            placeholder={t('form.phone')}
          />
        </div>
        <div className="md:col-span-2 flex gap-4">
          <Button
            type="submit"
            disabled={isMutating}
            className="h-11 px-6"
          >
            {isMutating && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('form.save')}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="h-11 px-6"
          >
            {t('form.cancel')}
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={pageContainerClass}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={sectionTitleClass}>{t('title')}</h1>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="h-11 px-4"
          >
            <Plus className="w-5 h-5" />
            {t('addNew')}
          </Button>
        )}
      </div>

      {showForm && renderAddressForm()}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <MapPin className="w-16 h-16 mb-4" />
          <p className="text-lg">{t('noAddresses')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? 'border-primary bg-primary/5' : ''}>
              <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  {address.label && (
                    <span className="text-sm font-semibold text-primary">{address.label}</span>
                  )}
                  {address.isDefault && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {t('default')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(address)}
                    variant="ghost"
                    size="icon"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="text-foreground">
                <p className="font-semibold">{address.fullName}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="mt-2">{address.phone}</p>
              </div>
              {!address.isDefault && (
                <Button
                  onClick={() => handleSetDefault(address.id)}
                  disabled={setDefaultAddress.isPending}
                  variant="link"
                  className="mt-4 px-0"
                >
                  {t('setDefault')}
                </Button>
              )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

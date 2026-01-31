'use client';

import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';
import { useState } from 'react';

export default function StoreSettingsPage() {
  const t = useTranslations('seller.settings');
  const [settings, setSettings] = useState({
    // Payment settings
    pixKey: '',
    acceptsCreditCard: true,
    acceptsBoleto: false,
    // Shipping settings
    usesLupaLogistics: false,
    freeShippingMin: '',
    shippingMethods: [] as string[],
    // Financial settings
    autoPayoutEnabled: true,
  });

  const handleSave = async () => {
    // Call GraphQL mutation to update store settings
    console.log('Saving settings:', settings);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('payment.title')}</h1>

      <div className="space-y-8">
        {/* Payment Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">{t('payment.title')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('payment.pixKey')}</label>
              <input
                type="text"
                value={settings.pixKey}
                onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Digite sua chave PIX"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="creditCard"
                checked={settings.acceptsCreditCard}
                onChange={(e) =>
                  setSettings({ ...settings, acceptsCreditCard: e.target.checked })
                }
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="creditCard" className="text-sm font-medium">
                {t('payment.creditCard')}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="boleto"
                checked={settings.acceptsBoleto}
                onChange={(e) => setSettings({ ...settings, acceptsBoleto: e.target.checked })}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="boleto" className="text-sm font-medium">
                {t('payment.boleto')}
              </label>
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">{t('shipping.title')}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lupaLogistics"
                checked={settings.usesLupaLogistics}
                onChange={(e) =>
                  setSettings({ ...settings, usesLupaLogistics: e.target.checked })
                }
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="lupaLogistics" className="text-sm font-medium">
                {t('shipping.lupaLogistics')}
              </label>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Premium
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('shipping.freeShippingMin')}
              </label>
              <input
                type="number"
                value={settings.freeShippingMin}
                onChange={(e) =>
                  setSettings({ ...settings, freeShippingMin: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Financial Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-2xl font-semibold mb-6">{t('financial.title')}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoPayout"
                checked={settings.autoPayoutEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, autoPayoutEnabled: e.target.checked })
                }
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="autoPayout" className="text-sm font-medium">
                {t('financial.autoPayoutEnabled')}
              </label>
            </div>
            <p className="text-sm text-gray-600">
              Taxa de comissão: <span className="font-semibold">10%</span>
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-primary rounded-lg hover:bg-primary/90"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

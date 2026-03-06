'use client';

import { useTranslations } from 'next-intl';
import { Save } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { inputBaseClass, labelClass, pageContainerClass, sectionTitleClass } from '@/components/ui/primitives';

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
 <div className={pageContainerClass}>
 <h1 className={`${sectionTitleClass} mb-8`}>{t('payment.title')}</h1>

 <div className="space-y-8">
 {/* Payment Settings */}
 <Card>
 <CardHeader>
 <CardTitle>{t('payment.title')}</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-4">
 <div>
 <label className={`${labelClass} mb-2`}>{t('payment.pixKey')}</label>
 <input
 type="text"
 value={settings.pixKey}
 onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
 className={inputBaseClass}
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
 <label htmlFor="creditCard" className={labelClass}>
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
 <label htmlFor="boleto" className={labelClass}>
 {t('payment.boleto')}
 </label>
 </div>
 </div>
 </CardContent>
 </Card>

 {/* Shipping Settings */}
 <Card>
 <CardHeader>
 <CardTitle>{t('shipping.title')}</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
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
 <label htmlFor="lupaLogistics" className={labelClass}>
 {t('shipping.lupaLogistics')}
 </label>
 <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
 Premium
 </span>
 </div>
 <div>
 <label className={`${labelClass} mb-2`}>
 {t('shipping.freeShippingMin')}
 </label>
 <input
 type="number"
 value={settings.freeShippingMin}
 onChange={(e) =>
 setSettings({ ...settings, freeShippingMin: e.target.value })
 }
 className={inputBaseClass}
 placeholder="0.00"
 />
 </div>
 </CardContent>
 </Card>

 {/* Financial Settings */}
 <Card>
 <CardHeader>
 <CardTitle>{t('financial.title')}</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
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
 <label htmlFor="autoPayout" className={labelClass}>
 {t('financial.autoPayoutEnabled')}
 </label>
 </div>
 <p className="text-sm text-muted-foreground">
 Taxa de comissão: <span className="font-semibold">10%</span>
 </p>
 </CardContent>
 </Card>

 {/* Save Button */}
 <div className="flex justify-end">
 <Button
 onClick={handleSave}
 className="h-12 px-6"
 >
 <Save className="w-5 h-5" />
 Salvar Alterações
 </Button>
 </div>
 </div>
 </div>
 );
}

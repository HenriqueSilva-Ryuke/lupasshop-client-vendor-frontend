'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Plus, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

interface Address {
  id: string;
  label?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const t = useTranslations('customer.addresses');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    // Call GraphQL mutation
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = async (id: string) => {
    // Call GraphQL mutation
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const AddressForm = () => (
    <div className="bg-white p-6 rounded-lg border mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {editingId ? t('form.edit') : t('addNew')}
      </h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.label')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.label')}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.fullName')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.fullName')}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.street')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.street')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.city')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.city')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.state')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.state')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.postalCode')}</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.postalCode')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.phone')}</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.phone')}
          />
        </div>
        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            {t('form.save')}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-accent50"
          >
            {t('form.cancel')}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-5 h-5" />
            {t('addNew')}
          </button>
        )}
      </div>

      {showForm && <AddressForm />}

      {addresses.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <MapPin className="w-16 h-16 mb-4" />
          <p className="text-lg">{t('noAddresses')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-6 ${
                address.isDefault ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  {address.label && (
                    <span className="text-sm font-semibold text-primary">{address.label}</span>
                  )}
                  {address.isDefault && (
                    <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded">
                      {t('default')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(address.id);
                      setShowForm(true);
                    }}
                    className="text-gray-600 hover:text-primary"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-gray-700">
                <p className="font-semibold">{address.fullName}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="mt-2">{address.phone}</p>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {t('setDefault')}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

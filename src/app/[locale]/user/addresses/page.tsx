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
  const t = useTranslations('customer.addresses');
  const { data: user } = useCurrentUser();
  const { data: addresses = [], isLoading } = useAddresses(!!user);
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

  const AddressForm = () => (
    <div className="bg-white p-6 rounded-lg border mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {editingId ? t('form.edit') : t('addNew')}
      </h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.label')}</label>
          <input
            type="text"
            value={formData.label ?? ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.label')}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.fullName')}</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.fullName')}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">{t('form.street')}</label>
          <input
            type="text"
            required
            value={formData.street}
            onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.street')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.city')}</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.city')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.state')}</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.state')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.postalCode')}</label>
          <input
            type="text"
            required
            value={formData.postalCode}
            onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.postalCode')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('form.phone')}</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={t('form.phone')}
          />
        </div>
        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            disabled={isMutating}
            className="flex items-center gap-2 px-6 py-2 bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {isMutating && <Loader2 className="w-4 h-4 animate-spin" />}
            {t('form.save')}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border rounded-lg hover:bg-accent50"
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
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-5 h-5" />
            {t('addNew')}
          </button>
        )}
      </div>

      {showForm && <AddressForm />}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : addresses.length === 0 && !showForm ? (
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
                    <span className="ml-2 text-xs bg-primary px-2 py-1 rounded">
                      {t('default')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-gray-600 hover:text-primary"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                    className="text-gray-600 hover:text-red-500 disabled:opacity-50"
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
                  disabled={setDefaultAddress.isPending}
                  className="mt-4 text-sm text-primary hover:underline disabled:opacity-50"
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

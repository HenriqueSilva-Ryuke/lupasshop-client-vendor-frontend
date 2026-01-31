'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES } from '@/graphql/queries';
import { UPDATE_STORE } from '@/graphql/mutations';

export default function SettingsView() {
  const t = useTranslations('dashboard.settings');

  const { data: userData } = useQuery(GET_CURRENT_USER);
  const ownerId = userData?.me?.id;

  const { data: storesData } = useQuery(LIST_STORES, {
    variables: { ownerId },
    skip: !ownerId,
  });

  const store = storesData?.listStores?.[0];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (store) {
      setName(store.name || '');
      setDescription(store.description || '');
    }
  }, [store]);

  const [updateStore, { loading }] = useMutation(UPDATE_STORE);

  const handleSave = async () => {
    if (!store?.id) return;
    await updateStore({
      variables: {
        id: store.id,
        input: {
          name,
          description,
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('manage')}</h1>
        <p className="text-muted-foreground">Configure your store preferences</p>
      </div>

      <div className="bg-card rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <h2 className="text-lg font-bold text-foreground mb-6">{t('profile')}</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Store Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={!store || loading}
              className="px-6 py-2 bg-primary text-black font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

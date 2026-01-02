'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function SettingsView() {
  const t = useTranslations('dashboard.settings');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('manage')}</h1>
        <p className="text-gray-500">Configure your store preferences</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <h2 className="text-lg font-bold text-gray-900 mb-6">{t('profile')}</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" defaultValue="My Awesome Store" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-32" defaultValue="Best store in town..." />
          </div>

          <div className="pt-4">
            <button type="button" className="px-6 py-2 bg-primary text-black font-medium rounded-xl hover:bg-primary-dark transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

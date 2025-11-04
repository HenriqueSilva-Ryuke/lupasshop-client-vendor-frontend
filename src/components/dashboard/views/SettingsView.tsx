'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/stores/authStore';

export default function SettingsView() {
  const t = useTranslations('dashboard');
  const { user, logout } = useAuthStore();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.settings')}</h1>
        <p className="text-gray-600 mt-1">{t('settings.manage')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('settings.profile')}</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nome</p>
            <p className="text-gray-900 font-medium">{user?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-gray-900 font-medium">{user?.email || 'N/A'}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('settings.security')}</h2>
        <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left font-medium text-gray-900">
          <span className="material-icons text-sm mr-2 align-middle">lock</span>
          {t('settings.changePassword')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-red-900 mb-4">{t('settings.danger')}</h2>
        <button
          onClick={() => logout()}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          {t('settings.logout')}
        </button>
      </motion.div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'motion/react';

interface AddButtonProps {
  label: string;
  onClick: () => void;
  icon?: string;
}

export default function AddButton({ label, onClick, icon = 'add' }: AddButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      <span className="material-icons text-sm">{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
}

export function AddButtonMobile({ onClick, icon = 'add' }: Omit<AddButtonProps, 'label'>) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="md:hidden fixed bottom-28 right-4 w-12 h-12 bg-blue-600 text-black rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg z-40"
      title="Add"
    >
      <span className="material-icons">{icon}</span>
    </motion.button>
  );
}

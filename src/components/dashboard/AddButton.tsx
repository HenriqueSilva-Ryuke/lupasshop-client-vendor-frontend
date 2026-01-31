'use client';

import React from 'react';
import { motion } from 'motion/react';
import Button from '@/components/ui/Button';

interface AddButtonProps {
  label: string;
  onClick: () => void;
  icon?: string;
}

export default function AddButton({ label, onClick, icon = 'add' }: AddButtonProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary600 text-black rounded-lg hover:bg-primary700 transition-colors font-medium"
    >
      <span className="material-icons text-sm">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}

export function AddButtonMobile({ onClick, icon = 'add' }: Omit<AddButtonProps, 'label'>) {
  return (
    <Button
      variant="icon"
      onClick={onClick}
      className="md:hidden fixed bottom-28 right-4 w-12 h-12 bg-primary600 text-black rounded-full flex items-center justify-center hover:bg-primary700 transition-colors shadow-lg z-40"
      title="Add"
    >
      <span className="material-icons">{icon}</span>
    </Button>
  );
}

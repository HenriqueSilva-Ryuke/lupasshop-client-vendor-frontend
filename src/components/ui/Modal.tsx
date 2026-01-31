'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useResponsive } from '@/hooks/useResponsive';
import Drawer from './Drawer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
}: ModalProps) {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} title={title}>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-6 border-t pt-4">{footer}</div>}
      </Drawer>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} rounded-lg bg-card p-6 shadow-2xl`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-muted-foreground transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">{children}</div>
            {footer && <div className="mt-6 border-t pt-4">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

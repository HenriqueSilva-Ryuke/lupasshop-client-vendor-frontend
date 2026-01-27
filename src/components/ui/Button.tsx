"use client";

import React, { useRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';
import { Slot } from '@radix-ui/react-slot'; // Importe o Slot

export type ButtonVariant = 'default' | 'inset' | 'slide' | 'icon' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  asChild?: boolean; // Adicione a tipagem aqui
}

const baseClass = 'group inline-flex items-center justify-center font-black uppercase tracking-widest transition-all disabled:opacity-60 disabled:cursor-not-allowed border-2';

const sizeMap: Record<string, string> = {
  sm: 'h-9 px-4 text-[10px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-13 px-8 text-sm',
  xl: 'h-16 px-10 text-base',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', asChild = false, children, ...rest }, ref) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => btnRef.current as HTMLButtonElement);

    // Componente base: se asChild for true, usa o Slot (mantendo as props), senão usa motion.button
    const Component = asChild ? Slot : motion.button;

    // Handlers para efeito Inset
    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };
    const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const r = Math.hypot(rect.width, rect.height) * 1.2;
      btn.style.setProperty('--r', `${r}px`);
    };
    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      btn.style.setProperty('--r', '0px');
    };

    const combinedClass = `${baseClass} ${sizeMap[size] ?? sizeMap.md} ${className}`.trim();

    // Lógica de Renderização de Variantes
    const renderContent = () => {
      if (variant === 'inset') {
        return (
          <>
            <span
              aria-hidden
              className="absolute inset-0 z-0 pointer-events-none transition-[clip-path] duration-500 ease-out bg-zinc-900 bg-white"
              style={{ clipPath: 'circle(var(--r, 0px) at var(--x, 50%) var(--y, 50%))' }}
            />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white group-hover:text-black transition-colors duration-300">
              {children}
            </span>
          </>
        );
      }
      if (variant === 'slide') {
        return (
          <>
            <span className="absolute inset-0 z-0 bg-zinc-900 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white group-hover:text-black transition-colors duration-300">
              {children}
            </span>
          </>
        );
      }
      return children;
    };

    // Estilos de variante
    const variantClasses = {
      default: 'bg-zinc-900 bg-white text-white text-black border-transparent',
      outline: 'border-zinc-900 border-white text-zinc-900 text-white bg-transparent',
      inset: 'relative overflow-hidden border-zinc-900 border-white text-zinc-900 text-white bg-transparent',
      slide: 'relative overflow-hidden border-zinc-900 border-white text-zinc-900 text-white bg-transparent',
      icon: 'p-2 border-2 border-zinc-200 border-zinc-800 rounded-lg hover:border-primary transition-colors text-zinc-900 text-white',
    };

    const DynamicComponent = Component as any;

    return (
      <DynamicComponent
        ref={btnRef}
        onMouseMove={variant === 'inset' ? handleMove : undefined}
        onMouseEnter={variant === 'inset' ? handleEnter : undefined}
        onMouseLeave={variant === 'inset' ? handleLeave : undefined}
        // Props do motion (apenas funcionam se asChild for false)
        {...(!asChild && {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        })}
        className={`${combinedClass} ${variantClasses[variant]}`}
        {...rest}
      >
        {renderContent()}
      </DynamicComponent>
    );
  }
);

Button.displayName = 'Button';
export default Button;
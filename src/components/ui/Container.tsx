import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  fluid?: boolean; // If true, max-width is wider or full
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = 'div',
  fluid = false,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        fluid ? "max-w-[1920px]" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const getButtonClasses = (variant: string, size: string, className?: string) => {
 const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]";
  const variants: Record<string, string> = {
 default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
 destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
 outline: "border-2 border-border bg-card text-foreground hover:border-primary hover:text-primary",
 secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
 ghost: "hover:bg-accent hover:text-accent-foreground",
 link: "text-primary underline-offset-4 hover:underline",
 icon: "border border-border bg-card text-foreground hover:border-primary hover:text-primary",
 inset: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
 slide: "border-2 border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
 landing: "h-12 px-6 rounded-lg border-2 border-border bg-card text-foreground font-black uppercase tracking-[0.12em] hover:border-primary hover:text-primary",
 "landing-primary": "h-12 px-6 rounded-lg bg-primary text-primary-foreground font-black uppercase tracking-[0.12em] hover:bg-primary/90",
 };

 const sizes: Record<string, string> = {
 default: "h-10 px-4",
 sm: "h-9 px-3 text-xs",
 md: "h-10 px-4 text-sm",
 lg: "h-11 px-8",
 xl: "h-12 px-10 text-base",
 icon: "h-10 w-10",
 };

 return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default, className);
};

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 asChild?: boolean;
 variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "icon" | "inset" | "slide" | "landing" | "landing-primary";
 size?: "default" | "sm" | "md" | "lg" | "xl" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
 const Comp = asChild ? Slot : "button";
 return (
 <Comp
 className={getButtonClasses(variant, size, className)}
 ref={ref}
 {...props}
 />
 );
 }
);
Button.displayName = "Button";

export { Button };
export default Button;

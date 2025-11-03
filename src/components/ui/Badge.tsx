import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-800 text-neutral-300',
  success: 'bg-green-900/30 text-green-400 border border-green-800',
  warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800',
  error: 'bg-red-900/30 text-red-400 border border-red-800',
  info: 'bg-blue-900/30 text-blue-400 border border-blue-800',
  brand: 'bg-brand-900/30 text-brand-400 border border-brand-800',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
}: BadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}

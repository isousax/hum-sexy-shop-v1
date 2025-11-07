import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'brand' | 'premium';
type BadgeSize = 'xs' | 'sm' | 'md'; // Adicionei xs para mobile

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
  responsive?: boolean; // Novo prop para controle responsivo
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-700/90 text-neutral-100 backdrop-blur-sm',
  success: 'bg-green-500/90 text-white',
  warning: 'bg-amber-500/90 text-white',
  error: 'bg-red-500/90 text-white',
  info: 'bg-blue-500/90 text-white',
  brand: 'bg-brand-500/90 text-white',
  premium: 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900',
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[10px] font-medium', // Muito compacto para mobile
  sm: 'px-2 py-1 text-xs font-medium',
  md: 'px-2.5 py-1 text-sm font-medium',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  pulse = false,
  responsive = false,
}: BadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium border border-white/10',
        'transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        pulse && 'animate-pulse',
        responsive && 'text-xs sm:text-sm', // Controle responsivo específico
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {icon && (
        <span className="flex-shrink-0 text-inherit">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap truncate max-w-[80px] sm:max-w-none">
        {children}
      </span>
    </motion.span>
  );
}
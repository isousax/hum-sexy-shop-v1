import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hoverable = false, onClick }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-background-elevated rounded-lg border border-neutral-800',
        hoverable && 'cursor-pointer transition-shadow hover:shadow-soft',
        className
      )}
      onClick={onClick}
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-neutral-800', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-neutral-800', className)}>
      {children}
    </div>
  );
}

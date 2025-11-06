import React, { useState, useCallback, useRef } from 'react';
import type { Toast } from '@/types/toast';
import { MAX_TOASTS } from '@/types/toast';
import { ToastContext } from './toast-context';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const duration = toast.duration || 3000;

    setToasts((current) => {
      // Se tem groupKey, verifica se já existe um toast similar
      if (toast.groupKey) {
        const existingIndex = current.findIndex(t => t.groupKey === toast.groupKey);
        
        if (existingIndex !== -1) {
          // Atualiza o toast existente incrementando o contador
          const existing = current[existingIndex];
          const newCount = (existing.count || 1) + 1;
          
          // Limpa o timeout anterior
          const oldTimeout = timeoutRefs.current.get(existing.id);
          if (oldTimeout) {
            clearTimeout(oldTimeout);
          }

          // Atualiza o toast com novo contador
          const updatedToast = {
            ...existing,
            count: newCount,
            message: toast.message || existing.message,
          };

          // Define novo timeout
          const newTimeout = setTimeout(() => {
            setToasts((curr) => curr.filter((t) => t.id !== existing.id));
            timeoutRefs.current.delete(existing.id);
          }, duration);
          
          timeoutRefs.current.set(existing.id, newTimeout);

          return [
            ...current.slice(0, existingIndex),
            updatedToast,
            ...current.slice(existingIndex + 1),
          ];
        }
      }

      // Cria novo toast
      const id = Math.random().toString(36).substring(2);
      const newToast = { ...toast, id, count: toast.groupKey ? 1 : undefined };

      // Define timeout para remover
      const timeout = setTimeout(() => {
        setToasts((curr) => curr.filter((t) => t.id !== id));
        timeoutRefs.current.delete(id);
      }, duration);
      
      timeoutRefs.current.set(id, timeout);

      // Limita o número de toasts simultâneos
      let updatedToasts = [...current, newToast];
      if (updatedToasts.length > MAX_TOASTS) {
        // Remove os toasts mais antigos (que não são agrupados)
        const toRemove = updatedToasts
          .filter(t => !t.groupKey)
          .slice(0, updatedToasts.length - MAX_TOASTS);
        
        toRemove.forEach(t => {
          const timeout = timeoutRefs.current.get(t.id);
          if (timeout) {
            clearTimeout(timeout);
            timeoutRefs.current.delete(t.id);
          }
        });

        updatedToasts = updatedToasts.filter(t => !toRemove.includes(t));
      }

      return updatedToasts;
    });
  }, []);
  const removeToast = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

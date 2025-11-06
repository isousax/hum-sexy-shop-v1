import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAgeGate } from '@/contexts/AgeGateContext';
import { Button } from './Button';

export function AgeGate() {
  const { isVerified, verify } = useAgeGate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVerified) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVerified]);

  if (isVerified) return null;

  const handleVerify = () => {
    setIsExiting(true);
    setTimeout(() => {
      verify();
    }, 500);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full mx-4 p-8 bg-background-elevated border border-neutral-800 rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: isExiting ? 0.9 : 1, y: isExiting ? 20 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-center">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-900/30 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <ShieldCheck className="w-8 h-8 text-brand-400" />
          </motion.div>

          <h1 className="text-2xl font-bold text-neutral-100 mb-4">
            Verificação de Idade
          </h1>

          <p className="text-neutral-400 mb-6">
            Este site contém produtos de natureza adulta. Para continuar, você deve confirmar
            que tem 18 anos ou mais.
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleVerify}
            >
              Tenho 18 anos ou mais
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onClick={handleDecline}
            >
              Sou menor de 18 anos
            </Button>
          </div>

          <p className="text-xs text-neutral-600 mt-6">
            Ao continuar, você concorda que tem idade legal para visualizar este conteúdo
            de acordo com as leis do seu país.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorToastProps {
  message: string | null;
  onDismiss: () => void;
}

export function ErrorToast({ message, onDismiss }: ErrorToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          data-testid="error-toast"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Error</p>
              <p className="text-sm" data-testid="text-error-message">{message}</p>
            </div>
            <button 
              onClick={onDismiss}
              className="ml-4 hover:text-gray-200 transition-colors duration-200"
              data-testid="button-dismiss-error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

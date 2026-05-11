"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  status: "success" | "error" | "warning" | "info";
  duration?: number;
  isClosable?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (options: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...options,
      id,
      duration: options.duration || 5000,
      isClosable: options.isClosable !== false,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }[toast.status];

  return (
    <div
      className={`${bgColor} text-white p-4 rounded-lg shadow-lg max-w-sm min-w-[300px] transform transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {toast.title && (
            <h4 className="font-semibold text-sm mb-1">{toast.title}</h4>
          )}
          {toast.description && (
            <p className="text-sm opacity-90">{toast.description}</p>
          )}
        </div>
        {toast.isClosable && (
          <button
            onClick={() => onRemove(toast.id)}
            className="ml-4 text-white hover:opacity-75 transition-opacity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToasterProvider");
  }
  return context;
}

// Export a default Toaster component for backward compatibility
export function Toaster() {
  return null; // The actual toaster is handled by ToasterProvider
}

// Export toaster function for backward compatibility
export const toaster = {
  success: (title: string, description?: string) => {
    // This is a placeholder - actual implementation should use useToast hook
    console.log('Success:', title, description);
  },
  error: (title: string, description?: string) => {
    console.log('Error:', title, description);
  },
  info: (title: string, description?: string) => {
    console.log('Info:', title, description);
  },
  warning: (title: string, description?: string) => {
    console.log('Warning:', title, description);
  }
};

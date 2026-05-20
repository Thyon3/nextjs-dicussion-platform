"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { IoCheckmarkCircle, IoAlertCircle, IoInformationCircle, IoWarning, IoClose } from "react-icons/io5";

/* ─── Types ──────────────────────────────────────────────────── */
interface ToastOptions {
  title: string;
  description?: string;
  status: "success" | "error" | "warning" | "info";
  duration?: number;
  closable?: boolean;
}

interface Toast extends ToastOptions {
  id: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

/* ─── Global event bus (works outside React) ─────────────────── */
type ToastListener = (options: ToastOptions) => void;
const listeners: ToastListener[] = [];

export const toaster = {
  create: (options: ToastOptions) => {
    listeners.forEach((fn) => fn(options));
  },
};

/* ─── Context ────────────────────────────────────────────────── */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...options,
      id,
      duration: options.duration ?? 5000,
      closable: options.closable !== false,
    };
    setToasts((prev) => [...prev, newToast]);
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Subscribe the React showToast to the global event bus
  useEffect(() => {
    listeners.push(showToast);
    return () => {
      const idx = listeners.indexOf(showToast);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────────── */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToasterProvider");
  return ctx;
}

/* ─── Container ──────────────────────────────────────────────── */
function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
}

/* ─── Item ───────────────────────────────────────────────────── */
const ICON_MAP = {
  success: <IoCheckmarkCircle className="text-[20px] shrink-0" />,
  error: <IoAlertCircle className="text-[20px] shrink-0" />,
  warning: <IoWarning className="text-[20px] shrink-0" />,
  info: <IoInformationCircle className="text-[20px] shrink-0" />,
};

const COLOR_MAP = {
  success: "bg-green-600 border-green-500",
  error: "bg-red-600 border-red-500",
  warning: "bg-yellow-600 border-yellow-500",
  info: "bg-blue-600 border-blue-500",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className={`${COLOR_MAP[toast.status]} border text-foreground px-4 py-3 rounded-[10px] shadow-2xl min-w-[300px] max-w-[400px] flex items-start gap-3 pointer-events-auto animate-in slide-in-from-right duration-300`}
    >
      <div className="mt-0.5">{ICON_MAP[toast.status]}</div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-bold text-[14px] leading-tight">{toast.title}</p>
        )}
        {toast.description && (
          <p className="text-[12px] opacity-90 mt-0.5">{toast.description}</p>
        )}
      </div>
      {toast.closable && (
        <button
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => onRemove(toast.id)}
        >
          <IoClose size={18} />
        </button>
      )}
    </div>
  );
}

// Backward-compat named export
export function Toaster() {
  return null;
}

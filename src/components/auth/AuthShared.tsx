import type { ReactNode } from "react";
import { motion } from "motion/react";

// Shared colours
export const C = {
  bg: "#0E0E0E",
  surface: "#141414",
  surfaceHigh: "#1C1C1C",
  border: "rgba(73,72,71,0.25)",
  borderFocus: "#BD9DFF",
  primary: "#BD9DFF",
  primaryDim: "#8A4CFC",
  muted: "#71717A",
  mutedDim: "#3F3F46",
  text: "#CBD5E1",
  white: "#FFFFFF",
} as const;

// Gradient helpers
export const gradientBg = `linear-gradient(135deg, ${C.primary}, ${C.primaryDim})`;
export const gradientText = `linear-gradient(135deg, ${C.white} 30%, ${C.primary} 100%)`;

// Motion preset
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] },
  }),
};

//  Auth Card
interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`w-full rounded-2xl px-8 py-10 ${className}`}
      style={{ background: C.surface, border: `1px solid ${C.border}` }}
    >
      {children}
    </motion.div>
  );
}

// Field Label
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label
      className="block text-[11px] font-semibold tracking-[0.12em] mb-2"
      style={{ color: C.muted }}
    >
      {children}
    </label>
  );
}

// Text Input
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  rightSlot?: ReactNode;
}

export function TextInput({
  error,
  rightSlot,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        className={`w-full text-sm px-4 py-3 rounded-xl outline-none transition-all duration-150 placeholder:text-[#3F3F46] ${className}`}
        style={{
          background: C.surfaceHigh,
          color: C.text,
          border: `1px solid ${error ? "#EF4444" : C.border}`,
          paddingRight: rightSlot ? "2.75rem" : undefined,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = error ? "#EF4444" : C.borderFocus;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? "rgba(239,68,68,0.12)" : "rgba(189,157,255,0.12)"}`;
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "#EF4444" : C.border;
          e.currentTarget.style.boxShadow = "none";
          props.onBlur?.(e);
        }}
      />
      {rightSlot && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: C.muted }}
        >
          {rightSlot}
        </div>
      )}
      {error && (
        <p className="text-[11px] mt-1.5 px-1" style={{ color: "#EF4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// Primary Button
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function PrimaryButton({
  loading,
  children,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ opacity: disabled || loading ? 1 : 0.9 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      {...(props as object)}
      className="w-full py-4 rounded-xl text-sm font-bold tracking-[0.05em] text-white disabled:opacity-70 transition-opacity flex items-center justify-center gap-2.5"
      style={{
        background: gradientBg,
        boxShadow: "0 0 32px rgba(138,76,252,0.25)",
      }}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white shrink-0"
        />
      )}
      {children}
    </motion.button>
  );
}

// Page Footer
interface AuthFooterProps {
  left?: string;
  links?: { label: string; href: string }[];
}

export function AuthFooter({ left, links }: AuthFooterProps) {
  return (
    <footer
      className="w-full px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto"
      style={{ borderTop: `1px solid ${C.border}` }}
    >
      {left && (
        <p
          className="text-[11px] tracking-widest"
          style={{ color: C.mutedDim }}
        >
          {left}
        </p>
      )}
      {links && links.length > 0 && (
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-widest transition-colors duration-150 hover:text-white"
              style={{ color: C.mutedDim }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  );
}

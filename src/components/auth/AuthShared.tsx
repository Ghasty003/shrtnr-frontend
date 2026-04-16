import type { ReactNode } from "react";
import { motion } from "motion/react";

export const C = {
  bg: "#0E0E0E",
  surface: "#141313",
  surfaceHigh: "#201F1F",
  border: "rgba(73,72,71,0.15)",
  borderFocus: "#BD9DFF",
  primary: "#BD9DFF",
  primaryDim: "#8A4CFC",
  muted: "#6B6A6A",
  mutedDim: "#3D3C3C",
  text: "#CBD5E1",
  white: "#FFFFFF",
} as const;

// Motion preset
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] },
  }),
};

// Auth Card
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
      className={`w-full rounded-2xl px-8 py-10 bg-surface border border-border ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Field Label
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold tracking-[0.12em] mb-2 text-muted">
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
        className={[
          "w-full text-sm px-4 py-3 rounded-xl outline-none transition-all duration-150",
          "bg-surface-container-high text-[#CBD5E1] placeholder:text-muted-dim",
          error
            ? "border border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
            : "border border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(189,157,255,0.12)]",
          rightSlot ? "pr-11" : "",
          className,
        ].join(" ")}
      />
      {rightSlot && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
          {rightSlot}
        </div>
      )}
      {error && <p className="text-[11px] mt-1.5 px-1 text-red-500">{error}</p>}
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
      className="w-full py-4 rounded-xl text-sm font-bold tracking-[0.05em] text-white disabled:opacity-70 transition-opacity flex items-center justify-center gap-2.5 shadow-[0_0_32px_rgba(138,76,252,0.25)] [background:var(--gradient-primary)]"
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

//  Auth Footer
interface AuthFooterProps {
  left?: string;
  links?: { label: string; href: string }[];
}

export function AuthFooter({ left, links }: AuthFooterProps) {
  return (
    <footer className="w-full px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto border-t border-border">
      {left && (
        <p className="text-[11px] tracking-widest text-muted-dim">{left}</p>
      )}
      {links && links.length > 0 && (
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[11px] tracking-widest text-muted-dim transition-colors duration-150 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  );
}

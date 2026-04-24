type LogoVariant = "full" | "wordmark" | "icon";
type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  /** full = icon + wordmark + tagline | wordmark = icon + wordmark | icon = icon only */
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

const SIZE_MAP = {
  sm: {
    icon: "w-7 h-7 rounded-[7px]",
    svg: { width: 14, height: 9 },
    wordmark: "text-[13px]",
    tagline: "text-[8px] mt-[2px]",
    gap: "gap-2",
  },
  md: {
    icon: "w-8 h-8 rounded-[9px]",
    svg: { width: 16, height: 10 },
    wordmark: "text-[15px]",
    tagline: "text-[9px] mt-[3px]",
    gap: "gap-2.5",
  },
  lg: {
    icon: "w-10 h-10 rounded-[11px]",
    svg: { width: 20, height: 12 },
    wordmark: "text-[18px]",
    tagline: "text-[10px] mt-[3px]",
    gap: "gap-3",
  },
} as const;

function LogoIcon({ size = "md" }: { size?: LogoSize }) {
  const s = SIZE_MAP[size];
  return (
    <div
      className={`${s.icon} flex items-center justify-center shrink-0 [background:var(--gradient-primary)]`}
    >
      <svg
        width={s.svg.width}
        height={s.svg.height}
        viewBox="0 0 32 16"
        fill="none"
      >
        <path
          d="M16 8C13 4.5 10 2 6 2a6 6 0 0 0 0 12c4 0 7-3.5 10-6z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M16 8c3 3.5 6 6 10 6a6 6 0 0 0 0-12c-4 0-7 3.5-10 6z"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Logo({
  variant = "full",
  size = "md",
  className = "",
}: LogoProps) {
  const s = SIZE_MAP[size];

  if (variant === "icon") {
    return (
      <div className={className}>
        <LogoIcon size={size} />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <LogoIcon size={size} />
      <div>
        <div
          className={`text-white font-bold leading-none tracking-wide ${s.wordmark}`}
        >
          Shrtnr
        </div>
        {variant === "full" && (
          <div
            className={`font-semibold tracking-[0.15em] uppercase text-muted ${s.tagline}`}
          >
            PRECISION VOID
          </div>
        )}
      </div>
    </div>
  );
}

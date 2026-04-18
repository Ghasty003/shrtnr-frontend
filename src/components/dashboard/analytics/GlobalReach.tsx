import { motion } from "motion/react";
import { useAnalyticsCountries } from "@/hooks/useAnalytics";
import { useAnalyticsStore } from "@/store/analyticsStore";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.07,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

function toFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function countryName(code: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 mb-6 animate-pulse">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-6 h-5 rounded bg-white/[0.07] shrink-0" />
          <div className="flex-1 flex items-center justify-between gap-2">
            <div className="h-3 w-24 rounded bg-white/[0.07]" />
            <div className="h-3 w-14 rounded bg-white/[0.07]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GlobalReach() {
  const { range } = useAnalyticsStore();
  const { data: countries, isLoading } = useAnalyticsCountries(range);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={8}
      className="rounded-xl p-6 bg-surface-container"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">Global Reach</h2>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 mb-6">
          {countries?.map((c) => (
            <div key={c.country} className="flex items-center gap-3">
              <span className="text-xl leading-none shrink-0">
                {toFlag(c.country)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] text-white truncate">
                    {countryName(c.country)}
                  </span>
                  <span className="text-[13px] font-semibold text-white shrink-0">
                    {c.count.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative world map */}
      <div
        className="w-full h-22.5 rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1A1919 0%, #0E0E0E 100%)",
        }}
      >
        <svg
          viewBox="0 0 500 120"
          className="w-full h-full opacity-20"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 180 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 30) * 17 + 8}
              cy={Math.floor(i / 30) * 22 + 12}
              r="2"
              fill="#BD9DFF"
              opacity={(i * 7 + 13) % 10 > 4 ? 0.8 : 0.15}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

import { motion } from "motion/react";
import { useLinkCountries } from "@/hooks/useLinkCountries";

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

// Convert ISO 3166-1 alpha-2 code to flag emoji
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
    <div className="flex flex-col gap-5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-5 rounded bg-white/[0.07]" />
              <div className="h-3 w-24 rounded bg-white/[0.07]" />
            </div>
            <div className="h-3 w-20 rounded bg-white/[0.07]" />
          </div>
          <div className="h-1 rounded-full bg-white/[0.07]" />
        </div>
      ))}
    </div>
  );
}

interface TopCountriesProps {
  slug: string;
}

export default function TopCountries({ slug }: TopCountriesProps) {
  const { data, isLoading } = useLinkCountries(slug);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">Top Countries</h2>

      {isLoading && <Skeleton />}

      {!isLoading && data?.length === 0 && (
        <p className="text-[13px] text-muted">No country data yet.</p>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-5">
          {data?.map((c, i) => (
            <div key={c.country}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[18px] leading-none">
                    {toFlag(c.country)}
                  </span>
                  <span className="text-[13px] text-white">
                    {countryName(c.country)}
                  </span>
                </div>
                <span className="text-[12.5px] font-semibold text-muted">
                  {c.count.toLocaleString()} ({c.pct}%)
                </span>
              </div>
              <div className="h-1 rounded-full bg-surface-container-high overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

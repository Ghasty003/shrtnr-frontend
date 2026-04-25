import { motion } from "motion/react";
import { useAnalyticsTopLinks } from "@/hooks/useAnalytics";
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

function timeAgo(iso: string) {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days === 0) return "Created today";
  if (days === 1) return "Created yesterday";
  if (days < 7) return `Created ${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `Created ${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-0.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-3 py-3.5 rounded-xl animate-pulse"
        >
          <div className="w-7 h-7 rounded-lg bg-white/[0.07] shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-40 rounded bg-white/[0.07]" />
            <div className="h-2.5 w-24 rounded bg-white/[0.07]" />
          </div>
          <div className="text-right space-y-1.5">
            <div className="h-3 w-12 rounded bg-white/[0.07]" />
            <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TopPerformingLinks() {
  const { range } = useAnalyticsStore();
  const { data: links, isLoading } = useAnalyticsTopLinks(range);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[1rem] font-bold text-white">
          Top Performing Links
        </h2>
        <button className="text-[11px] font-semibold text-primary hover:opacity-80 transition-opacity duration-150">
          View All
        </button>
      </div>

      {isLoading && <Skeleton />}

      {!isLoading && links?.length === 0 && (
        <p className="text-[13px] text-muted py-4 text-center">
          No link data yet.
        </p>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-0.5">
          {links?.map((link, i) => (
            <motion.div
              key={link.short_code}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6 + i * 0.5}
              className="flex items-center gap-4 px-3 py-3.5 rounded-xl transition-colors duration-150 hover:bg-surface-container-high"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-surface-container-high text-[11px] font-bold text-muted">
                {link.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">
                  {import.meta.env.VITE_API_URL}/{link.short_code}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  {timeAgo(link.created_at)}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-bold text-white">
                  {link.clicks.toLocaleString()}
                </div>
                <div
                  className={`text-[11px] font-semibold mt-0.5 ${link.positive ? "text-green-500" : "text-red-400"}`}
                >
                  {link.positive ? "+" : ""}
                  {link.delta}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

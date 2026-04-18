import { IconLightbulb } from "@/utils/icons";
import { motion } from "motion/react";
import { useAnalyticsReferrers } from "@/hooks/useAnalytics";
import { useAnalyticsStore } from "@/store/analyticsStore";
import type { ReferrerData } from "@/api/analytics";

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

const SOURCE_COLOURS = ["#BD9DFF", "#7B5FD4", "#5B44A8", "#3D2E7C", "#2A1F5C"];

function getSourceLabel(r: ReferrerData): string {
  if (!r.referrer) return "DIRECT TRAFFIC";
  try {
    const host = new URL(r.referrer).hostname.replace(/^www\./, "");
    if (
      host.includes("twitter.com") ||
      host.includes("t.co") ||
      host.includes("x.com")
    )
      return "TWITTER / X";
    if (host.includes("google.")) return "SEARCH ENGINES";
    if (host.includes("linkedin.")) return "LINKEDIN";
    return host.toUpperCase();
  } catch {
    return r.referrer.toUpperCase();
  }
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2.5 w-28 rounded bg-white/[0.07]" />
            <div className="h-2.5 w-8 rounded bg-white/[0.07]" />
          </div>
          <div className="h-1.25 rounded-full bg-white/[0.07]" />
        </div>
      ))}
    </div>
  );
}

export default function TrafficSources() {
  const { range } = useAnalyticsStore();
  const { data: referrers, isLoading } = useAnalyticsReferrers(range);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="rounded-xl p-6 bg-surface-container flex flex-col gap-5"
    >
      <h2 className="text-[1rem] font-bold text-white">Traffic Sources</h2>

      {isLoading && <Skeleton />}

      {!isLoading && (
        <div className="flex flex-col gap-5">
          {referrers?.map((r, i) => (
            <div key={r.referrer ?? "direct"}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10.5px] font-semibold tracking-widest text-muted">
                  {getSourceLabel(r)}
                </span>
                <span className="text-[11px] font-bold text-white">
                  {r.pct}%
                </span>
              </div>
              <div className="h-1.25 rounded-full bg-surface-container-high overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: SOURCE_COLOURS[i % SOURCE_COLOURS.length],
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${r.pct}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-1 rounded-xl p-4 bg-surface-container-high flex items-start gap-3">
        <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 bg-primary/15 mt-px">
          <IconLightbulb className="text-primary" />
        </div>
        <p className="text-[12px] leading-relaxed text-muted">
          Social referral traffic is up{" "}
          <span className="text-white font-semibold">12%</span> this month.
          Twitter continues to be your strongest outbound channel.
        </p>
      </div>
    </motion.div>
  );
}

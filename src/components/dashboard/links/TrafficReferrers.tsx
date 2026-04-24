import { motion } from "motion/react";
import { useLinkReferrers } from "@/hooks/useLinkReferrers";
import { IconBolt, IconSearch, IconTwitter, IconGlobe } from "@/utils/icons";
import type { ReactNode } from "react";

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

interface ReferrerDisplay {
  name: string;
  sub: string;
  icon: ReactNode;
  iconBg: string;
}

function parseReferrer(referrer: string | null): ReferrerDisplay {
  if (!referrer) {
    return {
      name: "Direct",
      sub: "ORGANIC ENTRY",
      icon: <IconBolt />,
      iconBg: "bg-primary/15 text-primary",
    };
  }
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (
      host.includes("twitter.com") ||
      host.includes("t.co") ||
      host.includes("x.com")
    )
      return {
        name: "Twitter / X",
        sub: "SOCIAL TRAFFIC",
        icon: <IconTwitter />,
        iconBg: "bg-sky-500/15 text-sky-400",
      };
    if (host.includes("google."))
      return {
        name: "Google Search",
        sub: "SEARCH ENGINE",
        icon: <IconSearch />,
        iconBg: "bg-green-500/15 text-green-400",
      };
    return {
      name: host,
      sub: "REFERRAL",
      icon: <IconGlobe />,
      iconBg: "bg-white/10 text-muted",
    };
  } catch {
    return {
      name: referrer,
      sub: "REFERRAL",
      icon: <IconGlobe />,
      iconBg: "bg-white/10 text-muted",
    };
  }
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-4 rounded-xl bg-surface-container-high animate-pulse"
        >
          <div className="w-9.5 h-9.5 rounded-[10px] bg-white/[0.07] shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-24 rounded bg-white/[0.07]" />
            <div className="h-2.5 w-16 rounded bg-white/[0.07]" />
          </div>
          <div className="space-y-1.5 text-right">
            <div className="h-4 w-12 rounded bg-white/[0.07]" />
            <div className="h-2.5 w-8 rounded bg-white/[0.07]" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface TrafficReferrersProps {
  slug: string;
}

export default function TrafficReferrers({ slug }: TrafficReferrersProps) {
  const { data, isLoading } = useLinkReferrers(slug);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4.5}
      className="rounded-xl p-6 bg-surface-container h-full"
    >
      <h2 className="text-[1rem] font-bold text-white mb-5">
        Traffic Referrers
      </h2>

      {isLoading && <Skeleton />}

      {!isLoading && data?.length === 0 && (
        <p className="text-[13px] text-muted">No referrer data yet.</p>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-3">
          {data?.map((r, i) => {
            const display = parseReferrer(r.referrer);
            return (
              <motion.div
                key={r.referrer ?? "direct"}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5 + i * 0.3}
                className="flex items-center gap-3 px-4 py-4 rounded-xl bg-surface-container-high"
              >
                <div
                  className={`w-9.5 h-9.5 rounded-[10px] flex items-center justify-center shrink-0 ${display.iconBg}`}
                >
                  {display.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-white leading-none mb-0.75 truncate">
                    {display.name}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-muted">
                    {display.sub}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[15px] font-bold text-white leading-none">
                    {r.count.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">{r.pct}%</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

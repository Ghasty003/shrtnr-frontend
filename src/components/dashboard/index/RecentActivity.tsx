import { motion } from "motion/react";
import { useActivity } from "@/hooks/useActivity";
import type { ActivityEntry } from "@/api/url";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.065,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const EVENT_CONFIG: Record<
  string,
  { label: string; colour: string; dot: string }
> = {
  URL_SHORTENED: {
    label: "Link shortened",
    colour: "text-primary",
    dot: "bg-primary",
  },
  URL_REDIRECTED: {
    label: "Link visited",
    colour: "text-blue-400",
    dot: "bg-blue-400",
  },
  LOGIN_SUCCESS: {
    label: "Signed in",
    colour: "text-green-400",
    dot: "bg-green-400",
  },
  LOGOUT: { label: "Signed out", colour: "text-muted", dot: "bg-muted" },
  LOGOUT_ALL: {
    label: "All sessions revoked",
    colour: "text-red-400",
    dot: "bg-red-400",
  },
  TOKEN_REFRESHED: {
    label: "Session refreshed",
    colour: "text-muted",
    dot: "bg-muted",
  },
  TOKEN_REUSE_DETECTED: {
    label: "Suspicious login",
    colour: "text-red-400",
    dot: "bg-red-400",
  },
};

function fallbackConfig(eventType: string) {
  return {
    label: eventType.replace(/_/g, " ").toLowerCase(),
    colour: "text-muted",
    dot: "bg-muted",
  };
}

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function ActivityRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-1.5 h-1.5 rounded-full bg-white/[0.07] shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-28 rounded bg-white/[0.07]" />
        <div className="h-2.5 w-20 rounded bg-white/[0.07]" />
      </div>
      <div className="h-2.5 w-12 rounded bg-white/[0.07]" />
    </div>
  );
}

function ActivityRow({
  entry,
  index,
}: {
  entry: ActivityEntry;
  index: number;
}) {
  const config =
    EVENT_CONFIG[entry.eventType] ?? fallbackConfig(entry.eventType);
  const meta = entry.meta as Record<string, string> | null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={9 + index * 0.5}
      className="flex items-center gap-3 py-3 border-t border-border first:border-t-0"
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[12.5px] font-semibold ${config.colour}`}>
          {config.label}
        </p>
        {meta?.long_url && (
          <p className="text-[11px] text-muted truncate mt-0.5">
            {meta.long_url}
          </p>
        )}
      </div>
      <span className="text-[11px] text-muted shrink-0">
        {timeAgo(entry.createdAt)}
      </span>
    </motion.div>
  );
}

export default function RecentActivity() {
  const { data: activity, isLoading, isError } = useActivity(5);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={8}
      className="rounded-xl p-5 bg-surface-container"
    >
      <h2 className="text-[1.25rem] font-bold text-white mb-1">
        Recent Activity
      </h2>
      <p className="text-[12px] text-muted mb-4">Your last 5 actions</p>

      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <ActivityRowSkeleton key={i} />
        ))}

      {isError && (
        <p className="text-[13px] text-muted py-4 text-center">
          Failed to load activity.
        </p>
      )}

      {!isLoading && !isError && activity?.length === 0 && (
        <p className="text-[13px] text-muted py-4 text-center">
          No activity yet.
        </p>
      )}

      {!isLoading &&
        activity?.map((entry, i) => (
          <ActivityRow key={entry.id} entry={entry} index={i} />
        ))}
    </motion.div>
  );
}

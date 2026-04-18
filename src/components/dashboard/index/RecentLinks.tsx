import { IconDownload, IconEdit, IconFilter, IconTrash } from "@/utils/icons";
import { motion } from "motion/react";
import { useLinks } from "@/hooks/useLinks";
import type { ShortUrl } from "@/api/url";

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

const COL_WIDTHS = "1fr 90px 80px 90px 72px";

// Deterministic favicon colour from short_code
const FAVICON_COLOURS = ["#EF4444", "#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"];
function faviconColor(short_code: string) {
  const idx = short_code.charCodeAt(0) % FAVICON_COLOURS.length;
  return FAVICON_COLOURS[idx];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return [
    d.toLocaleString("en", { month: "short" }),
    `${d.getDate()}, ${d.getFullYear()}`,
  ];
}

function LinkRowSkeleton() {
  return (
    <div
      className="grid items-center px-5 py-4 border-t border-border animate-pulse"
      style={{ gridTemplateColumns: COL_WIDTHS }}
    >
      <div className="flex items-center gap-2.5 pr-4">
        <div className="w-7 h-7 rounded-[7px] bg-white/[0.07] shrink-0" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-3 rounded bg-white/[0.07] w-28" />
          <div className="h-2.5 rounded bg-white/[0.07] w-40" />
        </div>
      </div>
      <div>
        <div className="h-6 w-12 rounded-md bg-white/[0.07]" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-8 rounded bg-white/[0.07]" />
        <div className="h-2.5 w-14 rounded bg-white/[0.07]" />
      </div>
      <div>
        <div className="h-4 w-14 rounded bg-white/[0.07]" />
      </div>
      <div className="flex gap-1.5">
        <div className="w-7 h-7 rounded-md bg-white/[0.07]" />
        <div className="w-7 h-7 rounded-md bg-white/[0.07]" />
      </div>
    </div>
  );
}

function LinkRow({ link, index }: { link: ShortUrl; index: number }) {
  const color = faviconColor(link.short_code);
  const [month, dayYear] = formatDate(link.created_at);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={7 + index * 0.5}
      className="grid items-center px-5 py-4 border-t border-border"
      style={{ gridTemplateColumns: COL_WIDTHS }}
    >
      <div className="flex items-center gap-2.5 min-w-0 pr-4">
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0"
          style={{ background: color + "22" }}
        >
          <div
            className="w-2.5 h-2.5 rounded-[3px]"
            style={{ background: color }}
          />
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white truncate">
            shrt.nr/{link.short_code}
          </div>
          <div className="text-[11px] truncate mt-px text-muted">
            {link.long_url}
          </div>
        </div>
      </div>

      <div>
        <span className="inline-block text-[12px] font-semibold px-2 py-0.75 rounded-md bg-surface-container-high text-[#ABABAB]">
          {(link._count?.clicks ?? 0).toLocaleString()}
        </span>
      </div>

      <div className="text-[11px] font-medium leading-tight text-muted">
        <span>{month}</span>
        <br />
        <span>{dayYear}</span>
      </div>

      <div>
        <span className="text-[11px] font-bold tracking-wide flex items-center gap-1.5 text-green-500">
          <span className="w-1.25 h-1.25 rounded-full bg-green-500 shrink-0 inline-block" />
          ACTIVE
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-white">
          <IconEdit />
        </button>
        <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-red-400">
          <IconTrash />
        </button>
      </div>
    </motion.div>
  );
}

export default function RecentLinks() {
  const { data: links, isLoading, isError } = useLinks(5);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
      <div className="flex items-center justify-between mb-4.5">
        <h2 className="text-[1.25rem] font-bold text-white">Recent Links</h2>
        <div className="flex items-center gap-2">
          <button className="p-1.75 rounded-lg bg-surface-container text-muted transition-colors duration-150 hover:text-white">
            <IconFilter />
          </button>
          <button className="p-1.75 rounded-lg bg-surface-container text-muted transition-colors duration-150 hover:text-white">
            <IconDownload />
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-container">
        {/* Column headers */}
        <div
          className="grid items-center px-5 py-3"
          style={{ gridTemplateColumns: COL_WIDTHS }}
        >
          {["LINK", "CLICKS", "DATE", "STATUS", "ACTIONS"].map((col) => (
            <span
              key={col}
              className="text-[10.5px] font-semibold tracking-widest text-muted"
            >
              {col}
            </span>
          ))}
        </div>

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <LinkRowSkeleton key={i} />)}

        {isError && (
          <div className="px-5 py-8 text-center border-t border-border">
            <p className="text-[13px] text-muted">Failed to load links.</p>
          </div>
        )}

        {!isLoading && !isError && links?.length === 0 && (
          <div className="px-5 py-8 text-center border-t border-border">
            <p className="text-[13px] text-muted">
              No links yet. Shorten your first URL above.
            </p>
          </div>
        )}

        {!isLoading &&
          links?.map((link, i) => (
            <LinkRow key={link.id} link={link} index={i} />
          ))}

        <div className="py-3.5 text-center border-t border-border">
          <button className="text-[11px] font-semibold tracking-widest uppercase text-muted transition-colors duration-150 hover:text-white">
            VIEW ALL LINKS
          </button>
        </div>
      </div>
    </motion.div>
  );
}

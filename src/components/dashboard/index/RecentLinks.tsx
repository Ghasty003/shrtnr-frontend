import { IconDownload, IconEdit, IconFilter, IconTrash } from "@/utils/icons";
import { motion } from "motion/react";

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

const LINKS = [
  {
    id: 1,
    short: "shrt.nr/dev-repo",
    long: "github.com/shrtnr-app/core-engine",
    clicks: 1240,
    date: ["Oct", "12, 2023"],
    faviconColor: "#EF4444",
  },
  {
    id: 2,
    short: "shrt.nr/docs",
    long: "notion.so/shrtnr-team/documentation",
    clicks: 856,
    date: ["Oct", "11, 2023"],
    faviconColor: "#3B82F6",
  },
  {
    id: 3,
    short: "shrt.nr/portfolio",
    long: "dribbble.com/alex-design/shots/2023",
    clicks: 3120,
    date: ["Oct", "09, 2023"],
    faviconColor: "#8B5CF6",
  },
];

export default function RecentLinks() {
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
          style={{ gridTemplateColumns: "1fr 90px 80px 90px 72px" }}
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

        {/* Rows */}
        {LINKS.map((link, i) => (
          <motion.div
            key={link.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={7 + i * 0.5}
            className="grid items-center px-5 py-4 border-t border-border"
            style={{ gridTemplateColumns: "1fr 90px 80px 90px 72px" }}
          >
            {/* Link col */}
            <div className="flex items-center gap-2.5 min-w-0 pr-4">
              <div
                className="w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0"
                style={{ background: link.faviconColor + "22" }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-[3px]"
                  style={{ background: link.faviconColor }}
                />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white truncate">
                  {link.short}
                </div>
                <div className="text-[11px] truncate mt-px text-muted">
                  {link.long}
                </div>
              </div>
            </div>

            {/* Clicks */}
            <div>
              <span className="inline-block text-[12px] font-semibold px-2 py-0.75 rounded-md bg-surface-container-high text-[#ABABAB]">
                {link.clicks.toLocaleString()}
              </span>
            </div>

            {/* Date */}
            <div className="text-[11px] font-medium leading-tight text-muted">
              <span>{link.date[0]}</span>
              <br />
              <span>{link.date[1]}</span>
            </div>

            {/* Status */}
            <div>
              <span className="text-[11px] font-bold tracking-wide flex items-center gap-1.5 text-green-500">
                <span className="w-1.25 h-1.25 rounded-full bg-green-500 shrink-0 inline-block" />
                ACTIVE
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-white">
                <IconEdit />
              </button>
              <button className="p-1.5 rounded-md text-muted transition-colors duration-150 hover:text-red-400">
                <IconTrash />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Footer */}
        <div className="py-3.5 text-center border-t border-border">
          <button className="text-[11px] font-semibold tracking-widest uppercase text-muted transition-colors duration-150 hover:text-white">
            VIEW ALL LINKS
          </button>
        </div>
      </div>
    </motion.div>
  );
}

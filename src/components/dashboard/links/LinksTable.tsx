import {
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconShare,
  IconTrash,
} from "@/utils/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
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
    id: "campaign-alpha",
    short: "shrt.nr/campaign-alpha",
    long: "https://marketing.global-editorial.io/...",
    clicks: 12402,
    unique: 8192,
    status: "ACTIVE" as const,
    created: "Oct 24, 2023",
  },
  {
    id: "internal-docs",
    short: "shrt.nr/internal-docs",
    long: "https://notion.so/editorial-engineer...",
    clicks: 458,
    unique: 102,
    status: "DISABLED" as const,
    created: "Oct 22, 2023",
  },
  {
    id: "beta-access",
    short: "shrt.nr/beta-access",
    long: "https://app.hyperprecision.io/auth/...",
    clicks: 3122,
    unique: 2840,
    status: "ACTIVE" as const,
    created: "Oct 20, 2023",
  },
];

type FilterTab = "ALL" | "ACTIVE" | "DISABLED";
interface LinksTableProps {
  filter: FilterTab;
}

export default function LinksTable({ filter }: LinksTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalPages = 84;

  const filtered = LINKS.filter((l) => filter === "ALL" || l.status === filter);

  const pageNums = [1, 2, 3];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
      className="rounded-xl overflow-hidden bg-surface-container mb-6"
    >
      {/* Column headers */}
      <div
        className="grid items-center px-5 py-3.5"
        style={{ gridTemplateColumns: "1fr 200px 120px 130px 100px" }}
      >
        {["LINK DETAILS", "PERFORMANCE", "STATUS", "CREATED", "ACTIONS"].map(
          (col) => (
            <span
              key={col}
              className="text-[10.5px] font-semibold tracking-widest text-muted"
            >
              {col}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      {filtered.map((link, i) => (
        <motion.div
          key={link.id}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3 + i * 0.4}
          className="grid items-center px-5 py-5 border-t border-border transition-colors duration-150 hover:bg-surface-container-high cursor-pointer"
          style={{ gridTemplateColumns: "1fr 200px 120px 130px 100px" }}
          onClick={() => navigate(`/dashboard/links/${link.id}`)}
        >
          {/* Link details */}
          <div className="min-w-0 pr-6">
            <div className="text-[13px] font-semibold text-primary truncate mb-0.75">
              {link.short}
            </div>
            <div className="text-[11.5px] text-muted truncate">{link.long}</div>
          </div>

          {/* Performance */}
          <div className="flex items-center gap-5">
            <div>
              <div className="text-[13px] font-bold text-white">
                {link.clicks.toLocaleString()}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.08em] text-muted mt-0.5">
                CLICKS
              </div>
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">
                {link.unique.toLocaleString()}
              </div>
              <div className="text-[10px] font-semibold tracking-[0.08em] text-muted mt-0.5">
                UNIQUE
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            {link.status === "ACTIVE" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.25 rounded-md text-[11px] font-bold tracking-wide bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.25 h-1.25 rounded-full bg-green-400 shrink-0" />
                ACTIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.25 rounded-md text-[11px] font-bold tracking-wide bg-white/5 text-muted border border-white/8">
                DISABLED
              </span>
            )}
          </div>

          {/* Created */}
          <div className="text-[12.5px] text-muted">{link.created}</div>

          {/* Actions */}
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white hover:bg-surface-container-highest">
              <IconEdit />
            </button>
            <button className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white hover:bg-surface-container-highest">
              <IconShare />
            </button>
            <button className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-red-400 hover:bg-red-500/8">
              <IconTrash />
            </button>
          </div>
        </motion.div>
      ))}

      {/* Pagination footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-border">
        <span className="text-[10.5px] font-semibold tracking-[0.08em] text-muted">
          SHOWING 1–15 OF 1,248 ITEMS
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white"
          >
            <IconChevronLeft />
          </button>

          {pageNums.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={[
                "w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150",
                page === n
                  ? "bg-primary text-white"
                  : "text-muted hover:text-white",
              ].join(" ")}
            >
              {n}
            </button>
          ))}

          <span className="w-8 h-8 flex items-center justify-center text-[12px] text-muted">
            …
          </span>

          <button
            onClick={() => setPage(totalPages)}
            className={[
              "w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150",
              page === totalPages
                ? "bg-primary text-white"
                : "text-muted hover:text-white",
            ].join(" ")}
          >
            {totalPages}
          </button>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

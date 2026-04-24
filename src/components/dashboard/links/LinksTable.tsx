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
import { useLinksPaginated } from "@/hooks/useLinksPaginated";
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

const COL = "1fr 200px 120px 130px 100px";
const PAGE_SIZE = 15;

// Builds a smart page number array: [1, '...', 4, 5, 6, '...', 84]
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RowSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 md:grid items-center px-5 py-5 border-t border-border animate-pulse"
      style={{ gridTemplateColumns: COL }}
    >
      <div className="pr-6 space-y-2">
        <div className="h-3 w-36 rounded bg-white/[0.07]" />
        <div className="h-2.5 w-52 rounded bg-white/[0.07]" />
      </div>
      <div className="flex gap-5">
        <div className="space-y-1.5">
          <div className="h-4 w-12 rounded bg-white/[0.07]" />
          <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-12 rounded bg-white/[0.07]" />
          <div className="h-2.5 w-10 rounded bg-white/[0.07]" />
        </div>
      </div>
      <div>
        <div className="h-6 w-16 rounded-md bg-white/[0.07]" />
      </div>
      <div>
        <div className="h-3 w-20 rounded bg-white/[0.07]" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-7 h-7 rounded-lg bg-white/[0.07]" />
        ))}
      </div>
    </div>
  );
}

function LinkRow({ link, index }: { link: ShortUrl; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3 + index * 0.4}
      className="flex flex-col gap-3 md:grid items-start md:items-center px-5 py-5 border-t border-border transition-colors duration-150 hover:bg-surface-container-high cursor-pointer"
      style={{ gridTemplateColumns: COL }}
      onClick={() => navigate(`/dashboard/links/${link.short_code}`)}
    >
      <div className="min-w-0 pr-6">
        <div className="text-[13px] font-semibold text-primary truncate mb-0.75">
          shrt.nr/{link.short_code}
        </div>
        <div className="text-[11.5px] text-muted truncate">{link.long_url}</div>
      </div>

      <div className="flex items-center gap-5">
        <div>
          <div className="text-[13px] font-bold text-white">
            {(link._count?.clicks ?? 0).toLocaleString()}
          </div>
          <div className="text-[10px] font-semibold tracking-[0.08em] text-muted mt-0.5">
            CLICKS
          </div>
        </div>
      </div>

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

      <div className="text-[12.5px] text-muted">
        {formatDate(link.created_at)}
      </div>

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
  );
}

interface LinksTableProps {
  filter: "ALL" | "ACTIVE" | "DISABLED";
}

export default function LinksTable({ filter }: LinksTableProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useLinksPaginated(
    page,
    PAGE_SIZE,
    filter,
  );

  const totalPages = data?.totalPages ?? 1;
  const pageNums = getPageNumbers(page, totalPages);
  const start = data ? (page - 1) * PAGE_SIZE + 1 : 0;
  const end = data ? Math.min(page * PAGE_SIZE, data.totalCount) : 0;

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
        className="hidden md:grid items-center px-5 py-3.5"
        style={{ gridTemplateColumns: COL }}
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
      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}

      {isError && (
        <div className="px-5 py-10 text-center border-t border-border">
          <p className="text-[13px] text-muted">Failed to load links.</p>
        </div>
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <div className="px-5 py-10 text-center border-t border-border">
          <p className="text-[13px] text-muted">No links found.</p>
        </div>
      )}

      {/* Dim rows while fetching next page (keepPreviousData keeps them visible) */}
      <div
        className={
          isFetching && !isLoading ? "opacity-50 transition-opacity" : ""
        }
      >
        {!isLoading &&
          data?.data.map((link, i) => (
            <LinkRow key={link.id} link={link} index={i} />
          ))}
      </div>

      {/* Pagination footer */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between px-5 py-3.5 border-t border-border">
        <span className="text-[10.5px] font-semibold tracking-[0.08em] text-muted">
          {data
            ? `SHOWING ${start}–${end} OF ${data.totalCount.toLocaleString()} ITEMS`
            : ""}
        </span>

        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data?.hasPrevPage}
            className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white disabled:opacity-30"
          >
            <IconChevronLeft />
          </button>

          {pageNums.map((n, i) =>
            n === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-8 flex items-center justify-center text-[12px] text-muted"
              >
                …
              </span>
            ) : (
              <button
                key={n}
                onClick={() => setPage(n as number)}
                className={[
                  "w-8 h-8 rounded-lg text-[12px] font-semibold transition-all duration-150",
                  page === n
                    ? "bg-primary text-white"
                    : "text-muted hover:text-white",
                ].join(" ")}
              >
                {n}
              </button>
            ),
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={!data?.hasNextPage}
            className="p-1.75 rounded-lg text-muted transition-colors duration-150 hover:text-white disabled:opacity-30"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

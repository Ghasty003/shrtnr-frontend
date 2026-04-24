import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useShortUrl } from "@/hooks/useShortUrl";
import { C } from "@/components/auth/AuthShared";
import Modal from "@/components/modals/Modal";

const IconX = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconLink = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconCopy = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CreateLinkModalProps {
  onClose: () => void;
}

export default function CreateLinkModal({ onClose }: CreateLinkModalProps) {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [copied, setCopied] = useState(false);

  const { shorten, result, isPending, isError, error, reset } = useShortUrl();

  const shortUrl = result
    ? `${import.meta.env.VITE_API_URL}/${result.short_code}`
    : null;

  const handleShorten = () => {
    const trimmed = longUrl.trim();
    if (!trimmed) return;
    reset();
    shorten({ longUrl: trimmed, alias: alias.trim() || undefined });
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const inputClass =
    "w-full px-4 py-2.75 rounded-xl text-[13px] bg-surface-container-high text-white placeholder:text-muted/40 outline-none border border-transparent focus:border-primary focus:shadow-[0_0_0_3px_rgba(189,157,255,0.1)] transition-all duration-150";

  return (
    <Modal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg mx-4 rounded-2xl border border-border bg-surface-container p-7 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[17px] font-bold text-white">
                Create Short Link
              </h2>
              <p className="text-[12px] text-muted mt-0.5">
                Paste a URL and optionally add a custom alias.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-white hover:bg-surface-container-high transition-all duration-150"
            >
              <IconX />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Long URL */}
            <div className="flex flex-col gap-2">
              <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
                Destination URL
              </label>
              <input
                type="url"
                value={longUrl}
                onChange={(e) => {
                  setLongUrl(e.target.value);
                  if (result) reset();
                }}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                placeholder="https://your-very-long-url.com/path/to/page"
                className={inputClass}
                autoFocus
              />
            </div>

            {/* Alias */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
                  Custom Alias
                </label>
                <span className="text-[10px] text-muted/60 tracking-wide">
                  Optional
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-muted/60 pointer-events-none select-none">
                  shrtnr.com/
                </span>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => {
                    setAlias(e.target.value.replace(/\s/g, "-"));
                    if (result) reset();
                  }}
                  placeholder="my-link"
                  className={inputClass}
                  style={{ paddingLeft: "6.5rem" }}
                />
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {isError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] text-red-400"
                >
                  {error?.message ?? "Something went wrong."}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {result && shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-primary/20 bg-primary/5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-primary/15 text-primary">
                      <IconLink />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-white truncate">
                        {shortUrl}
                      </p>
                      <p className="text-[11px] text-muted truncate mt-0.5">
                        →{" "}
                        {result.long_url
                          .replace(/^https?:\/\//, "")
                          .substring(0, 45)}
                        {result.long_url.length > 50 ? "…" : ""}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium shrink-0 transition-all duration-150"
                    style={{
                      background: copied
                        ? "rgba(74,222,128,0.1)"
                        : "rgba(189,157,255,0.1)",
                      color: copied ? "#4ADE80" : C.primary,
                      border: `1px solid ${copied ? "rgba(74,222,128,0.2)" : "rgba(189,157,255,0.2)"}`,
                    }}
                  >
                    {copied ? <IconCheck /> : <IconCopy />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-muted bg-surface-container-high hover:text-white transition-colors duration-150"
              >
                {result ? "Done" : "Cancel"}
              </button>
              {!result ? (
                <button
                  onClick={handleShorten}
                  disabled={!longUrl.trim() || isPending}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white [background:var(--gradient-primary)] transition-opacity duration-150 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white mx-auto"
                    />
                  ) : (
                    "Shorten →"
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    reset();
                    setLongUrl("");
                    setAlias("");
                  }}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white [background:var(--gradient-primary)] transition-opacity duration-150 hover:opacity-90"
                >
                  Shorten another →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}

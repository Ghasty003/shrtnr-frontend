import { IconCopy, IconQR } from "@/utils/icons";
import { useState } from "react";
import { motion } from "motion/react";
import { useShortUrl } from "@/hooks/useShortUrl";

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

const SHORT_DOMAIN = import.meta.env.VITE_SHORT_DOMAIN ?? "shrt.nr";

export default function ShortenWidget() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [copied, setCopied] = useState(false);
  const { shorten, result, isPending, isError, error, reset } = useShortUrl();

  const previewCode = result?.short_code ?? alias ?? "summer-promo";
  const shortUrl = `${SHORT_DOMAIN}/${previewCode}`;

  function handleShorten() {
    if (!longUrl.trim()) return;
    shorten({ longUrl: longUrl.trim(), alias: alias.trim() || undefined });
  }

  function handleCopy() {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setLongUrl("");
    setAlias("");
    reset();
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
      className="rounded-xl p-6 bg-surface-container"
    >
      <div className="flex items-end gap-3">
        {/* Long URL */}
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-semibold tracking-widest mb-2.5 text-primary">
            LONG URL
          </label>
          <input
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              if (result) reset();
            }}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            placeholder="https://very-long-and-complex-destination-url.com/path"
            disabled={isPending}
            className="w-full px-4 py-2.75 rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          />
        </div>

        {/* Custom alias */}
        <div className="w-52.5 shrink-0">
          <label className="block text-[11px] font-semibold tracking-widest mb-2.5 text-primary">
            CUSTOM ALIAS (OPTIONAL)
          </label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="summer-promo"
            disabled={isPending}
            className="w-full px-4 py-2.75 rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          />
        </div>

        {/* Shorten / Reset button */}
        {result ? (
          <button
            onClick={handleReset}
            className="px-7 py-2.75 rounded-xl text-[13px] font-extrabold text-white tracking-[0.12em] transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 bg-surface-container-high"
          >
            NEW
          </button>
        ) : (
          <button
            onClick={handleShorten}
            disabled={isPending || !longUrl.trim()}
            className="px-7 py-2.75 rounded-xl text-[13px] font-extrabold text-white tracking-[0.12em] transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 [background:var(--gradient-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "..." : "SHORTEN"}
          </button>
        )}
      </div>

      {/* Error */}
      {isError && (
        <p className="mt-3 text-[12px] text-red-400">{error?.message}</p>
      )}

      {/* Preview row */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted">
            {result ? "Shortened:" : "Preview:"}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[13px] font-mono font-medium bg-primary/15 text-primary">
            {shortUrl}
          </span>
          {result && (
            <span className="text-[11px] font-semibold text-green-500">
              ✓ Ready
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-muted transition-colors duration-150 hover:text-white"
            title={copied ? "Copied!" : "Copy"}
          >
            {copied ? (
              <span className="text-[11px] font-bold text-green-400">
                COPIED
              </span>
            ) : (
              <IconCopy />
            )}
          </button>
          <button
            className="p-2 rounded-lg text-muted transition-colors duration-150 hover:text-white"
            title="QR Code"
          >
            <IconQR />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

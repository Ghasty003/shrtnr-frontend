import { IconCopy, IconQR } from "@/utils/icons";
import { useState } from "react";
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

export default function ShortenWidget() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");

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
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://very-long-and-complex-destination-url.com/path"
            className="w-full px-4 py-2.75 rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30"
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
            className="w-full px-4 py-2.75 rounded-xl text-[13px] outline-none bg-surface-container-high text-white placeholder:text-muted/40 transition-all duration-150 focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Shorten button */}
        <button className="px-7 py-2.75 rounded-xl text-[13px] font-extrabold text-white tracking-[0.12em] transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] shrink-0 [background:var(--gradient-primary)]">
          SHORTEN
        </button>
      </div>

      {/* Preview row */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-muted">Preview:</span>
          <span className="px-2.5 py-1 rounded-lg text-[13px] font-mono font-medium bg-primary/15 text-primary">
            shrt.nr/summer-promo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-lg text-muted transition-colors duration-150 hover:text-white"
            title="Copy"
          >
            <IconCopy />
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

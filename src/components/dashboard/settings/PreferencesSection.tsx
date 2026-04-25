import { useState } from "react";
import Switch from "react-switch";
import SectionHeading from "./SectionHeading";
import { motion } from "motion/react";
import Card from "./Card";
import { getUser } from "@/lib/storage";
import { useUpdatePreferences } from "@/hooks/usePreferences";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

type Expiry = "never" | "30d" | "90d";
type DomainFormat = "subdomain" | "path";

export default function PreferencesSection() {
  const user = getUser();
  const { mutate: savePreferences } = useUpdatePreferences();

  const [autoCopy, setAutoCopy] = useState(user?.autoCopy ?? true);
  const [expiry, setExpiry] = useState<Expiry>("never");
  const [domainFormat, setDomainFormat] = useState<DomainFormat>("path");

  const expiryOpts: { key: Expiry; label: string }[] = [
    { key: "never", label: "NEVER" },
    { key: "30d", label: "30 DAYS" },
    { key: "90d", label: "90 DAYS" },
  ];

  const domainOpts: { key: DomainFormat; label: string; example: string }[] = [
    {
      key: "path",
      label: "Path",
      example: `${import.meta.env.VITE_API_URL}/abc`,
    },
    {
      key: "subdomain",
      label: "Subdomain",
      example: `abc.${import.meta.env.VITE_API_URL}`,
    },
  ];

  const handleAutoCopyChange = (checked: boolean) => {
    setAutoCopy(checked);
    savePreferences({ autoCopy: checked });
  };

  return (
    <section className="mb-14">
      <SectionHeading
        tag="CONTROL"
        tagColor="bg-primary/20 text-primary"
        title="Preferences"
        custom={6}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={7}
        className="grid grid-cols-2 gap-4"
      >
        {/* Left — Auto-copy */}
        <Card className="p-6 flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-white mb-1">
                Auto-Copy to Clipboard
              </p>
              <p className="text-[12px] text-muted leading-relaxed">
                Copy shortened URL immediately after generation.
              </p>
            </div>
            <Switch
              checked={autoCopy}
              onChange={handleAutoCopyChange}
              offColor="#2a2a3a"
              onColor="#6c63ff"
              offHandleColor="#6b7280"
              onHandleColor="#ffffff"
              handleDiameter={18}
              uncheckedIcon={false}
              checkedIcon={false}
              height={24}
              width={44}
              activeBoxShadow="0 0 0 3px rgba(108, 99, 255, 0.25)"
            />
          </div>
        </Card>

        {/* Right — Premium settings */}
        <Card className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-white">
              Default Domain
            </p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase">
              <svg
                className="w-3 h-3 shrink-0"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 1l2.163 4.279 4.837.693-3.5 3.352.826 4.676L8 11.5l-4.326 2.5.826-4.676L1 5.972l4.837-.693L8 1z" />
              </svg>
              Premium
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {domainOpts.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDomainFormat(opt.key)}
                className={[
                  "flex items-center gap-3 px-4 py-2.75 rounded-xl text-[13px] font-medium transition-all duration-150 border",
                  domainFormat === opt.key
                    ? "bg-primary/10 border-primary text-white"
                    : "bg-surface-container-high border-transparent text-muted hover:text-white",
                ].join(" ")}
              >
                <span
                  className={[
                    "w-3.75 h-3.75 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-150",
                    domainFormat === opt.key
                      ? "border-primary"
                      : "border-muted",
                  ].join(" ")}
                >
                  {domainFormat === opt.key && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.75 h-1.75 rounded-full bg-primary"
                    />
                  )}
                </span>
                <span className="flex flex-col items-start gap-0.5">
                  <span>{opt.label}</span>
                  <span className="text-[11px] text-muted font-mono">
                    {opt.example}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-border" />

          <div>
            <label className="block text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-2.5">
              DEFAULT LINK EXPIRATION
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {expiryOpts.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setExpiry(opt.key)}
                  className={[
                    "py-2.25 rounded-xl text-[11px] font-bold tracking-widest transition-all duration-150 border",
                    expiry === opt.key
                      ? "border-primary text-white bg-primary/10"
                      : "border-border text-muted hover:text-white hover:border-muted",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

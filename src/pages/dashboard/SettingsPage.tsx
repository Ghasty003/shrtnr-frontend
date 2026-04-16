import { useState, useRef } from "react";
import { motion } from "motion/react";

// ── Animation variant ─────────────────────────────────────────────────────────
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

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconUpload = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconShield = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconEye = ({ open }: { open: boolean }) =>
  open ? (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

// ── Shared primitives ─────────────────────────────────────────────────────────

/** Section eyebrow label chip */
function SectionTag({
  children,
  color = "bg-primary/20 text-primary",
}: {
  children: string;
  color?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-[4px] rounded-md text-[9.5px] font-bold tracking-[0.18em] uppercase ${color}`}
    >
      {children}
    </span>
  );
}

/** Section heading row */
function SectionHeading({
  tag,
  tagColor,
  title,
  custom,
}: {
  tag: string;
  tagColor?: string;
  title: string;
  custom: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={custom}
      className="flex items-center gap-4 mb-6"
    >
      <SectionTag color={tagColor}>{tag}</SectionTag>
      <h2 className="text-[1.6rem] font-bold text-white leading-none">
        {title}
      </h2>
    </motion.div>
  );
}

/** Section card wrapper */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-surface-container border border-border ${className}`}
    >
      {children}
    </div>
  );
}

/** Labelled input field */
interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rightSlot?: React.ReactNode;
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rightSlot,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-[11px] rounded-xl text-[13px] bg-surface-container-high text-white placeholder:text-muted/40 outline-none border border-transparent transition-all duration-150 focus:border-primary focus:shadow-[0_0_0_3px_rgba(189,157,255,0.1)]"
          style={{ paddingRight: rightSlot ? "2.75rem" : undefined }}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={[
        "relative w-11 h-6 rounded-full transition-all duration-200 shrink-0",
        checked
          ? "[background:var(--gradient-primary)]"
          : "bg-surface-container-high",
      ].join(" ")}
      role="switch"
      aria-checked={checked}
    >
      <motion.span
        layout
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

// ── ProfileSection ────────────────────────────────────────────────────────────
function ProfileSection() {
  const [displayName, setDisplayName] = useState("Alex Sterling");
  const [email, setEmail] = useState("alex@precisionvoid.io");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  };

  return (
    <section className="mb-14">
      <SectionHeading tag="IDENTITY" title="Profile" custom={0} />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Card className="p-6">
          {/* Avatar row */}
          <div className="flex items-center gap-5 pb-6 mb-6 border-b border-border">
            <div
              className="w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center cursor-pointer group relative"
              onClick={() => fileRef.current?.click()}
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted">A</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center text-white">
                <IconUpload />
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div>
              <p className="text-[14px] font-semibold text-white mb-[3px]">
                Avatar
              </p>
              <p className="text-[12px] text-muted">
                JPG, GIF or PNG. Max size of 2MB.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Field
              label="DISPLAY NAME"
              value={displayName}
              onChange={setDisplayName}
              placeholder="Your name"
            />
            <Field
              label="EMAIL ADDRESS"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <button className="px-6 py-[10px] rounded-xl text-[13px] font-bold text-white tracking-wide transition-opacity duration-150 hover:opacity-90 [background:var(--gradient-primary)]">
              Save Identity
            </button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

// ── SecuritySection ───────────────────────────────────────────────────────────
function SecuritySection() {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  return (
    <section className="mb-14">
      <SectionHeading
        tag="SHIELD"
        tagColor="bg-red-500/20 text-red-400"
        title="Security"
        custom={3}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={4}
        className="grid grid-cols-2 gap-4"
      >
        {/* Change Password */}
        <Card className="p-6">
          <h3 className="text-[15px] font-bold text-white mb-5">
            Change Password
          </h3>
          <div className="flex flex-col gap-4">
            <Field
              label="CURRENT PASSWORD"
              type={showCurrent ? "text" : "password"}
              value={currentPw}
              onChange={setCurrentPw}
              placeholder="••••••••••••"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowCurrent((p) => !p)}
                  className="transition-colors hover:text-white"
                >
                  <IconEye open={showCurrent} />
                </button>
              }
            />
            <Field
              label="NEW PASSWORD"
              type={showNew ? "text" : "password"}
              value={newPw}
              onChange={setNewPw}
              placeholder="••••••••••••"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowNew((p) => !p)}
                  className="transition-colors hover:text-white"
                >
                  <IconEye open={showNew} />
                </button>
              }
            />
            <button className="w-full mt-1 py-[11px] rounded-xl text-[13px] font-bold text-white tracking-wide bg-surface-container-highest transition-opacity duration-150 hover:opacity-80">
              Update Password
            </button>
          </div>
        </Card>

        {/* Two-Factor Auth */}
        <Card className="p-6 flex flex-col">
          <h3 className="text-[15px] font-bold text-white mb-[6px]">
            Two-Factor Auth
          </h3>
          <p className="text-[12.5px] leading-relaxed text-muted mb-auto">
            Add an extra layer of security to your terminal access.
          </p>

          {/* Status toggle row */}
          <div className="mt-6 flex items-center justify-between px-4 py-[13px] rounded-xl bg-surface-container-high">
            <div className="flex items-center gap-3">
              <div className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center bg-primary/15">
                <IconShield />
              </div>
              <span className="text-[13px] font-semibold text-white">
                Status:{" "}
                <span
                  className={twoFaEnabled ? "text-green-500" : "text-muted"}
                >
                  {twoFaEnabled ? "Enabled" : "Disabled"}
                </span>
              </span>
            </div>
            <Toggle
              checked={twoFaEnabled}
              onChange={() => setTwoFaEnabled((p) => !p)}
            />
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

// ── PreferencesSection ────────────────────────────────────────────────────────
type Expiry = "never" | "30d" | "90d";
type Domain = "shrt.nr" | "pvoid.io";

function PreferencesSection() {
  const [autoCopy, setAutoCopy] = useState(true);
  const [expiry, setExpiry] = useState<Expiry>("never");
  const [domain, setDomain] = useState<Domain>("shrt.nr");

  const expiryOpts: { key: Expiry; label: string }[] = [
    { key: "never", label: "NEVER" },
    { key: "30d", label: "30 DAYS" },
    { key: "90d", label: "90 DAYS" },
  ];

  const domainOpts: Domain[] = ["shrt.nr", "pvoid.io"];

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
        {/* Left column */}
        <Card className="p-6 flex flex-col gap-6">
          {/* Auto-copy toggle */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-white mb-[4px]">
                Auto-Copy to Clipboard
              </p>
              <p className="text-[12px] text-muted leading-relaxed">
                Copy shortened URL immediately after generation.
              </p>
            </div>
            <Toggle
              checked={autoCopy}
              onChange={() => setAutoCopy((p) => !p)}
            />
          </div>

          {/* Default Link Expiration */}
          <div>
            <label className="block text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted mb-[10px]">
              DEFAULT LINK EXPIRATION
            </label>
            <div className="grid grid-cols-3 gap-[6px]">
              {expiryOpts.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setExpiry(opt.key)}
                  className={[
                    "py-[9px] rounded-xl text-[11px] font-bold tracking-[0.1em] transition-all duration-150 border",
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

        {/* Right column — Default Domain */}
        <Card className="p-6">
          <p className="text-[14px] font-semibold text-white mb-4">
            Default Domain
          </p>
          <div className="flex flex-col gap-[6px]">
            {domainOpts.map((d) => (
              <button
                key={d}
                onClick={() => setDomain(d)}
                className={[
                  "flex items-center gap-3 px-4 py-[11px] rounded-xl text-[13px] font-medium transition-all duration-150 border",
                  domain === d
                    ? "bg-primary/10 border-primary text-white"
                    : "bg-surface-container-high border-transparent text-muted hover:text-white",
                ].join(" ")}
              >
                {/* Radio dot */}
                <span
                  className={[
                    "w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-150",
                    domain === d ? "border-primary" : "border-muted",
                  ].join(" ")}
                >
                  {domain === d && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-[7px] h-[7px] rounded-full bg-primary"
                    />
                  )}
                </span>
                {d}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

// ── SettingsPage ──────────────────────────────────────────────────────────────
export default function SettingsPage() {
  return (
    <div className="px-8 py-8 pb-16">
      {/* Page heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={-1}
        className="mb-10"
      >
        <h1 className="text-[2rem] font-bold text-white leading-none mb-[7px]">
          Settings
        </h1>
        <p className="text-[13px] text-muted">
          Manage your identity and terminal configurations.
        </p>
      </motion.div>

      <ProfileSection />
      <SecuritySection />
      <PreferencesSection />
    </div>
  );
}

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "./SectionHeading";
import Card from "./Card";
import { IconUpload } from "@/utils/icons";
import Field from "./Field";
import { getUser } from "@/lib/storage";
import { useUpdateUsername } from "@/hooks/useUpdateUsername";

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

export default function ProfileSection() {
  const user = getUser();

  const [username, setUsername] = useState(user?.username ?? "");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { updateUsername, isPending, isSuccess, isError, error, reset } =
    useUpdateUsername();

  const isDirty = username !== (user?.username ?? "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  };

  const handleSave = () => {
    if (!isDirty) return;
    reset();
    updateUsername({ username });
  };

  // First letter of username for the avatar fallback
  const initials = (user?.username ?? "?")[0].toUpperCase();

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
              className="w-17 h-17 rounded-xl overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center cursor-pointer group relative"
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
                  <span className="text-2xl font-bold text-muted">
                    {initials}
                  </span>
                </div>
              )}
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
              <p className="text-[14px] font-semibold text-white mb-0.75">
                Avatar
              </p>
              <p className="text-[12px] text-muted">
                JPG, GIF or PNG. Max size of 2MB.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field
              label="USERNAME"
              value={username}
              onChange={(val) => {
                setUsername(val.target.value);
                reset();
              }}
              placeholder="your_handle"
            />
            <Field
              label="EMAIL ADDRESS"
              type="email"
              value={user?.email ?? ""}
              onChange={() => {}}
              placeholder="you@example.com"
              disabled
            />
          </div>

          {/* Feedback */}
          <div className="mb-5 min-h-4.5">
            <AnimatePresence mode="wait">
              {isSuccess && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] text-green-400"
                >
                  Username updated successfully.
                </motion.p>
              )}
              {isError && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] text-red-400"
                >
                  {error?.message ?? "Something went wrong."}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!isDirty || isPending}
              className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-white tracking-wide transition-opacity duration-150 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed [background:var(--gradient-primary)]"
            >
              {isPending ? "Saving..." : "Save Identity"}
            </button>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}

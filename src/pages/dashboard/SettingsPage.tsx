import PreferencesSection from "@/components/dashboard/settings/PreferencesSection";
import ProfileSection from "@/components/dashboard/settings/ProfileSection";
import SecuritySection from "@/components/dashboard/settings/Security";
import { motion } from "motion/react";

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

export default function SettingsPage() {
  return (
    <div className="px-4 sm:px-8 py-6 sm:py-8 pb-16">
      {/* Page heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={-1}
        className="mb-10"
      >
        <h1 className="text-[2rem] font-bold text-white leading-none mb-1.75">
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

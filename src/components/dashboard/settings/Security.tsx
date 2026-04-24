import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Switch from "react-switch";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import Card from "./Card";
import Field from "./Field";
import { IconEye, IconShield } from "@/utils/icons";
import { useChangePassword } from "@/hooks/useChangePassword";
import { getUser } from "@/lib/storage";
import TwoFAModal from "@/components/modals/TwoFAModal";
import DisableTwoFAModal from "@/components/modals/DisableTwoFAModal";

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

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Must contain at least one number."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof schema>;

export default function SecuritySection() {
  const user = getUser();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFaEnabled, setTwoFaEnabled] = useState(
    user?.twoFactorEnabled ?? false,
  );
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const { changePassword, isPending, isSuccess, isError, error, reset } =
    useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<PasswordForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: PasswordForm) => {
    reset();
    changePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => resetForm() },
    );
  };

  return (
    <>
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <Field
                label="CURRENT PASSWORD"
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••••••"
                error={errors.currentPassword?.message}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowCurrent((p) => !p)}
                    className="transition-colors hover:text-white"
                  >
                    <IconEye open={showCurrent} />
                  </button>
                }
                {...register("currentPassword")}
              />
              <Field
                label="NEW PASSWORD"
                type={showNew ? "text" : "password"}
                placeholder="••••••••••••"
                error={errors.newPassword?.message}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowNew((p) => !p)}
                    className="transition-colors hover:text-white"
                  >
                    <IconEye open={showNew} />
                  </button>
                }
                {...register("newPassword")}
              />
              <Field
                label="CONFIRM NEW PASSWORD"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••••••"
                error={errors.confirmPassword?.message}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="transition-colors hover:text-white"
                  >
                    <IconEye open={showConfirm} />
                  </button>
                }
                {...register("confirmPassword")}
              />

              <div className="min-h-4.5">
                <AnimatePresence mode="wait">
                  {isSuccess && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-green-400"
                    >
                      Password updated. Other sessions have been revoked.
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

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.75 rounded-xl text-[13px] font-bold text-white tracking-wide bg-surface-container-highest transition-opacity duration-150 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? "Updating..." : "Update Password"}
              </button>
            </form>
          </Card>

          {/* Two-Factor Auth */}
          <Card className="p-6 flex flex-col">
            <h3 className="text-[15px] font-bold text-white mb-1.5">
              Two-Factor Auth
            </h3>
            <p className="text-[12.5px] leading-relaxed text-muted mb-auto">
              Add an extra layer of security to your terminal access. You'll
              need an authenticator app like Google Authenticator or Authy.
            </p>

            <div className="mt-6 flex items-center justify-between px-4 py-3.25 rounded-xl bg-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-[7px] flex items-center justify-center bg-primary/15">
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
              <Switch
                checked={twoFaEnabled}
                onChange={(checked) => {
                  if (checked) {
                    setShowEnrollModal(true);
                  } else {
                    setShowDisableModal(true);
                  }
                }}
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
        </motion.div>
      </section>

      <AnimatePresence>
        {showEnrollModal && (
          <TwoFAModal
            onClose={() => setShowEnrollModal(false)}
            onEnabled={() => {
              setShowEnrollModal(false);
              setTwoFaEnabled(true);
            }}
          />
        )}
        {showDisableModal && (
          <DisableTwoFAModal
            onClose={() => setShowDisableModal(false)}
            onDisabled={() => {
              setShowDisableModal(false);
              setTwoFaEnabled(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

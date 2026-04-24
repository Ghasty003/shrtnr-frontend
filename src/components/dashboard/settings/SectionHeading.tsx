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

function SectionTag({
  children,
  color = "bg-primary/20 text-primary",
}: {
  children: string;
  color?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[9.5px] font-bold tracking-[0.18em] uppercase ${color}`}
    >
      {children}
    </span>
  );
}

/** Section heading row */
export default function SectionHeading({
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

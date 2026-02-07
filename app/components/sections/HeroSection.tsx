"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion, type Variants } from "framer-motion";

/* -------------------------------- TYPES -------------------------------- */

type CTA = {
  icon?: string;
  link?: string;
  label?: string;
  variant?: "primary" | "outline";
};

type Point = {
  icon?: string;
  text?: string;
};

type HeroSectionProps = {
  data?: {
    image?: string;
    meta?: {
      badge?: string;
      description?: string;
      heading?: {
        headingTitle?: string;
        headingsubtitle?: string;
        headinghighlight?: string;
      };
      points?: Point[];
      ctas?: CTA[];
      image?: string;
    };
  };
};

/* ---------------------------- ICON RESOLVER ----------------------------- */

const getIcon = (iconName?: string) => {
  if (!iconName) return Icons.CheckCircle2;
  return (Icons as any)[iconName] || Icons.CheckCircle2;
};

/* -------------------------- ANIMATION VARIANTS --------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ------------------------------------------------------------------------ */

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data?.meta) return null;

  const { meta, image } = data;
  const { heading } = meta;

  const heroImageSrc =
    meta.image ||
    (image ? `http://72.61.229.100:3001/uploads/sections/${image}` : null);

  return (
    <section className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-28 right-24 w-60 h-60 bg-emerald-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-24 left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-20 pb-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 max-w-xl"
          >
            {/* BADGE */}
            {meta.badge && (
              <motion.span
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-black"
              >
                <Icons.Briefcase className="w-4 h-4 text-emerald-600" />
                {meta.badge}
              </motion.span>
            )}

            {/* HEADING */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-[44px] leading-tight lg:text-[40px] font-bold text-slate-900"
            >
              <span className="block">{heading?.headingTitle}</span>
              <span className="block text-emerald-600">
                {heading?.headinghighlight}
              </span>
              <span className="block">{heading?.headingsubtitle}</span>
            </motion.h1>

            {/* DESCRIPTION */}
            {meta.description && (
              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-slate-600 leading-relaxed"
              >
                {meta.description}
              </motion.p>
            )}

            {/* POINTS */}
            {meta.points?.length ? (
              <motion.ul
                variants={containerVariants}
                className="space-y-4 pt-2"
              >
                {meta.points.map((item, idx) => {
                  const Icon = getIcon(item.icon);

                  return (
                    <motion.li
                      key={idx}
                      variants={fadeUpVariants}
                      className="flex items-center gap-4"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-slate-700 font-medium">
                        {item.text}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            ) : null}

            {/* CTA BUTTONS */}
            {meta.ctas?.length && (
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-wrap gap-4 pt-6"
              >
                {meta.ctas.map((cta, idx) => {
                  const Icon = getIcon(cta.icon);

                  return (
                    <Button
                      key={idx}
                      asChild
                      variant={
                        cta.variant === "outline" ? "outline" : "default"
                      }
                      className={
                        cta.variant === "outline"
                          ? "bg-white border-slate-300 text-black"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }
                    >
                      <a
                        href={cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {cta.label}
                      </a>
                    </Button>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            {heroImageSrc && (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-[400px] rounded-2xl bg-white shadow-xl overflow-hidden"
              >
                <Image
                  src={heroImageSrc}
                  alt="Hero Image"
                  width={700}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                  unoptimized
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

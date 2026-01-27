"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/app/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderSectionProps {
  data: {
    title?: string; // HTML
    sub_title?: string;
    meta?: {
      images?: string[];
      caption?: string;
      cta?: {
        url?: string;
        label?: string;
      };
    };
  };
}

export default function HeroSliderSection({ data }: HeroSliderSectionProps) {
  const { title, sub_title, meta } = data;

  const images: string[] = Array.isArray(meta?.images)
    ? meta.images
    : [];

  const safeTitle = DOMPurify.sanitize(title || "");

  if (!images.length) return null;

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[600px] w-full">
              {/* Background image */}
              <Image
                src={img}
                alt={`Hero slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl mx-auto px-6 text-white">
                  {title && (
                    <h1
                      className="text-3xl md:text-5xl font-bold leading-tight mb-4"
                      dangerouslySetInnerHTML={{ __html: safeTitle }}
                    />
                  )}

                  {sub_title && (
                    <p className="text-sm md:text-lg text-gray-200 max-w-xl mb-6">
                      {sub_title}
                    </p>
                  )}

                  {meta?.caption && (
                    <p className="text-xs uppercase tracking-widest text-gray-300 mb-6">
                      {meta.caption}
                    </p>
                  )}

                  {meta?.cta?.url &&
                    meta.cta.url !== "#" &&
                    meta.cta.url !== "@" && (
                      <Link href={meta.cta.url}>
                        <Button className="px-6 py-3">
                          {meta.cta.label}
                        </Button>
                      </Link>
                    )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

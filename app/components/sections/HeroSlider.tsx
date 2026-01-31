"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import DOMPurify from "dompurify";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderSectionProps {
  data: {
    title?: string;
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

export default function HeroSlider({ data }: HeroSliderSectionProps) {
  const images = data.meta?.images ?? [];
  if (!images.length) return null;

  return (
    <section className="px-12 py-8 bg-white scroll-reveal">
      {/* ROUNDED SLIDER WRAPPER */}
      <div className="relative w-full min-h-[calc(100vh-80px)] rounded-2xl overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="h-full w-full rounded-2xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="rounded-2xl">
              <div className="relative w-full min-h-[calc(100vh-80px)] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <Image
                  src={img}
                  alt={`Hero Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover rounded-2xl"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-3xl space-y-4">
                      {data.title && (
                        <h1
                          className="bg-[#0F766E] text-white text-4xl md:text-6xl font-bold px-6 py-3 rounded-md inline-block"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.title),
                          }}
                        />
                      )}

                      {data.sub_title && (
                        <h2
                          className="bg-[#0F766E] text-white text-3xl md:text-5xl font-bold px-6 py-3 rounded-md inline-block"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.sub_title),
                          }}
                        />
                      )}

                      {data.meta?.caption && (
                        <p className="text-white text-lg font-medium max-w-xl">
                          {data.meta.caption}
                        </p>
                      )}

                      {data.meta?.cta?.label && data.meta?.cta?.url && (
                        <a
                          href={data.meta.cta.url}
                          className="inline-block mt-6 bg-white text-[#0F766E] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
                        >
                          {data.meta.cta.label}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

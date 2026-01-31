"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Button } from "@/app/components/ui/button";

interface MiddleSectionProps {
  data: {
    title?: string;
    sub_title?: string;
    meta?: {
      image?: string | null;
      content?: string;
      ctaPrimary?: {
        url: string;
        label: string;
      };
    };
  };
}

export default function MiddleSection({ data }: MiddleSectionProps) {
  const { title, sub_title, meta } = data || {};

  const safeTitle = title ? DOMPurify.sanitize(title) : "";
  const safeContent = meta?.content
    ? DOMPurify.sanitize(meta.content)
    : "";

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="text-center mb-12">
            {safeTitle && (
              <div
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {sub_title && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {sub_title}
              </p>
            )}
          </div>

          {/* SERVICE ITEM */}
          <div className="service-item-wrapper scroll-reveal visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

              {/* VISUAL */}
              <div className="flex justify-center items-center lg:order-1">
                <div className="relative">
                  <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden shadow-2xl">

                    {/* glow blobs */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-2xl" />
                    </div>

                    {/* image or fallback */}
                    {meta?.image ? (
                      <div className="relative z-10 w-32 h-32 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                          src={meta.image}
                          alt="Service"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative z-10 w-32 h-32 bg-blue-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                        IT
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="lg:order-2 space-y-5">

                {/* Meta content (badge, title, description, bullets) */}
                {safeContent && (
                  <div
                    className="
                      prose prose-lg max-w-none
                      prose-h3:text-sm prose-h3:font-semibold
                      prose-h3:text-blue-700
                      prose-h3:uppercase
                      prose-h3:tracking-wide
                      prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900
                      prose-p:text-gray-600
                    "
                    dangerouslySetInnerHTML={{ __html: safeContent }}
                  />
                )}

                {/* CTA */}
                {meta?.ctaPrimary?.url && (
                  <div className="pt-4">
                    <Link href={meta.ctaPrimary.url}>
                      <Button className="bg-blue-500 hover:opacity-90 text-white px-6 py-3 shadow-lg transition-all">
                        {meta.ctaPrimary.label} →
                      </Button>
                    </Link>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
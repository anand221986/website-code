"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function LeftImageRightContentSection({ data }: any) {
  const { title, sub_title, meta } = data;
  const safeTitle = DOMPurify.sanitize(title);

  return (
    <section className="pt-24 pb-10 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 scroll-reveal">

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

    {/* LEFT IMAGE */}
{meta?.image && (
  <div className="relative order-2 lg:order-1">
    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 transform hover:scale-105 transition-transform duration-500">
      <Image
        src={meta.image}
        alt={title || "Section image"}
        width={800}
        height={500}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
    </div>
  </div>
)}

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {meta?.badge && (
              <span className="inline-block px-4 py-2 rounded-full bg-white shadow text-sm font-semibold text-emerald-600">
                {meta.badge}
              </span>
            )}

            <div
              className="text-3xl md:text-4xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />

            {sub_title && (
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                {sub_title}
              </p>
            )}

            {meta?.content && (
              <div
                className="text-gray-700 max-w-xl"
                dangerouslySetInnerHTML={{ __html: meta.content }}
              />
            )}

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {meta?.ctaPrimary?.url && (
                <Link href={meta.ctaPrimary.url}>
                  <Button className="px-6 py-3">
                    {meta.ctaPrimary.label}
                  </Button>
                </Link>
              )}

              {meta?.ctaSecondary?.url && (
                <Link href={meta.ctaSecondary.url}>
                  <Button variant="outline" className="px-6 py-3">
                    {meta.ctaSecondary.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
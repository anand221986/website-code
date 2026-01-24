"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import DOMPurify from "dompurify";
import Image from "next/image";

export default function LeftImageRightContentSection({ data }: any) {
  const { title, sub_title, meta } = data;

  const safeTitle = DOMPurify.sanitize(title);

  // 🔹 Extract bullet points from meta.content
  const listItems =
    meta?.content
      ?.match(/<span[^>]*>(.*?)<\/span>/g)
      ?.map((item: string) =>
        item.replace(/<[^>]+>/g, "").trim()
      ) || [];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center min-h-[80vh]">

          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6">

            {/* TITLE */}
            <div
              className="text-3xl md:text-4xl font-bold text-gray-900"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />

            {/* SUB TITLE */}
            {sub_title && (
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                {sub_title}
              </p>
            )}

            {/* BULLET LIST */}
            {listItems.length > 0 && (
              <div className="grid grid-cols-1 gap-3 pt-3">
                {listItems.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-white"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {meta?.ctaPrimary?.url && (
              <div className="pt-6">
                <Link href={meta.ctaPrimary.url}>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {meta.ctaPrimary.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          {meta?.image && (
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white/60 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={meta.image}
                  alt={title || "Section image"}
                  width={800}
                  height={500}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )}
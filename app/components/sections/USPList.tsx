"use client";

import React from "react";
import DOMPurify from "dompurify";

interface USPSectionProps {
  data: {
    title?: string;
    sub_title?: string;
    meta?: {
      usp_items?: string[];
    };
  };
}

export default function LeftImageRightContentSection({
  data,
}: USPSectionProps) {
  const { title, sub_title, meta } = data;

  const safeTitle = DOMPurify.sanitize(title || "");
  const uspItems: string[] = Array.isArray(meta?.usp_items)
    ? meta.usp_items
    : [];

  if (!title && uspItems.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-6 lg:px-12 text-center">

        {/* TITLE */}
        {title && (
          <h2
            className="text-4xl font-bold text-gray-900"
            dangerouslySetInnerHTML={{ __html: safeTitle }}
          />
        )}

        {/* SUB TITLE */}
        {sub_title && (
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            {sub_title}
          </p>
        )}

        {/* USP ITEMS */}
        {uspItems.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uspItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-emerald-500 text-white text-xl font-bold">
                  ✓
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

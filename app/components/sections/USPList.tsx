"use client";

import React from "react";

interface USPItem {
  key: string;
  color: string;
  label: string;
  description?: string;
  finalNumber?: number;
}

interface Props {
  data: {
    meta?: {
      usp_items?: USPItem[];
    };
  };
}

const USPList: React.FC<Props> = ({ data }) => {
  const items = Array.isArray(data?.meta?.usp_items)
    ? data.meta.usp_items
    : [];

  if (!items.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={item.key || idx}
              className="rounded-2xl p-6 shadow-md border bg-white hover:shadow-xl transition"
            >
              {/* Number */}
              {item.finalNumber !== undefined && (
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {item.finalNumber.toLocaleString()}+
                </div>
              )}

              {/* Label */}
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {item.label}
              </h3>

              {/* Description */}
              {item.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPList;

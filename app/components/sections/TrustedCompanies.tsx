"use client";

import React from "react";
import DOMPurify from "dompurify";
import Image from "next/image";
import { ClientIcons } from "../client-icons";

interface ClientItem {
  logo?: string | null;
  name: string;
  colors?: string;
  icon_key?: string;
}

interface Props {
  data: {
    title?: string;
    meta?: {
      client_items?: ClientItem[];
    };
  };
}

/* ---------------- Helper ---------------- */

const getClientIcon = (key?: string) => {
  if (!key) return ClientIcons.startup;
  return ClientIcons[key as keyof typeof ClientIcons] ?? ClientIcons.startup;
};

/* ---------------- Component ---------------- */

const TrustedCompanies: React.FC<Props> = ({ data }) => {
  const companies = Array.isArray(data?.meta?.client_items)
    ? data.meta.client_items
    : [];

  const safeTitle = DOMPurify.sanitize(data?.title || "");

  if (!companies.length) return null;
  

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Title */}
          {data?.title && (
            <div
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center"
              dangerouslySetInnerHTML={{ __html: safeTitle }}
            />
          )}

          {/* Scroller */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

            <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
              {[...companies, ...companies].map((company, idx) => (
                <div
                  key={`${company.name}-${idx}`}
                  className="shrink-0 mx-6 my-3 group"
                >
                  <div
                    className="
                      relative flex items-center gap-3 px-5 py-3 rounded-2xl
                      bg-white/90 border border-gray-200 shadow-sm
                      hover:shadow-xl transition-all duration-500
                      hover:scale-110 hover:-translate-y-1
                    "
                  >
                    {/* Hover Gradient */}
                    <div
                      className={`
                        absolute inset-0 rounded-2xl opacity-0
                        group-hover:opacity-20
                        bg-gradient-to-br
                        ${company.colors || "from-gray-200 to-gray-300"}
                      `}
                    />

                    {/* Logo OR Icon */}
                    <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                      { typeof company.logo === "string" &&
  company.logo.trim().length > 0 ? (
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={80}
                          height={80}
                          className="object-contain rounded-md"
                        />
                      ) : (
                        <div className="transform group-hover:rotate-12 transition-transform">
                          {getClientIcon(company.icon_key)}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <span
                      className={`
                        text-sm font-bold whitespace-nowrap relative z-10
                        bg-gradient-to-r
                        ${company.colors || "from-gray-600 to-gray-800"}
                        bg-clip-text text-transparent
                      `}
                    >
                      {company.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedCompanies;

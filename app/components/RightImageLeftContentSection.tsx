import React from "react";
import { Button } from "@/app/components/ui/button";
import DOMPurify from "dompurify"
export default function RightImageLeftContentSection({ data }: any) {
  const { title, sub_title, meta } = data;
const safeTitle = DOMPurify.sanitize(title || '');
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          {title && (
              <div
                className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3"
                dangerouslySetInnerHTML={{ __html: safeTitle }}
              />
            )}

            {sub_title && (
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                {sub_title}
              </p>
            )}

          {meta.content && (
            <div
              className="mt-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: meta.content }}
            />
          )}
          {meta.cta?.length > 0 && (
            <div className="mt-6 flex gap-4">
              {meta.cta.map((btn: any, i: number) => (
                <Button key={i}>{btn.label}</Button>
              ))}
            </div>
          )}
        </div>

        {/* Right Image */}
        {meta.image && (
          <div className="lg:w-1/2 order-1 lg:order-2">
            <img
              src={meta.image}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}

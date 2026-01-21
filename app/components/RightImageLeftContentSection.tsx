import React from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function RightImageLeftContentSection({ data }: any) {
    const { sectiontitle, sub_title, meta } = data;
  const title = sectiontitle?.replace(/^<p>|<\/p>$/g, "");

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <h2 className="text-3xl font-bold">{title}</h2>
          {sub_title && <p className="mt-2 text-lg text-gray-600">{sub_title}</p>}
          {meta.content && (
            <div
              className="mt-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: meta.content }}
            />
          )}
          {/* {meta.cta?.length > 0 && (
            <div className="mt-6 flex gap-4">
              {meta.cta.map((btn: any, i: number) => (
                <Button key={i}>{btn.label}</Button>
              ))}
            </div>
          )} */}

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

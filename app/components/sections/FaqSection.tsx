"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import DOMPurify from "dompurify";
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: {
    faq_title: string;
    sub_title?: string | null;
    faq_items: FaqItem[];
  };
}

export default function FaqSection({ data }: FaqSectionProps) {
  const { faq_title, sub_title, faq_items } = data;
  const safeTitle = faq_title ? DOMPurify.sanitize(faq_title) : "";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
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

        <div className="space-y-4 max-w-3xl mx-auto">
          {faq_items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 cursor-pointer transition-all"
              onClick={() => toggleItem(index)}
              role="button"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleItem(index);
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                {openIndex === index ? <Minus /> : <Plus />}
              </div>

              <div
                id={`faq-answer-${index}`}
                className={`mt-4 text-gray-600 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
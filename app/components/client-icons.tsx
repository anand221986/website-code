// src/components/client-icons.tsx
import React from "react";
import {
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Award,
} from "lucide-react";
export const ClientIcons = {
  startup: <TrendingUp className="w-6 h-6 text-gray-700" />,
  enterprise: <Building2 className="w-6 h-6 text-gray-700" />,
  agency: <Briefcase className="w-6 h-6 text-gray-700" />,
  community: <Users className="w-6 h-6 text-gray-700" />,
  award: <Award className="w-6 h-6 text-gray-700" />,
} as const;

export type ClientIconKey = keyof typeof ClientIcons;

// export const ClientIcons: Record<string, React.ReactNode> = {
//   startup: (
//     <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
//       <path d="M20 4L30 15L20 26L10 15L20 4Z" className="fill-orange-500" />
//       <path d="M20 14L30 25L20 36L10 25L20 14Z" className="fill-amber-400" />
//     </svg>
//   ),

//   enterprise: (
//     <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
//       <circle cx="20" cy="20" r="16" className="fill-emerald-500" />
//       <circle cx="20" cy="20" r="10" className="fill-teal-400" />
//     </svg>
//   ),

//   cloud: (
//     <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
//       <ellipse cx="20" cy="18" rx="12" ry="8" className="fill-purple-500" />
//       <ellipse cx="14" cy="24" rx="8" ry="6" className="fill-pink-400" />
//       <ellipse cx="26" cy="24" rx="8" ry="6" className="fill-purple-400" />
//     </svg>
//   ),
// };

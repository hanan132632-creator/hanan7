import React from 'react';
import { CategoryType } from '../types';
import { Building2, Gamepad2, Compass, LayoutTemplate, Crown, Layers } from 'lucide-react';

interface CategoryFilterBarProps {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  counts: Record<CategoryType, number>;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  activeCategory,
  setActiveCategory,
  counts,
}) => {
  const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'الكل', icon: <Layers className="w-4 h-4" /> },
    { id: 'real_estate', label: 'عقارات النخبة', icon: <Building2 className="w-4 h-4" /> },
    { id: 'gathering_games', label: 'ألعاب الجمعات', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'blueprints_2026', label: 'مخططات 2026', icon: <Compass className="w-4 h-4" /> },
    { id: 'canva_templates', label: 'قوالب كانفا', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'royal_collection', label: 'التشكيلة الملكية', icon: <Crown className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#18181B] py-6 px-4 border-y border-[#D4AF37]/30 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] text-white shadow-lg border border-emerald-400/50 emerald-border-glow scale-105'
                    : 'bg-[#27272A] text-slate-300 hover:text-white border border-slate-700/60 hover:border-[#D4AF37]/50'
                }`}
              >
                <span className={isActive ? 'text-[#FAD961]' : 'text-[#D4AF37]'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-black/30 text-slate-400 border border-slate-700'
                  }`}
                >
                  {counts[cat.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

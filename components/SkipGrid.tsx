"use client";

import { useState } from "react";
import SkipCard from "./SkipCard";
import { Skip } from "@/lib/types";

interface SkipGridProps {
  skips: Skip[];
  selectedSkipId?: number | null;
  onSkipSelect?: (skip: Skip | null) => void;
}

export default function SkipGrid({ skips, selectedSkipId, onSkipSelect }: SkipGridProps) {
  const [internalSelectedSkipId, setInternalSelectedSkipId] = useState<number | null>(selectedSkipId || null);

  const handleSelectSkip = (id: number) => {
    const newSelectedSkipId = internalSelectedSkipId === id ? null : id;
    setInternalSelectedSkipId(newSelectedSkipId);
    
    const selectedSkip = newSelectedSkipId ? skips.find(skip => skip.id === newSelectedSkipId) || null : null;
    onSkipSelect?.(selectedSkip);
  };

  const currentSelectedSkipId = selectedSkipId !== undefined ? selectedSkipId : internalSelectedSkipId;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={currentSelectedSkipId === skip.id}
          onSelect={handleSelectSkip}
        />
      ))}
    </div>
  );
}

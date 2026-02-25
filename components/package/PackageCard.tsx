"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PackageInfo, PackageKey } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  packageKey: PackageKey;
  pkg: PackageInfo;
  isSelected: boolean;
  onSelect: (key: PackageKey) => void;
  index: number;
}

export function PackageCard({
  packageKey,
  pkg,
  isSelected,
  onSelect,
  index,
}: PackageCardProps) {
  const isBestValue = packageKey === "full";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(packageKey)}
      className={cn(
        "relative rounded-xl border-2 p-6 cursor-pointer transition-all",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border hover:border-primary/30 hover:shadow-md",
        isBestValue && "ring-2 ring-accent/50"
      )}
    >
      {isBestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
          Best Value
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{pkg.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
        </div>
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3",
            isSelected ? "border-primary bg-primary" : "border-border"
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold">{pkg.priceDisplay}</span>
        <span className="text-muted-foreground text-sm ml-1">one-time</span>
      </div>

      <ul className="space-y-2">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

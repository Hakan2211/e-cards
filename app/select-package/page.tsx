import { Suspense } from "react";
import { PackageSelector } from "@/components/package/PackageSelector";

export default function SelectPackagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      }
    >
      <PackageSelector />
    </Suspense>
  );
}

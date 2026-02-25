"use client";

import { use } from "react";
import { StudioLayout } from "@/components/studio/StudioLayout";

export default function StudioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <StudioLayout slug={slug} />;
}

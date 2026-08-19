"use client";

import { useSyncExternalStore } from "react";

export type RenderQuality = "high" | "medium" | "low";

function detectQuality(): RenderQuality {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
  const saveData = Boolean(
    "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );
  const narrow = window.innerWidth < 768;

  if (saveData || memory <= 4 || cores <= 2 || narrow) {
    return "low";
  }

  if (window.innerWidth < 1100 || cores <= 6) {
    return "medium";
  }

  return "high";
}

export function useRenderQuality(): RenderQuality {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange);
      return () => window.removeEventListener("resize", onStoreChange);
    },
    detectQuality,
    () => "medium",
  );
}

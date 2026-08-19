"use client";

import { useSyncExternalStore } from "react";

export function useDocumentHidden(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      document.addEventListener("visibilitychange", onStoreChange);
      return () => document.removeEventListener("visibilitychange", onStoreChange);
    },
    () => document.hidden,
    () => false,
  );
}

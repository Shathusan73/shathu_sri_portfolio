"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | null = null;

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  if (cached !== null) return cached;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cached = Boolean(gl);
  } catch {
    cached = false;
  }

  return cached;
}

function getServerSnapshot() {
  return true;
}

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

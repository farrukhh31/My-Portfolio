"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";

type Point = { x: number; y: number };

function createPointerStore() {
  let point: Point = { x: 0, y: 0 };
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => point,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set: (next: Point) => {
      point = next;
      listeners.forEach((listener) => listener());
    },
  };
}

const heroPointerStore = createPointerStore();
const SERVER_SNAPSHOT: Point = { x: 0, y: 0 };

/**
 * Reads the live pointer position (viewport coordinates). Only the
 * component calling this re-renders when the pointer moves — the rest
 * of the hero tree (buttons, stats, description) is untouched.
 */
export function useHeroPointer(): Point {
  return useSyncExternalStore(
    heroPointerStore.subscribe,
    heroPointerStore.getSnapshot,
    () => SERVER_SNAPSHOT
  );
}

/**
 * Attaches the single mousemove listener that feeds the pointer store.
 * Mount once, at the root of the hero section.
 */
export function useHeroPointerTracker(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      heroPointerStore.set({ x: e.clientX, y: e.clientY });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [ref]);
}

"use client";

import React, { useCallback, useRef } from "react";

/**
 * Custom hook for creating throttled callbacks using requestAnimationFrame
 * Perfect for UI interactions that need smooth visual feedback
 *
 * @param callback - The function to throttle
 * @param delay - Optional delay in milliseconds (defaults to requestAnimationFrame)
 * @returns Throttled version of the callback
 */
export function useThrottledCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay?: number
): T {
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastExecuted = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      // Cancel previous scheduled calls
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (delay) {
        // Use timeout-based throttling for specific delays
        if (now - lastExecuted.current >= delay) {
          lastExecuted.current = now;
          callback(...args);
        } else {
          timeoutRef.current = setTimeout(() => {
            lastExecuted.current = Date.now();
            callback(...args);
          }, delay - (now - lastExecuted.current));
        }
      } else {
        // Use requestAnimationFrame for smooth UI updates
        rafRef.current = requestAnimationFrame(() => {
          callback(...args);
        });
      }
    },
    [callback, delay]
  ) as T;

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Hook for debouncing callbacks - waits for a pause in calls before executing
 *
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds to wait for pause
 * @returns Debounced version of the callback
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

import type { Logger, Progress } from "./defs.js";
/**
 * Get the event target for receiving scroll events
 * - return the window if the element is either the html or body element
 * - otherwise, return the element
 */
export declare function getScrollEventTarget(element: HTMLElement): Window | HTMLElement;
/**
 * Get a minimal logger with a prefix
 */
export declare function getLogger(prefix: string): {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
/**
 * Make sure the provided elements are valid
 */
export declare function validateElements(elements: HTMLElement[], logger?: Logger): void;
/**
 * Validate the progress, log errors for invalid values
 */
export declare function validateProgress(progress: Partial<Progress>, logger?: Logger): boolean;
//# sourceMappingURL=functions.d.ts.map
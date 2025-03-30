import type { Progress } from "./defs.js";
/** Return a Promise that resolves after the next event loop. */
export declare const nextTick: () => Promise<void>;
/** Check if an element has overflow */
export declare const hasOverflow: ({ clientWidth, clientHeight, scrollWidth, scrollHeight, }: HTMLElement) => boolean;
/** Check if an element is set to overflow: auto in at least one direction */
export declare const hasCSSOverflow: (element: HTMLElement) => boolean;
/** Get the scroll progress of an element, between 0-1 */
export declare const getScrollProgress: (el: HTMLElement | undefined) => Progress;
//# sourceMappingURL=helpers.d.ts.map
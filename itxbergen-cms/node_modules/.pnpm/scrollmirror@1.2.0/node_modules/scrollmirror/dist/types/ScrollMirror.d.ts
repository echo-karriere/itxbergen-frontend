import type { Progress, Options } from "./support/defs.js";
/**
 * Mirrors the scroll position of multiple elements on a page
 */
export default class ScrollMirror {
    /** Mirror the scroll positions of these elements */
    readonly elements: HTMLElement[];
    /** The default options */
    readonly defaults: Options;
    /** The parsed options */
    options: Options;
    /** Is mirroring paused? */
    paused: boolean;
    constructor(elements: NodeListOf<Element> | Element[], options?: Partial<Options>);
    /** Pause mirroring */
    pause(): void;
    /** Resume mirroring */
    resume(): void;
    /** Destroy. Removes all event handlers */
    destroy(): void;
    /**
     * Get the scroll container, based on element provided:
     * - return the element if it's a child of <body>
     * - otherwise, return the documentElement
     */
    getScrollContainer(el: unknown): HTMLElement;
    /**
     * Get the scroll position from the first container that has overflow
     */
    get progress(): Progress;
    /**
     * Set the scroll progress of all mirrored elements
     *
     * The progress is an object of { x:number , y: number }, where both x and y are a number
     * between 0-1
     *
     * Examples:
     *  - `const progress = mirror.progress` — returns something like { x: 0.2, y:0.5 }
     *  - `mirror.progress = 0.5` — set the scroll position to 50% on both axes
     *  - `mirror.progress = { y: 0.5 }` — set the scroll position to 50% on the y axis
     *  - `mirror.progress = { x: 0.2, y: 0.5 }` — set the scroll position on both axes
     */
    set progress(value: Partial<Progress> | number);
}
//# sourceMappingURL=ScrollMirror.d.ts.map
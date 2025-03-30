/**
 * Compare.
 */
export declare function compareHotkey(
  object: HotKey,
  event: KeyboardEventLike,
): boolean;

export declare interface HotKey {
  which?: number | undefined;
  key?: string | undefined;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

export declare interface HotKeyOptions {
  byKey: boolean;
}

export declare function isCodeHotkey(
  hotkey: string | readonly string[],
): (event: KeyboardEventLike) => boolean;

export declare function isCodeHotkey(
  hotkey: string | readonly string[],
  event: KeyboardEventLike,
): boolean;

export declare function isHotkey(
  hotkey: string | readonly string[],
  options?: HotKeyOptions,
): (event: KeyboardEventLike) => boolean;

export declare function isHotkey(
  hotkey: string | readonly string[],
  event: KeyboardEventLike,
): boolean;

export declare function isHotkey(
  hotkey: string | readonly string[],
  options: HotKeyOptions,
  event: KeyboardEventLike,
): boolean;

export declare function isKeyHotkey(
  hotkey: string | readonly string[],
): (event: KeyboardEventLike) => boolean;

export declare function isKeyHotkey(
  hotkey: string | readonly string[],
  event: KeyboardEventLike,
): boolean;

export declare interface KeyboardEventLike {
  key: string;
  which: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

/**
 * Parse.
 */
export declare function parseHotkey(
  hotkey: string,
  options?: HotKeyOptions,
): HotKey;

/**
 * Utils.
 */
export declare function toKeyCode(name: string): number;

export declare function toKeyName(name: string): string;

export {};

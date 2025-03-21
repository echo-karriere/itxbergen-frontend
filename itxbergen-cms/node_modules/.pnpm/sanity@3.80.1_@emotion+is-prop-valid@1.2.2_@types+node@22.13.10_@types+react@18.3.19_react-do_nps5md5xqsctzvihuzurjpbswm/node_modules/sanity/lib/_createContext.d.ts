import {Context} from 'react'

/**
 * @internal
 * @hidden
 */
export declare function createContext<ContextType, const T extends ContextType = ContextType>(
  /**
   * It's important to prefix these keys as they are global
   */
  key: `sanity/_singletons/context/${string}`,
  defaultValue: T,
): Context<ContextType>

export {}

import { AnyActorRef } from 'xstate';
export declare function useSelector<TActor extends Pick<AnyActorRef, 'subscribe' | 'getSnapshot'> | undefined, T>(actor: TActor, selector: (snapshot: TActor extends {
    getSnapshot(): infer TSnapshot;
} ? TSnapshot : undefined) => T, compare?: (a: T, b: T) => boolean): T;

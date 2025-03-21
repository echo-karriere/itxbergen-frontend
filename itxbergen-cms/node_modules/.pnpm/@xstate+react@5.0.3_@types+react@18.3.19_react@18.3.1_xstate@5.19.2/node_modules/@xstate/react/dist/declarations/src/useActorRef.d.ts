import { Actor, ActorOptions, AnyActorLogic, Observer, SnapshotFrom, type ConditionalRequired, type IsNotNever, type RequiredActorOptionsKeys } from 'xstate';
export declare function useIdleActorRef<TLogic extends AnyActorLogic>(logic: TLogic, ...[options]: ConditionalRequired<[
    options?: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    }
], IsNotNever<RequiredActorOptionsKeys<TLogic>>>): Actor<TLogic>;
export declare function useActorRef<TLogic extends AnyActorLogic>(machine: TLogic, ...[options, observerOrListener]: IsNotNever<RequiredActorOptionsKeys<TLogic>> extends true ? [
    options: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    },
    observerOrListener?: Observer<SnapshotFrom<TLogic>> | ((value: SnapshotFrom<TLogic>) => void)
] : [
    options?: ActorOptions<TLogic>,
    observerOrListener?: Observer<SnapshotFrom<TLogic>> | ((value: SnapshotFrom<TLogic>) => void)
]): Actor<TLogic>;

import { Actor, ActorOptions, AnyActorLogic, SnapshotFrom, type ConditionalRequired, type IsNotNever, type RequiredActorOptionsKeys } from 'xstate';
export declare function useActor<TLogic extends AnyActorLogic>(logic: TLogic, ...[options]: ConditionalRequired<[
    options?: ActorOptions<TLogic> & {
        [K in RequiredActorOptionsKeys<TLogic>]: unknown;
    }
], IsNotNever<RequiredActorOptionsKeys<TLogic>>>): [SnapshotFrom<TLogic>, Actor<TLogic>['send'], Actor<TLogic>];

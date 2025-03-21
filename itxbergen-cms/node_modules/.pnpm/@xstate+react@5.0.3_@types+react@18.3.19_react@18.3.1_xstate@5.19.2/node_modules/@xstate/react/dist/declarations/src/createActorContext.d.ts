import * as React from 'react';
import { Actor, ActorOptions, AnyActorLogic, SnapshotFrom } from 'xstate';
export declare function createActorContext<TLogic extends AnyActorLogic>(actorLogic: TLogic, actorOptions?: ActorOptions<TLogic>): {
    useSelector: <T>(selector: (snapshot: SnapshotFrom<TLogic>) => T, compare?: (a: T, b: T) => boolean) => T;
    useActorRef: () => Actor<TLogic>;
    Provider: (props: {
        children: React.ReactNode;
        options?: ActorOptions<TLogic>;
        /** @deprecated Use `logic` instead. */
        machine?: never;
        logic?: TLogic;
    }) => React.ReactElement<any, any>;
};

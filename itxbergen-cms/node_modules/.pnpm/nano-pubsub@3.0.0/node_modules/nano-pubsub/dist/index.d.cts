/**
 * @public
 */
declare function createPubSub<Message = void>(): PubSub<Message>
export default createPubSub

/**
 * @public
 */
export declare interface PubSub<Message> {
  publish: (message: Message) => void
  subscribe: (subscriber: Subscriber<Message>) => () => void
}

/**
 * @public
 */
export declare interface Subscriber<Event> {
  (event: Event): void
}

export {}

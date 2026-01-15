import type { AsyncTransport, Subscription } from './types';

type Handler = (rawMessage: unknown) => Promise<void>;

export function createInMemoryTransport(): AsyncTransport {
    const handlersByChannel = new Map<string, Set<Handler>>();

    function getHandlers(channel: string) {
        let handlers = handlersByChannel.get(channel);
        if (!handlers) {
            handlers = new Set<Handler>();
            handlersByChannel.set(channel, handlers);
        }
        return handlers;
    }

    async function subscribe(subscription: Subscription, handler: Handler) {
        const handlers = getHandlers(subscription.channel);
        handlers.add(handler);
        return () => {
            handlers.delete(handler);
        };
    }

    async function publish(subscription: Subscription, message: unknown) {
        const handlers = handlersByChannel.get(subscription.channel);
        if (!handlers || handlers.size === 0) return;
        await Promise.all(Array.from(handlers, (handler) => handler(message)));
    }

    return { subscribe, publish };
}

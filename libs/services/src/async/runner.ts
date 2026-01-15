import type { ServiceContext } from '../runtime/context';
import type { AsyncTransport, ConsumerDefinition } from './types';

export type RunConsumersOptions<TDeps> = {
    transport: AsyncTransport;
    consumers: Array<ConsumerDefinition<TDeps, unknown>>;
    createContext: (message: unknown) => ServiceContext<TDeps>;
};

export async function runConsumers<TDeps>({ transport, consumers, createContext }: RunConsumersOptions<TDeps>) {
    const unsubs = await Promise.all(
        consumers.map(async (consumer) =>
            transport.subscribe(consumer.subscription, async (rawMessage) => {
                const message = consumer.schema.parse(rawMessage);
                const ctx = createContext(message);
                await consumer.handler(ctx, message);
            }),
        ),
    );

    return async () => {
        await Promise.all(unsubs.map(async (unsub) => unsub()));
    };
}

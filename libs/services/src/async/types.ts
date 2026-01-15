import type { z } from 'zod';
import type { ServiceContext } from '../runtime/context';
import type { DomainName, EventEnvelope, EventName } from '../runtime/domain';

export type Subscription = {
    channel: string;
    groupId?: string;
};

export type ConsumerDefinition<TDeps, TMessage> = {
    subscription: Subscription;
    schema: z.ZodType<TMessage>;
    handler: (ctx: ServiceContext<TDeps>, message: TMessage) => Promise<void>;
};

export type DomainConsumerDefinition<
    TDeps,
    TDomain extends DomainName,
    TName extends EventName<TDomain>,
    TPayload,
> = ConsumerDefinition<TDeps, EventEnvelope<TDomain, TName, TPayload>> & {
    domain: TDomain;
    name: TName;
};

export type AsyncTransport = {
    subscribe: (subscription: Subscription, handler: (rawMessage: unknown) => Promise<void>) => Promise<() => Promise<void> | void>;
    publish: (subscription: Subscription, message: unknown) => Promise<void>;
};

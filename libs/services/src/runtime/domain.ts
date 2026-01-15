import { z } from 'zod';

export type DomainName = string;
export type EventName<TDomain extends DomainName> = `${TDomain}.${string}`;

export type EventEnvelope<TDomain extends DomainName, TName extends EventName<TDomain>, TPayload> = {
    id: string;
    occurredAt: string;
    domain: TDomain;
    name: TName;
    version: number;
    payload: TPayload;
    meta?: Record<string, unknown>;
};

export function defineDomain<TDomain extends string>(domain: TDomain) {
    return {
        domain,
        event: <TName extends string, TPayloadSchema extends z.ZodTypeAny>(
            eventName: TName,
            payloadSchema: TPayloadSchema,
            version = 1,
        ) => {
            const name = `${domain}.${eventName}` as const;
            const schema = z.object({
                id: z.string().min(1),
                occurredAt: z.string().min(1),
                domain: z.literal(domain),
                name: z.literal(name),
                version: z.literal(version),
                payload: payloadSchema,
                meta: z.record(z.unknown()).optional(),
            });

            return { domain, name, version, schema };
        },
    };
}

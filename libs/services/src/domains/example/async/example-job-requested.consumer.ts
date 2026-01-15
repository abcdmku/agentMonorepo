import type { DomainConsumerDefinition } from '../../../async/types';
import type { ExampleJobRequestedPayload } from '../contracts';
import { ExampleJobRequested } from '../contracts';
import { runExampleJob, type ExampleDeps } from '../sync/run-example-job';

export const exampleJobRequestedConsumer: DomainConsumerDefinition<
    ExampleDeps,
    typeof ExampleJobRequested.domain,
    typeof ExampleJobRequested.name,
    ExampleJobRequestedPayload
> = {
    domain: ExampleJobRequested.domain,
    name: ExampleJobRequested.name,
    subscription: { channel: ExampleJobRequested.name, groupId: 'example' },
    schema: ExampleJobRequested.schema,
    handler: async (ctx, message) => {
        await runExampleJob(ctx, message.payload);
    },
};

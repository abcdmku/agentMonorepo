import { z } from 'zod';
import { exampleDomain } from './domain';

export const ExampleJobRequested = exampleDomain.event(
    'jobRequested',
    z.object({
        jobId: z.string().min(1),
        requestedBy: z.string().min(1),
    }),
);

export type ExampleJobRequested = z.infer<typeof ExampleJobRequested.schema>;
export type ExampleJobRequestedPayload = ExampleJobRequested['payload'];

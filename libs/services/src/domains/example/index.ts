import { exampleJobRequestedConsumer } from './async/example-job-requested.consumer';

export const exampleConsumers = [exampleJobRequestedConsumer] as const;

export * from './domain';
export * from './contracts';
export * from './sync/run-example-job';

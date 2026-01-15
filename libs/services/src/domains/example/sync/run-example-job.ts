import type { UseCase } from '../../../runtime/use-case';

export type ExampleDeps = {
    apiBaseUrl?: string;
};

export type RunExampleJobInput = {
    jobId: string;
    requestedBy: string;
};

export type RunExampleJobOutput = {
    ok: true;
};

export const runExampleJob: UseCase<ExampleDeps, RunExampleJobInput, RunExampleJobOutput> = async (ctx, input) => {
    ctx.logger.info('Running example job', {
        domain: 'example',
        jobId: input.jobId,
        requestedBy: input.requestedBy,
        apiBaseUrl: ctx.deps.apiBaseUrl,
    });

    return { ok: true };
};

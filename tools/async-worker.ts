import { createInMemoryTransport, createServiceContext, runConsumers, allConsumers } from '@repo/services';

async function main() {
    const transport = createInMemoryTransport();

    const stop = await runConsumers({
        transport,
        consumers: allConsumers,
        createContext: () => createServiceContext({ apiBaseUrl: process.env.API_BASE_URL }),
    });

    await transport.publish(
        { channel: 'example.jobRequested', groupId: 'example' },
        {
            id: 'demo-1',
            occurredAt: new Date().toISOString(),
            domain: 'example',
            name: 'example.jobRequested',
            version: 1,
            payload: { jobId: 'job-123', requestedBy: 'tools/async-worker.ts' },
        },
    );

    await stop();
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});

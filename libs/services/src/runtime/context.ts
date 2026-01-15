import type { Logger } from './logger';
import { consoleLogger } from './logger';

export type ServiceContext<TDeps = unknown> = {
    deps: TDeps;
    logger: Logger;
    now: () => Date;
};

export function createServiceContext<TDeps>(deps: TDeps, overrides?: Partial<ServiceContext<TDeps>>): ServiceContext<TDeps> {
    return {
        deps,
        logger: overrides?.logger ?? consoleLogger,
        now: overrides?.now ?? (() => new Date()),
    };
}

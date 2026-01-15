import type { ServiceContext } from './context';

export type UseCase<TDeps, TInput, TOutput> = (ctx: ServiceContext<TDeps>, input: TInput) => Promise<TOutput>;

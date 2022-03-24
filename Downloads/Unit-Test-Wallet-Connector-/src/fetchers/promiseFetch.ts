import { useConnectorStore } from '../state/store';
import { selectPriorityConnector } from '../state/selectors';
import { ConnectorState } from '../state/connectorSlice';

interface Options {
  deps: (keyof ConnectorState)[];
}

export type DepArguments = Required<ConnectorState>;

type FetchWrapper = <T>(
  fetcher: (arg0: DepArguments) => Promise<T>,
  { deps }: Options,
) => Promise<{ result?: T | undefined; error?: unknown }>;

export const fetchWithStore: FetchWrapper = async (fetcher, { deps }) => {
  const state = selectPriorityConnector(useConnectorStore.getState());

  try {
    deps.forEach((dependency) => {
      if (deps.includes(dependency) && !state[dependency]) throw new Error(`Missing dependency: ${dependency}`);
    });
    const stateWithRequiredParams = state as Required<ConnectorState>;
    return { result: await fetcher(stateWithRequiredParams), error: false };
  } catch (e) {
    return { error: e };
  }
};

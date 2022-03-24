import { InitializedConnector } from '../connectors';
import produce from 'immer';
import { providers } from 'ethers';
import { GetState, SetState } from 'zustand';
import { ConnectorSlice } from './connectorSlice';

interface SyncStoreProps<T extends ConnectorSlice> {
  connectors: InitializedConnector[];
  set: SetState<T>;
  get: GetState<T>;
}

export function syncStoreWithConnectorState<T extends ConnectorSlice>({ connectors, set, get }: SyncStoreProps<T>) {
  connectors.forEach((c) => {
    c.store.subscribe(({ accounts, activating, chainId, error }) => {
      set(
        produce(get(), (draft) => {
          const cToUpdate = draft.connectorStates.find((connector) => c.name === connector.name)!;
          cToUpdate.account = accounts?.[0];
          cToUpdate.chainId = chainId;
          cToUpdate.activating = activating;
          cToUpdate.error = error;

          if (cToUpdate.connector.provider) {
            cToUpdate.provider = new providers.Web3Provider(cToUpdate.connector.provider);
          }
        }),
      );
    });
  });
}

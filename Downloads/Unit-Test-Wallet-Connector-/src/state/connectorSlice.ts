import { ConnectorName, connectors } from '../connectors';
import { providers } from 'ethers';
import { GetState, SetState } from 'zustand';
import { syncStoreWithConnectorState } from './syncStoreWithConnectorState';
import { Connector, Web3ReactState } from '@web3-react/types';
import { Web3Provider } from '@ethersproject/providers';
import { WalletStoreState } from './store';

export interface ConnectorState {
  name: ConnectorName;
  account?: string;
  connector: Connector;
  provider?: Web3Provider;
  chainId: Web3ReactState['chainId'];
  activating: Web3ReactState['activating'];
  error: Web3ReactState['error'];
}

export const initConnectorStates = (): ConnectorState[] => {
  return connectors.map((c) => {
    const { instance: connector, store, name } = c;
    const { accounts, chainId, activating, error } = store.getState();

    return {
      name,
      account: accounts?.[0],
      chainId,
      activating,
      error,
      connector,
      provider: connector.provider ? new providers.Web3Provider(connector.provider) : undefined,
    };
  });
};

export interface ConnectorSlice {
  connectorStates: ConnectorState[];
}

export function createConnectorSlice<T extends WalletStoreState>(set: SetState<T>, get: GetState<T>): ConnectorSlice {
  const connectorStates = initConnectorStates();
  syncStoreWithConnectorState({ connectors, set, get });
  return { connectorStates };
}

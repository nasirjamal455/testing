import type { Web3ReactHooks } from '@web3-react/core';
import type { Connector, Web3ReactStore } from '@web3-react/types';
import { metaMaskConnector } from './metaMask';
import { networkConnector } from './network';

export type ConnectorName = 'MetaMask' | 'Network';

export interface InitializedConnector {
  name: ConnectorName;
  instance: Connector;
  hooks: Web3ReactHooks;
  store: Web3ReactStore;
}

export const connectors: InitializedConnector[] = [metaMaskConnector, networkConnector];

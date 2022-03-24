import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { ChainIds, ChainRpcUrls } from '../chains';

const [connector, hooks, store] = initializeConnector<Network>(
  (actions) => new Network(actions, ChainRpcUrls),
  ChainIds,
);

export const networkConnector = {
  name: 'Network' as const,
  instance: connector,
  hooks,
  store,
};

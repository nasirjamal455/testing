import { WalletStoreState } from './store';
import { ConnectorState } from './connectorSlice';

export const connectorIsActive = (cs: ConnectorState): boolean => {
  return !!cs.chainId && !!cs.account && !cs.activating && !cs.error;
};

const isNetworkConnector = (cs: ConnectorState) => cs.name === 'Network';

/* Deemed connected if not Network connection & is active */
export const selectWalletIsConnected = (state: WalletStoreState): boolean => {
  const connector = selectPriorityConnector(state);
  return isNetworkConnector(connector) ? false : connectorIsActive(connector);
};

export const selectPriorityConnector = (state: WalletStoreState): ConnectorState => {
  const activeConnector = state.connectorStates.find(connectorIsActive);
  const backupConnector = state.connectorStates.find(isNetworkConnector)!;
  return activeConnector ?? backupConnector;
};

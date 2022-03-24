import { FC } from 'react';
import { useConnectorStore } from '../state/store';
import { selectPriorityConnector } from '../state/selectors';

export const WalletStatus: FC = () => {
  const { chainId, account, activating, name, error, connector } = useConnectorStore(selectPriorityConnector);

  return (
    <div>
      <h2>Active Wallet status</h2>
      <div>Connector name: {name}</div>
      <div>Chain: {chainId}</div>
      <div>Account: {account}</div>
      <div>Activating: {String(activating)}</div>
      <div>Error: {error?.message}</div>
      <button onClick={() => connector.deactivate()}>Disconnect</button>
    </div>
  );
};

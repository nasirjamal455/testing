import { FC } from 'react';

export type ConnectorToActivate = {
  name: string;
  activate: () => void;
};

export const ActivateConnector: FC<ConnectorToActivate> = ({ name, activate }) => {
  return (
    <div>
      <p data-testid="name">Connector name: {name}</p>
      <button onClick={() => activate()}>Connect</button>
    </div>
  );
};

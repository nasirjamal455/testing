import { FC } from 'react';
import styled from 'styled-components';
import { useConnectorStore } from '../state/store';
import { ActivateConnector } from './ActivateConnector';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const WalletSelectionModal: FC = () => {
  const connectorStates = useConnectorStore((state) => state.connectorStates);
  return (
    <Container>
      {connectorStates.map((cState, i) => (
        <ActivateConnector key={i} name={cState.name} activate={() => cState.connector.activate()} />
      ))}
    </Container>
  );
};

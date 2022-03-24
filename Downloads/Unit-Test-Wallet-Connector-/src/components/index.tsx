import { FC } from 'react';
import { useConnectorStore } from '../state/store';
import { ConnectButton } from './ConnectButton';
import { selectWalletIsConnected } from '../state/selectors';
import { WalletSelectionModal } from './WalletSelectionModal';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

export const SushiWalletConnector: FC = () => {
  const walletIsConnected = useConnectorStore(selectWalletIsConnected);
  const modalIsOpen = useConnectorStore((state) => state.modal.isOpen);

  return (
    <Container>
      {walletIsConnected ? <div>connected</div> : <ConnectButton />}
      {modalIsOpen && <WalletSelectionModal />}
    </Container>
  );
};

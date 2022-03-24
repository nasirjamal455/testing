import React, { FC } from 'react';
import { SushiWalletConnector } from 'sushi-wallet-connector';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header: FC = () => {
  return (
    <HeaderContainer>
      <div>
        <h1>Sample App</h1>
        <h3>Demo of wallet connector component</h3>
      </div>
      <SushiWalletConnector />
    </HeaderContainer>
  );
};

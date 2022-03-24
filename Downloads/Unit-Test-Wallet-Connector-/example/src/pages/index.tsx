import React, { FC } from 'react';
import { GuardianCount } from '../components/GuardianCount';
import { EthBalance } from '../components/EthBalance';
import { WalletProvider } from 'sushi-wallet-connector';
import { SendSelfEth } from '../components/SendSelfEth';
import { GuardianCountComposable } from '../components/GuardianCountComposable';
import { Header } from '../components/Header';

const Index: FC = () => {
  return (
    <WalletProvider>
      <Header />
      <EthBalance />
      <GuardianCount />
      <GuardianCountComposable />
      <SendSelfEth />
    </WalletProvider>
  );
};

export default Index;

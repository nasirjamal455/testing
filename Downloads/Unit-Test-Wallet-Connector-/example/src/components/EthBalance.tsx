import { FC } from 'react';
import { ethers } from 'ethers';
import { FetcherProps, useConnectedWallet } from 'sushi-wallet-connector';

const ethBalanceFetcher = async ({ provider, account }: FetcherProps) => {
  const balance = await provider.getBalance(account);
  return ethers.utils.formatEther(balance);
};

/* Example of component that you want to be eagerly loading & reactive */
export const EthBalance: FC = () => {
  const { data, isLoading, error, isWalletConnected } = useConnectedWallet<string>(ethBalanceFetcher);

  return (
    <div>
      <div>wallet connected: {String(isWalletConnected)}</div>
      <div>Eth balance result: {data}</div>
      <div>Eth balance isLoading: {String(isLoading)}</div>
      <div>Eth balance error: {String(error)}</div>
    </div>
  );
};

import { Web3Provider } from '@ethersproject/providers';
import { useConnectorStore } from '../state/store';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { selectPriorityConnector } from '../state/selectors';

export interface FetcherProps {
  provider: Web3Provider;
  account: string;
}

type FetchHook = <T>(fetcher: (arg0: FetcherProps) => Promise<T>) => {
  isLoading: false | true;
  data: T | undefined;
  isWalletConnected: boolean;
  error: unknown;
};

export const useConnectedWallet: FetchHook = (fetcher) => {
  const { account, provider } = useConnectorStore(selectPriorityConnector);

  const cacheKey = useMemo(
    () => String(fetcher) + String(account) + String(provider?.network?.chainId),
    [account, fetcher, provider?.network?.chainId],
  );

  const { isLoading, error, data } = useQuery(
    cacheKey,
    async () => await fetcher({ account, provider } as FetcherProps),
    {
      enabled: Boolean(account && provider),
    },
  );

  return { data, isLoading, error, isWalletConnected: Boolean(account && provider) };
};

import { FC } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { InitWeb3 } from './InitWeb3';
import { Fonts } from './Fonts';

export const walletQueryClient = new QueryClient();

export const WalletProvider: FC = ({ children }) => {
  return (
    <QueryClientProvider client={walletQueryClient}>
      <Fonts />
      <InitWeb3 />
      {children}
    </QueryClientProvider>
  );
};

import chainData from './chains.json';
import { Chain } from './types';
import produce from 'immer';

const INFURA_PROJECT_ID = '1dc6b49cbb744ac696d363c3d9530083';

// Data retrieved from: https://chainid.network/chains.json
export const Chains: Chain[] = chainData.map((chain) =>
  produce(chain, (draft) => {
    draft.rpc = draft.rpc
      .map((url) => url.replace('${INFURA_API_KEY}', INFURA_PROJECT_ID))
      .filter((url) => !url.includes('wss://'));
  }),
);

export const ChainIds: Chain['chainId'][] = Chains.map((chain) => chain.chainId);

type ChainIdToUrlsMap = Record<Chain['chainId'], NonNullable<Chain['rpc']>>;

export const ChainRpcUrls: ChainIdToUrlsMap = Chains.filter((chain) =>
  Boolean(chain.rpc?.length),
).reduce<ChainIdToUrlsMap>((acc, curr) => {
  acc[curr.chainId] = curr.rpc as string[];
  return acc;
}, {});

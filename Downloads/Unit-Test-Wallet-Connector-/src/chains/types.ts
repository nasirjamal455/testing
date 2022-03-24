export interface Chain {
  name: string;
  chain: string;
  icon?: string;
  rpc?: string[];
  faucets?: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44?: number;
  ens?: Ens;
  explorers?: Explorer[];
  title?: string;
  parent?: Parent;
  network?: string;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Ens {
  registry: string;
}

export interface Explorer {
  name: string;
  url: string;
  standard: string;
  icon?: string;
}

export interface Parent {
  type: string;
  chain: string;
  bridges?: Bridge[];
}

export interface Bridge {
  url: string;
}

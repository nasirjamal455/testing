import create, { GetState, SetState } from 'zustand';
import { ConnectorSlice, createConnectorSlice } from './connectorSlice';
import { createModalSlice, ModalSlice } from './modalSlice';

export type WalletStoreState = ConnectorSlice & ModalSlice;

export function createWalletSlices<T extends WalletStoreState>(set: SetState<T>, get: GetState<T>) {
  return { ...createConnectorSlice(set, get), ...createModalSlice(set) };
}

export const useConnectorStore = create<WalletStoreState>((set, get) => ({
  ...createWalletSlices(set, get),
}));

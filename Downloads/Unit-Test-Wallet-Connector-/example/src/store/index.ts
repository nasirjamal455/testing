import create, { GetState, SetState } from 'zustand';
import { createWalletSlices, WalletStoreState } from 'sushi-wallet-connector';
import { createGuardianSlice, GuardianSlice } from './guardianSlice';

export type AppStoreState = WalletStoreState & GuardianSlice;

export type StoreSlice<T> = (set: SetState<AppStoreState>, get: GetState<AppStoreState>) => T;

export const useAppStore = create<AppStoreState>((set, get) => {
  return {
    ...createWalletSlices(set, get),
    ...createGuardianSlice(set, get),
    testSlice: { a: 123 },
  };
});

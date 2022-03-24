import produce from 'immer';
import { Contract } from '@ethersproject/contracts';
import { guardianContractAbi } from '../contracts/guardianContractAbi';
import { StoreSlice } from './index';
import { selectPriorityConnector } from 'sushi-wallet-connector';

export interface GuardianSlice {
  guardian: {
    inputText: string;
    setInputText: (text: string) => void;
    fetchGuardianCount: () => Promise<void>;
    count?: string;
    error?: string;
  };
}

export const createGuardianSlice: StoreSlice<GuardianSlice> = (set, get) => {
  return {
    guardian: {
      inputText: '',
      setInputText: (text: string) =>
        set(
          produce((state) => {
            state.guardian.inputText = text;
          }),
        ),
      error: undefined,
      count: undefined,
      fetchGuardianCount: async (): Promise<void> => {
        try {
          const { provider } = selectPriorityConnector(get());
          const guardianContract = new Contract(
            '0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7',
            guardianContractAbi,
            provider,
          );
          const result = await guardianContract['guardianCount'](get().guardian.inputText);
          set(
            produce((state) => {
              state.guardian.count = result.toNumber().toString();
            }),
          );
        } catch (error) {
          set(
            produce((state) => {
              state.guardian.count = undefined;
              state.guardian.error = String(error);
            }),
          );
        }
      },
    },
  };
};

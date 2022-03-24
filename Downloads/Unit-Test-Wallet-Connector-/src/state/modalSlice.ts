import { SetState } from 'zustand';
import { WalletStoreState } from './store';
import produce from 'immer';

export interface ModalSlice {
  modal: {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
  };
}

export function createModalSlice<T extends WalletStoreState>(set: SetState<T>): ModalSlice {
  return {
    modal: {
      isOpen: false,
      setOpen: (open: boolean) => {
        set(
          produce((state) => {
            state.modal.isOpen = open;
          }),
        );
      },
    },
  };
}

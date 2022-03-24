import { FC } from 'react';
import { useConnectorStore } from '../state/store';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  color: white;
  font-family: 'DM Sans', sans-serif;
  padding: 0 0.75rem;
  border-width: 0;
  border-radius: 0.625rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  opacity: 1;
  position: relative;
  //background-image: linear-gradient(0.25turn, #c932a7, #8f49bb);
  background-image: linear-gradient(0.25turn, #ef39c5, #ab54dc);
  z-index: 1;

  ::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(0.25turn, #ab54dc, #ef39c5);
    z-index: -1;
    transition: opacity 200ms linear;
    opacity: 0;
    border-radius: 0.625rem;
  }

  :hover::before {
    opacity: 1;
  }
`;

export const ConnectButton: FC = () => {
  const { setOpen, isOpen } = useConnectorStore((state) => state.modal);
  return <Button onClick={() => setOpen(!isOpen)}>{!isOpen ? 'Connect to a wallet' : 'Select a provider'}</Button>;
};

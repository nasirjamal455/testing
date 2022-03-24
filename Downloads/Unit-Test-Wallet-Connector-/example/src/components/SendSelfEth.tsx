import { FC, useState } from 'react';
import { DepArguments, fetchWithStore } from 'sushi-wallet-connector';
import { ethers } from 'ethers';

const sendSelfEthAction =
  (amount: string) =>
  async ({ provider, account }: DepArguments) => {
    const sendAction = {
      from: account,
      to: account,
      value: ethers.utils.parseEther(amount),
      nonce: provider.getTransactionCount(account, 'latest'),
      gasLimit: ethers.utils.hexlify(0x100000),
      gasPrice: await provider.getGasPrice(),
    };
    const txResponse = await provider.getSigner().sendTransaction(sendAction);
    return txResponse.hash;
  };

/* Example of write component */
export const SendSelfEth: FC = () => {
  const [tx, setTx] = useState('');
  const [inputText, setInputText] = useState('0');
  const [error, setError] = useState('false');

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button
        onClick={async () => {
          const { result, error } = await fetchWithStore(sendSelfEthAction(inputText), {
            deps: ['provider', 'account'],
          });
          setTx(result ? result : '');
          setError(String(error));
        }}
      >
        Send self Eth
      </button>
      <div>transaction: {tx}</div>
      <div>Has error: {error}</div>
    </div>
  );
};

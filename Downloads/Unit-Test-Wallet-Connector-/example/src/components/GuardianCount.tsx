import { FC, useState } from 'react';
import { guardianContractAbi } from '../contracts/guardianContractAbi';
import { Contract } from '@ethersproject/contracts';
import { DepArguments, fetchWithStore } from 'sushi-wallet-connector';

const guardianCountFetcher =
  (account: string) =>
  async ({ provider }: DepArguments): Promise<string> => {
    const guardianContract = new Contract('0xFF5A7299ff6f0fbAad9b38906b77d08c0FBdc9A7', guardianContractAbi, provider);
    const res = await guardianContract['guardianCount'](account);
    return res.toNumber().toString();
  };

/* Example of component that you want fetching data on demand and only once */
export const GuardianCount: FC = () => {
  const [guardianCount, setGuardianCount] = useState<string>();
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('false');

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button
        onClick={async () => {
          const { result, error } = await fetchWithStore(guardianCountFetcher(inputText), {
            deps: ['provider'],
          });
          setGuardianCount(result);
          setError(String(error));
        }}
      >
        Get argent guardian count
      </button>
      <div>Guardian Count: {guardianCount}</div>
      <div>Has error: {error}</div>
    </div>
  );
};

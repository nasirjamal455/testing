import { FC } from 'react';
import { useAppStore } from '../store';

/* Example of component with wallet-composed store selectors */
export const GuardianCountComposable: FC = () => {
  const { inputText, setInputText, fetchGuardianCount, error, count } = useAppStore((state) => state.guardian);

  return (
    <div>
      <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
      <button onClick={fetchGuardianCount}>Get argent guardian count</button>
      <div>Guardian Count: {count}</div>
      <div>Has error: {error}</div>
    </div>
  );
};

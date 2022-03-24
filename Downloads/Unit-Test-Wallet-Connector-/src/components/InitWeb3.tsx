import { FC, useEffect } from 'react';
import { useConnectorStore } from '../state/store';

export const InitWeb3: FC = () => {
  const states = useConnectorStore((state) => state.connectorStates);

  /* Connector activation is only safe client side. Run once on mount. */
  useEffect(() => {
    states.forEach((s) => {
      if (s.name === 'Network') {
        s.connector.activate();
      } else if (s.connector.connectEagerly) {
        s.connector.connectEagerly();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

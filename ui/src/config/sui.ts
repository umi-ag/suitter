import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js';

export const providerSuiTestnet = () => {
  const provider = new JsonRpcProvider(
    testnetConnection,
  );
  return provider;
};

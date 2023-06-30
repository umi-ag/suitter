import { JsonRpcProvider, testnetConnection } from '@mysten/sui.js';

/** 
 * create providerSuiTestnet method
 * @returns 
 */
export const providerSuiTestnet = () => {
  const provider = new JsonRpcProvider(
    testnetConnection,
  );
  return provider;
};

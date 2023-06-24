'use client';

import { WalletKitProvider as SuiWalletKitProvider, useWalletKit as useSuiWalletKit } from '@mysten/wallet-kit';

export const useWalletKit = useSuiWalletKit;

export const WalletKitProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <SuiWalletKitProvider>{children}</SuiWalletKitProvider>;
}

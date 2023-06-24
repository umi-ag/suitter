'use client';

import { WalletKitProvider } from '@mysten/wallet-kit';

export default function SuiWalletKitProvider({
  children,
}: React.PropsWithChildren) {
  return <WalletKitProvider>{children}</WalletKitProvider>;
}

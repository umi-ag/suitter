'use client';

import ConnectButton from '@/components/ConnectWalletButton';
import { useWalletKit } from '@/contexts/WalletKitContext';

export default function Profile({ address }: { address: string }) {
  const { currentAccount } = useWalletKit();

  return (
    <>
      <p>profile/{address}</p>
      <p>{currentAccount?.address}</p>
      <ConnectButton />
    </>
  );
}

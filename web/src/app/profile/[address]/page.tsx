import ConnectButton from '@/components/ConnectWalletButton';

export default function Profile({ address }: { address: string }) {
  return (
    <>
      <p>profile/{address}</p>
      <ConnectButton />
    </>
  );
}

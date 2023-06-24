'use client';

import ConnectButton from '@/components/ConnectWalletButton';
import { useWalletKit } from '@/contexts/WalletKitContext';
import { JsonRpcProvider, TransactionBlock, testnetConnection } from '@mysten/sui.js';
import Image from 'next/image';
import useSwr from 'swr';

const provider = new JsonRpcProvider(testnetConnection);
const packageId = '0x9caad95cb281d563b6fb0eeea7175c9031cf82f016a5c54fe34a2d660cf5e0ea';

const createProfileTxb = (
  name: string,
  description: string,
  website: string,
  image_url: string,
  cover_url: string,
) => {
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${packageId}::profile::create`,
    arguments: [
      txb.pure(name),
      txb.pure(description),
      txb.pure(website),
      txb.pure(image_url),
      txb.pure(cover_url),
      txb.pure('0x6')
    ],
  });

  return txb;
}

const fetchProfile = async (address: string) => {
  console.log(address);

  const r = await provider.getOwnedObjects({
    owner: address,
    filter: { StructType: `${packageId}::profile::ProfileOwnerCap` },
    options: {
      showContent: true,
    }
  });

  console.log('r', r);
  if (!r.data) return null;
}

const id = '0x8fd27dacfe03c9abf51a665d35f4f3da074b5f9aa25a07d055f3ddf4e797e55c';

type Profile = {
  id: { id: string };
  name: string;
  description: string;
  website: string;
  image_url: string;
  cover_url: string;
  created_at: string;
}

const fetchProfileNFT = async (address = id) => {
  const r = await provider.getObject({
    id: address,
    options: {
      showContent: true,
    }
  });

  if (!r.data?.content) return null;

  // @ts-ignore
  const profile = r.data.content.fields;
  console.log(profile);

  return profile as Profile;
}

export default function Profile({ params: { address } }: { params: { address: string } }) {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
  // const { data: profile } = useSwr('profile', () => fetchProfileNFT(), { revalidateOnFocus: false });
  const { data: profile } = useSwr('profile', () => fetchProfileNFT(address), { revalidateOnFocus: false });

  const c = async () => {
    const txb = createProfileTxb(
      'imataka',
      'hi',
      'https://umi.ag',
      'https://pbs.twimg.com/profile_images/475819312893022208/y5PbEHLR_400x400.jpeg',
      'https://pbs.twimg.com/profile_banners/208496573/1464198351/1500x500',
    );

    const r = await signAndExecuteTransactionBlock({ transactionBlock: txb });
    console.log(r);
  }

  return (
    <>
      <p>profile/{address}</p>
      <p>{currentAccount?.address}</p>
      <ConnectButton />
      <p>
        <button onClick={c}>create profile</button>
      </p>
      <p>
        <button onClick={() => fetchProfile(address)}>addr</button>
      </p>
      <p>
        <button onClick={() => fetchProfileNFT()}>nft</button>
      </p>

      {/* <Image src={profile?.image_url ?? ''} alt='image_url' width={300} height={300} />
      <Image src={profile?.cover_url ?? ''} alt='cover_url' width={1500} height={500} /> */}
      <p>{profile?.name ?? 'haha'}</p>
      <img src={profile?.image_url ?? ''} alt='image_url' width={300} height={300} />
      <img src={profile?.cover_url ?? ''} alt='cover_url' width={1500} height={500} />

      <pre>{JSON.stringify(profile, null, 2) ?? 'hehe'}</pre>
    </>
  );
}

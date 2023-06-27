import { TransactionBlock } from '@mysten/sui.js';
import {
  ConnectButton, useWallet,
} from '@suiet/wallet-kit';
import Link from 'next/link';
import { useState } from 'react';
import { getRecentPostIdList, getRecentPostObjectList } from 'src/suitterLib/client';
import { moveCallCreatePost } from 'src/suitterLib/moveCall';
import { SuitterPost } from 'src/suitterLib/types';

type Tweet = {
  username: string
  tweetText: string
  avatarUrl: string
}

const WalletConnectButton = () => {
  return (
    <ConnectButton>Connect Wallet</ConnectButton>
  );
};

const TweetCard = (props: SuitterPost) => {
  const { author, text } = props

  return (
    <div className="w-[100%] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://umi.ag" alt="User avatar" /> */}
          {/* <img width={60} className="m-10 object-cover" src={avatarUrl} alt="User avatar" /> */}
        </div>

        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{author}</div>
          <p className="mt-2 text-gray-500">{text}</p>
          <div className="mt-4">
            <button className="text-blue-500 hover:text-blue-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Retweet
            </button>
            <button className="text-red-500 hover:text-red-700 ml-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


const Page = () => {
  const { signAndExecuteTransactionBlock } = useWallet();
  const exctuteCreatePost = async () => {
    const txb = new TransactionBlock();
    moveCallCreatePost(txb)
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    console.log({ result })
    const url = `https://suiexplorer.com/txblock/${result.digest}?network=testnet`
    console.log(url)
  }

  const data = [
    {
      id: 1,
      username: "umi.ag",
      tweetText: "This is a tweet",
      avatarUrl: "https://umi.ag/logo.png",
    },
    {
      id: 2,
      username: "umi.ag",
      tweetText: "This is a tweet",
      avatarUrl: "https://umi.ag/logo.png",
    },
  ]

  const [recentPostList, setRecentPostList] = useState<SuitterPost[]>([])

  return (
    <main className="flex min-h-screen bg-slate-900">
      <div className="w-1/4 p-4 text-white">
        <div className="font-bold text-lg mb-4">Suitter</div>
        <div className="font-bold text-lg mb-4">Home</div>
        <button
          onClick={async () => {
            console.log("OKMARU")
            await exctuteCreatePost();
          }}>
          post
        </button>
        <button
          onClick={async () => {
            const postIdList = await getRecentPostIdList()
            const postList = await getRecentPostObjectList(postIdList)
            console.log(postList)
            setRecentPostList(postList)
          }}
        >
          get posts
        </button>
      </div>
      <div className="w-1/2 p-4 border-slate-600 border-x-[0.5px]">
        <div className="font-bold text-lg mb-4 text-white">Timeline</div>
        <div className="flex flex-col gap-4">
          {
            recentPostList.map((post) => (
              <TweetCard key={post.id} {...post} />
            ))
          }
        </div>
      </div>
      <div className="w-1/4 p-4 text-white">
        <div className="font-bold text-lg mb-4">
          <WalletConnectButton />
        </div>
        <div className="font-bold text-lg mb-4">
          <Link href="https://github.com/umi-ag/suitter">
            GitHub
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Page;

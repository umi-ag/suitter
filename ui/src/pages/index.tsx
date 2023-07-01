import {
  ConnectButton, useWallet
} from '@suiet/wallet-kit';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ChatInput from 'src/components/ChatInput';
import { PostCard } from 'src/components/PostCard';
import { SuiObjectLinkButton } from 'src/components/SuiObjectLinkButton';
import { SUITTER_PACKAGE_ID, SUITTER_RECENT_POSTS_OBJECT_ID } from 'src/config/constants';
import { getRecentPostIdList, getRecentPostObjectList } from 'src/suitterLib/client';
import { SuitterPost } from 'src/suitterLib/types';

/**
 * WalletConnectButton コンポーネント
 * @returns 
 */
const WalletConnectButton = () => {
  return (
    <ConnectButton>Connect Wallet</ConnectButton>
  );
};

/**
 * Pageコンポーネント
 * @returns 
 */
const Page = () => {
  const [recentPostList, setRecentPostList] = useState<SuitterPost[]>([])
  const { address } = useWallet();

  /**
   * 投稿内容を取得するためのメソッド
   */
  const getPosts = async () => {
    const postIdList:any = await getRecentPostIdList()
    const postList:any = await getRecentPostObjectList(postIdList)
    console.log(postList)
    setRecentPostList(postList)
  }

  /**
   * 左列用のコンポーネント
   * @returns 
   */
  const LeftPart = () => (
    <div className="w-1/4 p-4 text-white">
      <div className="font-bold text-lg mb-4">Suitter</div>
      <div className="font-bold text-lg mb-4">Home</div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          USER
          <SuiObjectLinkButton id={address!} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          PACKAGE_ID
          <SuiObjectLinkButton id={SUITTER_PACKAGE_ID} />
        </span>
      </div>
      <div className="text-sm mb-4">
        <span className="flex items-center">
          RECENT_POSTS
          <SuiObjectLinkButton id={SUITTER_RECENT_POSTS_OBJECT_ID} />
        </span>
      </div>
      <button
        onClick={getPosts}
      >
        get posts
      </button>
    </div>
  )
  
  /**
   * 中央列用のコンポーネント
   * @returns 
   */
  const CenterPart = () => (
    <div className="w-1/2 p-4 border-slate-600 border-x-[0.5px] flex flex-col h-screen">
      <div className="font-bold text-lg mb-4 text-white">Timeline</div>
      <div className="overflow-auto flex-grow gap-1">
        {
          recentPostList.map((post) => (
            <>
              <PostCard key={post.id} post={post} />
              {/* <hr className="bg-slate-900 h-[0.5px]" /> */}
            </>
          ))
        }
      </div>
      <div className="mt-auto">
        <ChatInput />
      </div>
    </div>
  )

  /**
   * 右列用のコンポーネント
   * @returns 
   */
  const RightPart = () => (
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
  );

  useEffect(() => {
    getPosts();
  },[])

  return (
    <main className="flex min-h-screen bg-slate-900">
      <LeftPart />
      <CenterPart />
      <RightPart />
    </main >
  )
}

export default Page;

import { TransactionBlock } from '@mysten/sui.js';
import {
  useWallet
} from '@suiet/wallet-kit';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { SuiObjectLinkButton } from 'src/components/SuiObjectLinkButton';
import { moveCallLikePost } from 'src/suitterLib/moveCall';
import { SuitterPost } from 'src/suitterLib/types';
import { shortenAddress } from 'src/utils/web3';

export const PostCard = (props: {
  post: SuitterPost,
}) => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const exctuteLikePost = async () => {
    const txb = new TransactionBlock();
    moveCallLikePost({ txb, postId: props.post.id })
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    console.log({ result })
    const url = `https://suiexplorer.com/txblock/${result.digest}?network=testnet`
    console.log(url)
  }

  const Header = () => (
    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
      {shortenAddress(props.post.author)}
    </div>

  )


  const Body = () => (
    <p className="mt-2 text-gray-500">{props.post.text}</p>

  )


  const Footer = () => (
    <div className="flex items-center gap-2">
      <button className="text-blue-500 hover:text-blue-700">
        <span className="flex items-center gap-1">
          <AiOutlineRetweet />
          Retweet
        </span>
      </button>
      <button className="text-red-500 hover:text-red-700"
        onClick={async () => {
          console.log(props.post)
          await exctuteLikePost()
        }}
      >
        <span className="flex items-center gap-1">
          <AiOutlineHeart />
          Like
        </span>
      </button>
      <SuiObjectLinkButton id={props.post.id} />
    </div>

  )


  return (
    <div className="w-[100%] border-slate-600 border-y-[0.5px] shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          {/* <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://umi.ag" alt="User avatar" /> */}
          {/* <img width={60} className="m-10 object-cover" src={avatarUrl} alt="User avatar" /> */}
        </div>

        <div className="p-8">
          <Header />
          <Body />
          <Footer />
        </div>
      </div>
    </div>
  )
}

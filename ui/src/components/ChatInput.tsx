
import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { useState } from 'react';
import { moveCallCreatePost } from 'src/suitterLib/moveCall';

/**
 * ChatInput コンポーネント
 * @returns 
 */
const ChatInput = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  /**
   * exctuteCreatePost メソッドを呼び出してPostを追加する。
   */
  const exctuteCreatePost = async () => {
    const txb = new TransactionBlock();
    // moveCallCreatePostメソッドを呼び出す
    moveCallCreatePost({ 
      txb, 
      text: message 
    });
    
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    console.log({ result })
    const url = `https://suiexplorer.com/txblock/${result.digest}?network=testnet`
    console.log(url)
  }

  const [message, setMessage] = useState("");

  const handleInputChange = (event: any) => {
    setMessage(event.target.value);
  };

  
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-md">
      <input
        className="w-full px-4 py-2 text-white bg-gray-900 rounded-md focus:outline-none"
        placeholder="Please enter messege..."
        value={message}
        onChange={handleInputChange}
      />
      <button
        className="ml-4 text-white bg-blue-500 rounded-md px-4 py-2"
        onClick={async (event: any) => {
          event.preventDefault();
          // exctuteCreatePost メソッドの呼び出し
          await exctuteCreatePost();
          setMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;


import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { useState } from 'react';
import { moveCallCreatePost } from 'src/suitterLib/moveCall';

const ChatInput = () => {
  const { signAndExecuteTransactionBlock } = useWallet();

  const exctuteCreatePost = async () => {
    const txb = new TransactionBlock();
    moveCallCreatePost({ txb, text: message })
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    console.log({ result })
    const url = `https://suiexplorer.com/txblock/${result.digest}?network=testnet`
    console.log(url)
  }

  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await exctuteCreatePost();
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-md">
      <input
        className="w-full px-4 py-2 text-white bg-gray-900 rounded-md focus:outline-none"
        placeholder="メッセージを入力..."
        value={message}
        onChange={handleInputChange}
      />
      <button
        className="ml-4 text-white bg-blue-500 rounded-md px-4 py-2"
        onClick={async () => {
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

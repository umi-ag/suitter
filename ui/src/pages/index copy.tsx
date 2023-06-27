import { useWallet } from "@suiet/wallet-kit";
import { JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { SUI_PACKAGE, SUI_MODULE } from "../config/constants";
import { Signer } from "../components/Signer";
import { NftList } from "../components/NftList";
import { TransacitonLink } from "../utils/links";

export default function Home() {

  const [message, setMessage] = useState('');
  const [transaction, setTransaction] = useState('');
  const [nfts, setNfts] = useState<Array<{ id: string, name: string, url: string, description: string }>>([]);
  const [formInput, updateFormInput] = useState<{
    name: string;
    url: string;
    description: string;
  }>({
    name: "",
    url: "",
    description: "",
  });

  const provider = new JsonRpcProvider();
  const { account, connected, signAndExecuteTransactionBlock } = useWallet();

  async function mintExampleNFT() {
    setMessage("");
    const { name, url, description } = formInput;
    console.log(`${SUI_PACKAGE}::devnet_nft::mint`);
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: `${SUI_PACKAGE}::devnet_nft::mint` as any,
        arguments: [
          tx.pure(name),
          tx.pure(description),
          tx.pure(url),
        ]
      })

      const resData = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });

      updateFormInput({ name: "", url: "", description: "" })
      console.log('success', resData);
      setMessage('Mint succeeded');
      if (resData && resData.digest && resData.digest) {
        setTransaction(TransacitonLink(resData.digest, SUI_MODULE));
      }
    } catch (e) {
      console.error('failed', e);
      setMessage(`Mint failed ${e}`);
      setTransaction('');
    }
  }

  async function fetchExampleNFT() {
    const nftItemType = `${SUI_PACKAGE}::devnet_nft::DevNetNFT`;
    if (account != null) {
      const objects = await provider.getOwnedObjects({
        owner: account?.address, filter: {
          StructType: nftItemType
        }, options: {
          showType: true,
          showContent: true,
          showDisplay: true,
        }
      })
      if (objects.data.length > 0) {
        const nfts = objects.data.map((item: any) => {
          console.log(item);
          const { name, url, description } = item.data.content.fields as any;
          return {
            id: item.data.objectId,
            name,
            url,
            description
          }
        })
        setNfts(nfts)
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (connected) {
        fetchExampleNFT()
      }
    })()
  }, [connected, transaction])

  return (
    <div>
      <Signer />

      <div className="card lg:card-side bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="card-title">Mint Example NFT:</h2>
          <input
            placeholder="NFT Name"
            className="mt-4 p-4 input input-bordered input-primary w-full"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
          <input
            placeholder="NFT Description"
            className="mt-8 p-4 input input-bordered input-primary w-full"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            placeholder="NFT IMAGE URL"
            className="mt-8 p-4 input input-bordered input-primary w-full"
            onChange={(e) =>
              updateFormInput({ ...formInput, url: e.target.value })
            }
          />
          <p className="mt-4">{message}{message && <Link href={transaction}>, View transaction</Link>}</p>
          <div className="card-actions justify-end">
            <button
              onClick={mintExampleNFT}
              className="btn btn-primary btn-xl"
            >
              Mint example NFT
            </button>
          </div>
        </div>
      </div>

      <NftList nfts={nfts} />
    </div >
  );
}

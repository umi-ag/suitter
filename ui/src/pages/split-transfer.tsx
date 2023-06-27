import { useWallet } from "@suiet/wallet-kit";
import {  JsonRpcProvider, TransactionBlock, devnetConnection } from '@mysten/sui.js';
import { useEffect, useState } from "react";

const Test = ()=>{
    const { address,signAndExecuteTransactionBlock} = useWallet();
    const [toAddress,updateToAddress] = useState("xxxx");
    const [result,updateResult] = useState({});
    const provider = new JsonRpcProvider(devnetConnection);

    useEffect(()=>{
        if(address){
            updateToAddress(address);
            (async()=>{
                const coins = await provider.getOwnedObjects({
                    owner:address
                })
                console.log(coins);
            })();
        }
    },[address])
    
    const testHandle = async()=>{
        const tx = new TransactionBlock();
        const coins = tx.splitCoins(tx.gas,[tx.pure(10** 8 )]);
        tx.transferObjects([coins[0]], tx.pure(toAddress));
        const result = await  signAndExecuteTransactionBlock({
            transactionBlock:tx
        });
        updateResult(result);
    }

    return (
        <>
            <div>
                <p>{address}</p>
                <div className="mt-3 mb-3">
                    <input 
                        type="text" 
                        className="mt-4 p-4 input input-bordered input-primary w-fullinput-bordered w-full max-w-3xl" 
                        onChange={e=>updateToAddress(e.target.value)}  
                        value={toAddress} />
                    <button onClick={testHandle} className="btn btn-primary ml-3">Click for test!!!</button>
                </div>
                <pre>
                    {JSON.stringify(result)}
                </pre>
                
            </div>
        </>
    )
}

export default Test;
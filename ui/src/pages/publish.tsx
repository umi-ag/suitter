import { TransactionBlock } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { useState } from "react"

export default function Publish(){
    const [result,updateResult] = useState("");
    const [moduleBytes,updateModuleBytes] = useState("");
    const {signAndExecuteTransactionBlock,address} = useWallet();
    const publishModule = async ()=>{
        console.log("you will publish module ");
        try {
            // const compiledModules = JSON.parse(moduleBytes);      
            const { modules, dependencies } = JSON.parse(moduleBytes);      
            console.log(modules,dependencies);
            const tx = new TransactionBlock();
            // tx.setGasBudget(200000000);
            const updateCap = tx.publish({modules, dependencies})
            tx.transferObjects([updateCap[0]], tx.pure(address));
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: tx,    
            });
            console.log(result);
            updateResult(JSON.stringify(result,null,2));
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    
    return (
        <>
            <div className="card shadow-xl mt-3">
                <div className="card-body">
                    <div className="card-title"> publish your module : </div>
                    <p>dump command : sui move build --dump-bytecode-as-base64 --path . </p>
                    <textarea value={moduleBytes} onChange={e=>{
                        updateModuleBytes(e.target.value);
                    }} className="textarea textarea-bordered h-72" placeholder="module bytes json" />
                    <button onClick={publishModule} className="btn btn-info">Publish </button>
                    <pre>
                        {result}
                    </pre>
                </div>
            </div>
        </>
    )

}
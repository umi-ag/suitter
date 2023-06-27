import { useWallet } from "@suiet/wallet-kit";
import { JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import { useEffect, useState } from "react";
import { SUI_PACKAGE } from "../config/constants";
import { PackageLink, TransacitonLink } from "../utils/links";
import { SwordList } from "../components/SwordList";

export default function Contract() {
    const [swords, setSwords] = useState<Array<any>>([]);
    const [transaction, setTransaction] = useState('');
    const [displayModal, toggleDisplay] = useState(false);
    const [swordID, updateSwordId] = useState('')
    const [toRecipient, updateToRecipient] = useState("");
    const [formInput, updateFormInput] = useState<{
        magic: string;
        strength: string;
        recipient: string;
    }>({
        magic: "",
        strength: "",
        recipient: "",
    });
    const { connected, account, signAndExecuteTransactionBlock } = useWallet();

    async function transferSword(id: string) {
        console.log("transfer sword ", id);
        updateSwordId(id);
        toggleDisplay(true);
    }

    async function doTransfer() {
        try {
            const tx = new TransactionBlock();
            tx.moveCall({
                target: `${SUI_PACKAGE}::my_module::sword_transfer` as any,
                arguments: [
                    tx.pure(swordID),
                    tx.pure(toRecipient),
                ]
            })

            const resData = await signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            updateFormInput({ magic: "", strength: "", recipient: "" })
            console.log('success', resData);
            if (resData && resData.digest && resData.digest) {
                setTransaction(TransacitonLink(resData.digest, "my_module"));
            }
        } catch (e) {
            console.error('failed', e);
            setTransaction('');
        }
    }


    async function fetchSword() {
        if (account?.address == null) {
            return;
        }
        const swordType = `${SUI_PACKAGE}::my_module::Sword`;
        const objects = await provider.getOwnedObjects({
            owner: account?.address,
            filter: {
                StructType: swordType
            }, options: {
                showType: true,
                showContent: true,
                showDisplay: true,
            }
        })
        console.log(objects);
        const swords = objects.data.map(item => {
            console.log("old item : ", item);
            if (item.data && item.data.content) {
                console.log("old data content ", item.data.content);
                const content = item.data.content as any;
                const { magic, strength } = content.fields as any;
                return {
                    id: item.data?.objectId,
                    magic, strength
                }
            } else {
                return {
                    id: "",
                    magic: 0,
                    strength: 0
                }
            }
        })
        console.log("swords list : ", swords);
        setSwords(swords)
    }


    useEffect(() => {
        (async () => {
            if (connected) {
                fetchSword()
            }
        })()
    }, [connected, transaction])

    const provider = new JsonRpcProvider();
    const createSword = async () => {
        try {
            const tx = new TransactionBlock();
            const { magic, strength, recipient } = formInput;
            tx.moveCall({
                target: `${SUI_PACKAGE}::my_module::sword_create` as any,
                arguments: [
                    tx.pure(magic),
                    tx.pure(strength),
                    tx.pure(recipient)
                ]
            })

            const resData = await signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            updateFormInput({ magic: "", strength: "", recipient: "" })
            console.log('success', resData);
            if (resData && resData.digest && resData.digest) {
                setTransaction(TransacitonLink(resData.digest, "my_module"));
            }

        } catch (e) {
            console.error('failed', e);
            setTransaction('');
        }
    }

    return (
        <div>

            <div className={displayModal ? "modal modal-bottom sm:modal-middle modal-open" : "modal modal-bottom sm:modal-middle"}>
                <div className="modal-box">
                    <label onClick={() => { toggleDisplay(false) }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Input recent address</h3>
                    <input
                        placeholder="Recipient"
                        className="mt-8 p-4 input input-bordered input-primary w-full"
                        value={toRecipient}
                        onChange={(e) =>
                            updateToRecipient(e.target.value)
                        }
                    />
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn" onClick={() => {
                            toggleDisplay(!displayModal);
                            doTransfer();
                        }}>Done!</label>
                    </div>
                </div>
            </div>

            <div className="alert alert-info shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>
                        Sui Package Module: <a className="link link-primary" target="_blank" rel="noreferrer" href={PackageLink(SUI_PACKAGE)}>{SUI_PACKAGE}</a>
                    </span>
                </div>
            </div>

            <div className="card lg:card-side bg-base-100 shadow-xl mt-5">
                <div className="card-body">
                    <h2 className="card-title">create a sword</h2>
                    <input
                        placeholder="Magic value"
                        className="mt-8 p-4 input input-bordered input-primary w-full"
                        value={formInput.magic}
                        onChange={(e) =>
                            updateFormInput({ ...formInput, magic: e.target.value })
                        }
                    />
                    <input
                        placeholder="Strength value"
                        className="mt-8 p-4 input input-bordered input-primary w-full"
                        value={formInput.strength}
                        onChange={(e) =>
                            updateFormInput({ ...formInput, strength: e.target.value })
                        }
                    />
                    <input
                        placeholder="Recipient"
                        className="mt-8 p-4 input input-bordered input-primary w-full"
                        value={formInput.recipient}
                        onChange={(e) =>
                            updateFormInput({ ...formInput, recipient: e.target.value })
                        }
                    />
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={createSword}>Create Sword</button>
                        {transaction === "" ? "" : <a target="_blank" rel="noreferrer" className="btn btn-info" href={transaction}>{transaction}</a>}
                    </div>
                </div>
            </div>

            <SwordList swords={swords} transfer={transferSword} />

        </div >
    );
}

import { IntentScope, fromSerializedSignature, messageWithIntent, toB64 } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function uint8ToHex(uint8arr: Uint8Array) {
  if (!uint8arr) {
    return '';
  }
  let hexStr = '';
  for (let i = 0; i < uint8arr.length; i++) {
    let hex = (uint8arr[i] & 0xff).toString(16);
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr = `${hexStr}${hex}`;
  }
  return hexStr;
}

export function Signer() {
  const router = useRouter();
  const [data, updateSignData] = useState("");
  const [messageBytes, updateMessageBytes] = useState("");
  const [result, updateSignResult] = useState<any>({});
  useEffect(() => {
    (async () => {
      console.log("render once ...");
      if (typeof router.query.msg === 'string') {
        updateSignData(router.query.msg);
      }
    })();
  }, [router.query]);
  const { signMessage } = useWallet();
  const signContentAction = async () => {
    try {
      const result = await signMessage({
        message: new TextEncoder().encode(data)
      })
      if (!result) return
      const wrapperBytes = messageWithIntent(IntentScope.PersonalMessage, new TextEncoder().encode(data));
      console.log("wrapperBytes", toB64(wrapperBytes));
      updateMessageBytes(result.messageBytes);
      console.log(`signMessage success ${result}`)
      const signPair = fromSerializedSignature(result.signature);
      console.log(signPair);
      updateSignResult(signPair);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl mt-5">
      <div className="card-body">
        <h2 className="card-title">Sui Signer</h2>
        <input
          placeholder="message to sign"
          className="mt-8 p-4 input input-bordered input-primary w-full"
          value={data}
          onChange={(e) =>
            updateSignData(e.target.value)
          }
        />
        {
          messageBytes === "" || (
            <>
              <p>messageBytes: {messageBytes}</p>
              <b>signature: {uint8ToHex(result.signature)}</b>
              <b>signatureScheme: {result.signatureScheme}</b>
              <b>pubKey: {result.pubKey.toBase64()}</b>
            </>)
        }
        <div className="card-actions justify-end">
          <button
            onClick={signContentAction}
            className="btn btn-primary btn-xl"
          >
            Sign Content
          </button>
        </div>
      </div>
    </div>
  );
}

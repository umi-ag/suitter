import { ObjectId } from '@mysten/sui.js'
import Link from 'next/link'
import { BiLink } from 'react-icons/bi'
import { shortenAddress } from 'src/utils/web3'

/**
 * SuiObjectLinkButton Component
 * @param props 
 * @returns 
 */
export const SuiObjectLinkButton = (props: {
  id: ObjectId
}) => {
  return (
    <Link 
      href={`https://suiexplorer.com/object/${props.id}?network=testnet`} 
      target="_blank"
    >
      <button className="text-gray-500 hover:text-gray-700">
        <span className="flex items-center gap-1 text-md">
          <BiLink />
          {shortenAddress(props.id)}
        </span>
      </button>
    </Link>

  )
}

import { ObjectId, SuiAddress } from '@mysten/sui.js'

type U64 = string

/// Post型の定義
export type SuitterPost = {
  id: ObjectId,
  text: String,
  created_at: U64,
  author: SuiAddress,
  count_likes: U64,
  count_replies: U64,
}

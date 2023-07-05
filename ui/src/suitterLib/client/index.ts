import { ObjectId, getObjectFields, getObjectId } from "@mysten/sui.js";
import { SUITTER_RECENT_POSTS_OBJECT_ID } from "src/config/constants";
import { providerSuiTestnet } from "src/config/sui";

/**
 * 最新のPostオブジェクトのIDのリストを取得するメソッド
 * @returns 
 */
export const getRecentPostIdList = async (): Promise<ObjectId> => {
  const suiObject = await providerSuiTestnet().getObject({
    id: SUITTER_RECENT_POSTS_OBJECT_ID,
    options: {
      showContent: true,
      showType: true,
    },
  });
  // postsオブジェクトを配列で取得する。
  const { posts: postIdList }:any = getObjectFields(suiObject);
  return postIdList
};

/**
 * 最新の投稿を配列で取得するためのメソッド
 * @param postIdList PostオブジェクトのIDリスト
 * @returns 
 */
export const getRecentPostObjectList = async (
  postIdList: ObjectId[]
): Promise<any> => {
  // オブジェクトIDに紐づくPostオブジェクトを一括で取得するためのメソッド
  const suiObjectList = await providerSuiTestnet().multiGetObjects({
    ids: postIdList,
    options: {
      showContent: true,
      showType: true,
    },
  });
  
  return suiObjectList.map(obj => (  
    {
      id:  getObjectId(obj),
      text: getObjectFields(obj)?.text.toString(),
      created_at: getObjectFields(obj)?.created_at.toString(),
      author: getObjectFields(obj)?.author.toString(),
      count_likes: getObjectFields(obj)?.count_likes.toString(),
      count_replies: getObjectFields(obj)?.count_replies.toString(),
    }
  ));
};

export const creatPost = async (): Promise<ObjectId> => {
  const suiObject = await providerSuiTestnet().getObject({
    id: SUITTER_RECENT_POSTS_OBJECT_ID,
    options: {
      showContent: true,
      showType: true,
    },
  });
  const { posts: postIdList }:any = getObjectFields(suiObject);
  return postIdList
};

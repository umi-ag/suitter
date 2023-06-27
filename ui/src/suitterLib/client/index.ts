import { ObjectId, getObjectFields, getObjectId } from "@mysten/sui.js";
import { SUITTER_RECENT_POSTS_OBJECT_ID } from "src/config/constants";
import { providerSuiTestnet } from "src/config/sui";
import { SuitterPost } from '../types';

export const getRecentPostIdList = async (): Promise<ObjectId> => {
  const suiObject = await providerSuiTestnet().getObject({
    id: SUITTER_RECENT_POSTS_OBJECT_ID,
    options: {
      showContent: true,
      showType: true,
    },
  });
  const { posts: postIdList } = getObjectFields(suiObject);
  return postIdList
};

export const getRecentPostObjectList = async (postIdList: ObjectId[]): Promise<SuitterPost> => {
  const suiObjectList = await providerSuiTestnet().multiGetObjects({
    ids: postIdList,
    options: {
      showContent: true,
      showType: true,
    },
  });
  return suiObjectList.map(obj => ({
    ...getObjectFields(obj),
    id:  getObjectId(obj),
  }));
};

export const creatPost = async (): Promise<ObjectId> => {
  const suiObject = await providerSuiTestnet().getObject({
    id: SUITTER_RECENT_POSTS_OBJECT_ID,
    options: {
      showContent: true,
      showType: true,
    },
  });
  const { posts: postIdList } = getObjectFields(suiObject);
  return postIdList
};

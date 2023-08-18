import { ObjectId, SUI_CLOCK_OBJECT_ID, TransactionBlock } from '@mysten/sui.js';
import { SUITTER_PACKAGE_ID, SUITTER_RECENT_POSTS_OBJECT_ID } from 'src/config/constants';

/**
 * 投稿を追加するためのメソッド
 * @param props
 */
export const moveCallCreatePost = async (props: {
  txb: TransactionBlock,
  text: string,
}) => {
  const { txb } = props;
  // モジュール名と関数を指定
  const moduleName = "h_recent";
  const methodName = "create_post";

  /// create_postメソッドを呼び出し
  txb.moveCall({
    target: `${SUITTER_PACKAGE_ID}::${moduleName}::${methodName}`,
    arguments: [
      txb.pure(props.text),
      txb.pure(SUITTER_RECENT_POSTS_OBJECT_ID),
      txb.pure(SUI_CLOCK_OBJECT_ID),
    ],
  });
};

/**
 * いいねを追加するためのメソッド
 * @param props
 */
export const moveCallLikePost = async (props: {
  txb: TransactionBlock,
  postId: ObjectId,
}) => {
  const { txb } = props;
  // モジュール名と関数を指定
  const moduleName = "h_recent";
  const methodName = "like_post";
  /// like_postメソッドを呼び出し
  txb.moveCall({
    target: `${SUITTER_PACKAGE_ID}::${moduleName}::${methodName}`,
    arguments: [
      txb.pure(props.postId),
    ],
  });
};

/**
 * リツートするためのメソッド
 */
export const moveCallRetweetPost = async (props: {
  txb: TransactionBlock,
  postId: ObjectId,
}) => {
  const { txb } = props;
  // モジュール名と関数を指定
  const moduleName = "h_recent";
  const methodName = "like_post";

  /// like_postメソッドを呼び出し
  txb.moveCall({
    target: `${SUITTER_PACKAGE_ID}::${moduleName}::${methodName}`,
    arguments: [
      txb.pure(props.postId),
    ],
  });
};

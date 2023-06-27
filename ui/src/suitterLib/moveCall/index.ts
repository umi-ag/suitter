import { SUI_CLOCK_OBJECT_ID, TransactionBlock } from '@mysten/sui.js';
import { SUITTER_PACKAGE_ID, SUITTER_RECENT_POSTS_OBJECT_ID } from 'src/config/constants';

export const moveCallCreatePost = async (txb: TransactionBlock) => {
  txb.moveCall({
    target: `${SUITTER_PACKAGE_ID}::h_recent::create_post`,
    arguments: [
      txb.pure("Hello, World!"),
      txb.pure(SUITTER_RECENT_POSTS_OBJECT_ID),
      txb.pure(SUI_CLOCK_OBJECT_ID),
    ],
  });
};


import { NETWORK } from "../config/constants";

// ブロックチェーンエクスプローラーのリンク
const ExplorerBase = "https://explorer.sui.io";

// トランザクションまでのリンク
export function TransacitonLink(digest: string, module: string) {
    return `${ExplorerBase}/txblock/${digest}?module=${module}&network=${NETWORK}`
}

// オブジェクトまでのリンク
export function ObjectLink(objectId: string) {
    return `${ExplorerBase}/object/${objectId}?network=${NETWORK}`;
}

// パッケージまでのリンク
export function PackageLink(packageId: string) {
    return `${ExplorerBase}/object/${packageId}?network=${NETWORK}`;
}

export const SUI_PACKAGE = process.env.NEXT_PUBLIC_DAPP_PACKAGE!; // changed here.
export const SUI_MODULE = process.env.NEXT_PUBLIC_DAPP_MODULE!; // changed here.
export const NETWORK = process.env.NEXT_PUBLIC_SUI_NETWORK!;
export const MODULE_URL = `https://explorer.sui.io/object/${SUI_PACKAGE}?network=${NETWORK}`

// Suitter用のロジックを実装したパッケージIDを指定する。
export const SUITTER_PACKAGE_ID = '0xbfb79f6ec5f667aec95e33eb09fff4c3fcfbd9f8b8e8551c9a4e5dc8d83f5c7f'
// Suitter Posts用のオブジェクトIDを指定する。
export const SUITTER_RECENT_POSTS_OBJECT_ID = '0xf6ca726f1fb57ca9262746343d3fa6cffca4558c2e421c3291953a22eb2db655'

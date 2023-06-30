---
marp: true
theme: gaia
paginate: true
# header: "**Qiita** __Marp samples__"
# footer: "by fuyutarow＠gmail.com"
---

# Sui WorkShop

Presented by Umi Protocol & 3RD GEAR

- Fuyu
- Wasabi
- Imataka
- Yusei
- Johnny
- Issei

<!-- page_number: true -->

---

# アジェンダ

- Suiのモチベーション (10-15m)
- 環境構築
  - Sui CLI
- Suitter
  - ライブコーディング-
  - Suiの開発者体験

---

- dropなしから
- transfer なし

---

# 環境構築

- Install sui CLI
- vs-code plugins
- cargo install cargo-make

---

## Install sui CLI

```sh
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
cargo install suivm
suivm install latest
suivm use latest
```

## Sui バイナリ配布

- linux: https://github.com/MystenLabs/sui/releases
- mac:
  https://drive.google.com/drive/folders/1XDjHMryfxbFmaZWY2xt4yMm1sCf2J60w?usp=sharing

```sh
sui -V
```

---

# Sui モチベート

### チェーン選定

- 強力なコアチーム
  - github contributors
- 集まるビルダー
  - npm trends
- ユーザベース
  - ウォレット数
  - DEX Screener
- 技術的な面白さ
  - non-EVM, Fuelsドキュメント

---

## 負けないチェーン

- 高い生産性。
  - SuiMove言語
  - 静的型づけ
- 安い。速い。落ちない。
  - Finality < 5s
  - 太いTPS 297,000 TPS
- DAGベースのコンセンサスアルゴリズム

- https://star-history.com/#MystenLabs/sui&aptos-labs/aptos-core&solana-labs/solana&paritytech/polkadot&ethereum-optimism/optimism&sei-protocol/sei-chain&cosmos/cosmos-sdk&Date
- https://npmtrends.com/@mysten/sui.js-vs-avalanche

---

## オブジェクトとモジュール

- https://youtu.be/EG2-7bQNPv4?t=1105
- https://github.com/move-language/move/blob/8f5303a365cf9da7554f8f18c393b3d6eb4867f2/language/documentation/tutorial/README.md#step-3-designing-my-basiccoin-module

---

## Sui Client

1. ローカルのアカウント

```
$ sui client
Config file ["/Users/fuyutarow/.sui/sui_config/client.yaml"] doesn't exist, do you want to connect to a Sui Full node server [y/N]?y
Sui Full node server URL (Defaults to Sui Devnet if not specified) : https://fullnode.testnet.sui.io:443
Environment alias for [https://fullnode.testnet.sui.io:443] : testnet
Select key scheme to generate keypair (0 for ed25519, 1 for secp256k1, 2: for secp256r1): 0
```

- devnetは週1回リセット
- testnetはpermanent

2. ウォレットのアカウント

---

# Sui Dev Resource

- TS docs:
  http://typescript-sdk-docs.s3-website-us-east-1.amazonaws.com/modules.html

---

## VSCode

```json
{
  "recommendations": [
    // for sui
    "move.move-analyzer",
    "movebit.sui-move-analyzer",
    "damirka.move-syntax",
    "gptutor.gptutor",
    // utils
    "editorconfig.editorconfig",
    "bradlc.vscode-tailwindcss",
    "shardulm94.trailing-spaces"
  ]
}
```

---

## Sui Ecosystem

- ウォレット: Sui Wallet
  https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil?hl=j

---

# Suitter

- https://github.com/umi-ag/suitter
- https://suitter.pages.dev/

```sh
git clone https://github.com/umi-ag/suitter suitter
cd $_
```

---

## (A) Hello

- ブロックチェーン上にデータを書き込む
- 所有オブジェクト
- unit test
- パッケージ公開
- sui exploerer

- attributes: key, store, copy, drop

---

## Hello, World!

<!--
```sh
mkdir sui-kyoto && cd $_
sui move new hello-world
``` -->

```sh
git clone https://github.com/umi-ag/sui-kyoto-workshop suitter
cd $_
cd contracts/sandbox
sui client publish --gas-budget=123456789
```

---

## 所有オブジェクト

- オブジェクトオーナーだけが編集可能
  https://suiexplorer.com/object/0x824fb4bc1dd21c2030cdf8fc31773e32e3b83ae19bf687a7db437be5fdf46648?network=testnet

- オーナー以外は編集するとtxがコケる

---

# Sui Explorer

- https://suiexplorer.com/object/0x6ae18747510588558bb4fd36d136666198bbed88fc1452bad0853f80319706e6?network=testnet
- https://testnet.suivision.xyz/package/0x6ae18747510588558bb4fd36d136666198bbed88fc1452bad0853f80319706e6
- https://suiscan.xyz/testnet/object/0x6ae18747510588558bb4fd36d136666198bbed88fc1452bad0853f80319706e6

---

# (B) Shared

- 複数人で書き込みができるようにする

- 共有オブジェクト
- 可変参照
- transfer
  - `transfer::public_object`
  - `transfer::public_share_object`

---

## 所有オブジェクト vs 共有オブジェクト

- 所有されたオブジェクト（Owned Objects）: 特定の所有者だけが変更可能

- 共有オブジェクト（Shared Objects）: 複数のユーザーが変更可能。

---

# (C) Thread

- 複数の投稿を管理する

- オブジェクトラッピング
- vectorコレクション
- object attributes: key, store, drop

---

# (D) Clocked

- 投稿日時を記録するようにする

- Clock(object_id: 0x6)

---

## sandbox package

https://suiexplorer.com/object/0xafd13b5cb40a2c92df0e0e0a510c6bbc9d7a65c4ffc56908608b316478b91bf1?network=testnet

---

# (E) Likes

- 投稿にイイネをつけられるようにする

- Dynamic Field
- VecSetコレクション
  - ユニークな集合

---

## Dynamic Field

---

## コレクション

- vector
- VecSet
- VecMap
- Bag
- Table

---

# (G) DOF

- Dynamic Object Field

---

## DF vs DOF

`sui::dynamic_field` vs `sui::dynamic_object_field`

"Dynamic
Fields"：これはstore能力を持つ任意の値を格納できるフィールドで、この種類のフィールドに格納されたオブジェクトはラップされていると見なされます。これは、外部ツール（エクスプローラーやウォレットなど）がストレージにアクセスするときに、そのオブジェクトIDを介して直接アクセスすることができないという意味です。

"Dynamic Object
Fields"：このフィールドの値はSuiオブジェクト（keyとstoreの能力を持ち、最初のフィールドとしてid:
UIDを持つ）である必要があります。しかし、一度アタッチされると、そのオブジェクトIDを介して直接アクセス可能となります。これは、Dynamic
Object
Fieldsに格納されたオブジェクトがグローバルストレージのキーとして機能し、Sui
MoveのグローバルストレージがオブジェクトIDによってキー付けされるためです。

---

# 

- モジュール分割
- パッケージ分割
- パッケージ分割

---

## モジュールシステム

- fun
  - 同一モジュールだけから呼び出す可能
- public(friend) fun
  - 指定されたモジュールから呼び出し可能
- public fun
  - 全てのモジュールから呼び出し可能
- public entry fun
  - 全てのモジュールおよびオフチェーンから呼び出し可能

---

# Sui Future

- https://sui.io/intro-to-sui

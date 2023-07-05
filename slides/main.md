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

- Sui のモチベーション (10-15m)
- 環境構築
  - Sui CLI
- Suitter
  - ライブコーディング-
  - Sui の開発者体験

---

- drop なしから
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
  - non-EVM, Fuels ドキュメント

---

## 負けないチェーン

- 高い生産性。
  - SuiMove 言語
  - 静的型づけ
- 安い。速い。落ちない。
  - Finality < 5s
  - 太い TPS 297,000 TPS
- DAG ベースのコンセンサスアルゴリズム

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

- devnet は週 1 回リセット
- testnet は permanent

※ もしすでに devnet などで作ってしまった場合には下記コマンドで新しく環境を追加する。

```bash
sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443
```

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
sui client publish --gas-budget=123456789 --skip-dependency-verification
```

---

実際のデプロイ記録

```bash
----- Transaction Digest ----
3E1Eei2S2ANtFHhx6fz4s55BMFUCM2v9rKt4pbUW9d8h
----- Transaction Data ----
Transaction Signature: [Signature(Ed25519SuiSignature(Ed25519SuiSignature([0, 242, 227, 80, 48, 91, 9, 218, 57, 203, 24, 237, 226, 203, 59, 15, 112, 237, 78, 54, 27, 80, 1, 234, 52, 137, 182, 118, 207, 245, 58, 9, 23, 88, 165, 62, 155, 16, 136, 60, 58, 126, 212, 198, 251, 66, 164, 18, 5, 234, 151, 245, 60, 226, 210, 24, 95, 82, 145, 59, 129, 193, 21, 124, 3, 193, 241, 233, 40, 206, 55, 86, 12, 26, 209, 145, 197, 19, 23, 151, 165, 5, 145, 97, 120, 26, 137, 42, 66, 28, 36, 124, 199, 61, 252, 73, 154])))]
Transaction Kind : Programmable
Inputs: [Pure(SuiPureValue { value_type: Some(Address), value: "0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae" })]
Commands: [
  Publish(<modules>,0x0000000000000000000000000000000000000000000000000000000000000001,0x0000000000000000000000000000000000000000000000000000000000000002),
  TransferObjects([Result(0)],Input(0)),
]

Sender: 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae
Gas Payment: Object ID: 0x0386b88f5838ce5ca8b1e3b8df4515b2946faecc26a6c7b0d2f60abe8120802f, version: 0xaa09b, digest: 6Y4tcWjwxhttzYFcRiN15yKPbF7EgYnMCG5sUP3WPViW
Gas Owner: 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae
Gas Price: 1000
Gas Budget: 123456789

----- Transaction Effects ----
Status : Success
Created Objects:
  - ID: 0x0816017a56958532da412f543e781c143e3d64b7d1f580e88dfd6666eee035a5 , Owner: Account Address ( 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae )
  - ID: 0x898ce1bbf87d20b1a00d5022afb5fa8e7eaa479d02867619156d18580831233c , Owner: Account Address ( 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae )
  - ID: 0xa07b2e0beaba64c8fd53e81612a196c4df890bd29656f5441cde03fd683b99d7 , Owner: Shared
  - ID: 0xbb01a606dfdbf94397be445d98db96eb47538d40ed90ac666566a2f0e50ca86f , Owner: Immutable
  - ID: 0xd4e851893b698e4e3a0126052c40d0b336ec0da1c327eb3dc177b99261901cd5 , Owner: Immutable
Mutated Objects:
  - ID: 0x0386b88f5838ce5ca8b1e3b8df4515b2946faecc26a6c7b0d2f60abe8120802f , Owner: Account Address ( 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae )

----- Events ----
Array []
----- Object changes ----
Array [
    Object {
        "type": String("mutated"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "objectType": String("0x2::coin::Coin<0x2::sui::SUI>"),
        "objectId": String("0x0386b88f5838ce5ca8b1e3b8df4515b2946faecc26a6c7b0d2f60abe8120802f"),
        "version": String("696476"),
        "previousVersion": String("696475"),
        "digest": String("89JSXsTiEu6YWZgtN7QBHsAgd9k4t29Yj3yZNufALWuL"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "objectType": String("0x2::package::UpgradeCap"),
        "objectId": String("0x0816017a56958532da412f543e781c143e3d64b7d1f580e88dfd6666eee035a5"),
        "version": String("696476"),
        "digest": String("D1YdT9xdJAwUgHkjBR7KE1iYuZsCfvXFwx3BzU3wDYQH"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "objectType": String("0x2::coin::TreasuryCap<0xd4e851893b698e4e3a0126052c40d0b336ec0da1c327eb3dc177b99261901cd5::i_coin::I_COIN>"),
        "objectId": String("0x898ce1bbf87d20b1a00d5022afb5fa8e7eaa479d02867619156d18580831233c"),
        "version": String("696476"),
        "digest": String("5FdDTP4tACXt1XMgNpXFHn1ZZRRPShVCHd3MGSwd8o28"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "Shared": Object {
                "initial_shared_version": Number(696476),
            },
        },
        "objectType": String("0xd4e851893b698e4e3a0126052c40d0b336ec0da1c327eb3dc177b99261901cd5::h_recent::RecentPosts"),
        "objectId": String("0xa07b2e0beaba64c8fd53e81612a196c4df890bd29656f5441cde03fd683b99d7"),
        "version": String("696476"),
        "digest": String("3JJegojrK7HeehVQX3E5USHusLifYkJyaDeWSNpqqWhz"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": String("Immutable"),
        "objectType": String("0x2::coin::CoinMetadata<0xd4e851893b698e4e3a0126052c40d0b336ec0da1c327eb3dc177b99261901cd5::i_coin::I_COIN>"),
        "objectId": String("0xbb01a606dfdbf94397be445d98db96eb47538d40ed90ac666566a2f0e50ca86f"),
        "version": String("696476"),
        "digest": String("GPaPWwy8LQAFDG1YtQZkR1pdvCDwiYbA7SP1yUbMba8L"),
    },
    Object {
        "type": String("published"),
        "packageId": String("0xd4e851893b698e4e3a0126052c40d0b336ec0da1c327eb3dc177b99261901cd5"),
        "version": String("1"),
        "digest": String("2L3heMncHEXDKFQPvuccaHKDEQhm6BidsiV8LyRyTM6J"),
        "modules": Array [
            String("a_hello"),
            String("b_shared"),
            String("c_thread"),
            String("d_clocked"),
            String("e_likes"),
            String("f_reply"),
            String("g_dof"),
            String("h_recent"),
            String("i_coin"),
        ],
    },
]
----- Balance changes ----
Array [
    Object {
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "coinType": String("0x2::sui::SUI"),
        "amount": String("-77268280"),
    },
]
```

## 所有オブジェクト

- オブジェクトオーナーだけが編集可能
  https://suiexplorer.com/object/0x824fb4bc1dd21c2030cdf8fc31773e32e3b83ae19bf687a7db437be5fdf46648?network=testnet

- オーナー以外は編集すると tx がコケる

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
- vector コレクション
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
- VecSet コレクション
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
Fields"：これは store 能力を持つ任意の値を格納できるフィールドで、この種類のフィールドに格納されたオブジェクトはラップされていると見なされます。これは、外部ツール（エクスプローラーやウォレットなど）がストレージにアクセスするときに、そのオブジェクト ID を介して直接アクセスすることができないという意味です。

"Dynamic Object
Fields"：このフィールドの値は Sui オブジェクト（key と store の能力を持ち、最初のフィールドとして id:
UID を持つ）である必要があります。しかし、一度アタッチされると、そのオブジェクト ID を介して直接アクセス可能となります。これは、Dynamic
Object
Fields に格納されたオブジェクトがグローバルストレージのキーとして機能し、Sui
Move のグローバルストレージがオブジェクト ID によってキー付けされるためです。

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

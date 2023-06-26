---
marp: true
theme: gaia
# header: "**Qiita** __Marp samples__"
# footer: "by fuyutarow＠gmail.com"
---

# Sui WorkShop

Presented by Umi Protocol & 3RD GEAR

---

# Sui モチベート

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

# Sui について

好きなところ

- 高い生産性。
  - SuiMove言語
  - 静的型づけ
- 安い。速い。落ちない。
  - Finality < 5s
  - 太いTPS 297,000 TPS
- DAGベースのコンセンサスアルゴリズム

---

# 環境構築

## Install sui CLI

```sh
curl https://sh.rustup.rs -sSf | sh
cargo install suivm
suivm install latest
```

## VSCode

```json
{
  "recommendations": [
    "editorconfig.editorconfig",
    "move.move-analyzer",
    "bradlc.vscode-tailwindcss",
    "movebit.sui-move-analyzer",
    "damirka.move-syntax",
    "shardulm94.trailing-spaces",
    "gptutor.gptutor"
  ]
}
```

---

## Sui Ecosystem

- ウォレット
  https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil?hl=j

---

# (A) Hello

- ブロックチェーン上にデータを書き込む
- 所有オブジェクト
- unit test
- パッケージ公開
- sui exploerer

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

所有されたオブジェクト（Owned Objects）:
これらのオブジェクトは特定の所有者によってのみ変更できます。具体的には、所有者のアドレスによって所有されている場合、その所有者のアドレスによって署名されたトランザクションによってのみ使用できます。また、他のオブジェクトによって所有されている場合（子オブジェクトとも呼ばれます）、親オブジェクトの所有者が子オブジェクトにアクセスするトランザクションに署名する必要があります​1​。

共有オブジェクト（Shared Objects）:
これらのオブジェクトは所有者がいないため、複数のユーザーによって変更することができます。Suiのスマートコントラクトによって定義されたアクセス制御メカニズムに従って、誰でもオブジェクトと対話したり、アクセスしたりすることができます。これらのオブジェクトは、読み書きをシーケンスするためのコンセンサスが必要であり、実行中に自分自身のアクセス制御を実装することができます​1​。

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

## Dynamic Feild

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

# (H) モジュール分割

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

# Sandbox 用のコントラクトデプロイ記録

デプロイコマンド(Testnet)

```bash
 sui client publish --gas-budget 100000000 --skip-dependency-verification
```

SuiScan

[0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49](https://suiscan.com/object/0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49?module=h_recent&network=testnet)

実行結果

```bash
----- Transaction Digest ----
2VM6QijNnYH8jY2dMEVhnEBxS6BkiqvgdSR2WbTqEVMs
----- Transaction Data ----
Transaction Signature: [Signature(Ed25519SuiSignature(Ed25519SuiSignature([0, 253, 37, 5, 240, 146, 57, 196, 112, 220, 137, 206, 146, 147, 206, 64, 106, 121, 86, 8, 48, 9, 16, 4, 83, 194, 13, 0, 198, 190, 155, 184, 74, 51, 123, 62, 243, 189, 79, 58, 218, 161, 36, 235, 197, 20, 190, 69, 88, 67, 196, 21, 34, 233, 170, 222, 163, 181, 113, 126, 68, 26, 116, 99, 1, 193, 241, 233, 40, 206, 55, 86, 12, 26, 209, 145, 197, 19, 23, 151, 165, 5, 145, 97, 120, 26, 137, 42, 66, 28, 36, 124, 199, 61, 252, 73, 154])))]
Transaction Kind : Programmable
Inputs: [Pure(SuiPureValue { value_type: Some(Address), value: "0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae" })]
Commands: [
  Publish(<modules>,0x0000000000000000000000000000000000000000000000000000000000000001,0x0000000000000000000000000000000000000000000000000000000000000002),
  TransferObjects([Result(0)],Input(0)),
]

Sender: 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae
Gas Payment: Object ID: 0x0386b88f5838ce5ca8b1e3b8df4515b2946faecc26a6c7b0d2f60abe8120802f, version: 0xaa09f, digest: G6xgx7xzqsK6anUvmAHDEMsgnyRZLWJtuuF8732KuWf3
Gas Owner: 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae
Gas Price: 1000
Gas Budget: 100000000

----- Transaction Effects ----
Status : Success
Created Objects:
  - ID: 0x2b702ab2e8c228a488fbedef3b1da451d8e4e9aa4185857aff1930defc8c777f , Owner: Account Address ( 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae )
  - ID: 0x3f65f9515832a588ab19089f737827804b5bacd86a0fa23771009cce4b3965ef , Owner: Account Address ( 0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae )
  - ID: 0x83d1b6fc934271a4bbdea270ea413a4420de6ff68fcfb5ced6f00f054f612258 , Owner: Immutable
  - ID: 0xa03efb89b979c99cfb64c19d92073c78e641b2b6e08d8bc0f7b21e6892a5b3fa , Owner: Shared
  - ID: 0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49 , Owner: Immutable
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
        "version": String("696480"),
        "previousVersion": String("696479"),
        "digest": String("5iziNHPKXdiDgp7cbf2pBC4F91N3RRRjSLw3pzhxU42p"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "objectType": String("0x2::package::UpgradeCap"),
        "objectId": String("0x2b702ab2e8c228a488fbedef3b1da451d8e4e9aa4185857aff1930defc8c777f"),
        "version": String("696480"),
        "digest": String("CeZm3Jh5rnm5PsuHCLkYUQjrPH48p4xcSAVNatAcnuKu"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "AddressOwner": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        },
        "objectType": String("0x2::coin::TreasuryCap<0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49::i_coin::I_COIN>"),
        "objectId": String("0x3f65f9515832a588ab19089f737827804b5bacd86a0fa23771009cce4b3965ef"),
        "version": String("696480"),
        "digest": String("DBBGXL14qdJor7MiVM7HqDfueJ91KeWBn2D4kHNcQRu"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": String("Immutable"),
        "objectType": String("0x2::coin::CoinMetadata<0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49::i_coin::I_COIN>"),
        "objectId": String("0x83d1b6fc934271a4bbdea270ea413a4420de6ff68fcfb5ced6f00f054f612258"),
        "version": String("696480"),
        "digest": String("GBd5Y3TVcUsgEH5RdXRR9kdz4ueGEdLgP9w77ng36hDL"),
    },
    Object {
        "type": String("created"),
        "sender": String("0x919d2a35805b9bb01b71ff20a8c571ec628da6b055beec86cb54b07ba0f602ae"),
        "owner": Object {
            "Shared": Object {
                "initial_shared_version": Number(696480),
            },
        },
        "objectType": String("0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49::h_recent::RecentPosts"),
        "objectId": String("0xa03efb89b979c99cfb64c19d92073c78e641b2b6e08d8bc0f7b21e6892a5b3fa"),
        "version": String("696480"),
        "digest": String("ADqJbCNHhQ2EXPKHeEauXsF92VnXjPDPUxQpjeCw7L3M"),
    },
    Object {
        "type": String("published"),
        "packageId": String("0xe291e2f5f8cf01b0c9a1562e53464e72255d4fac670a5974e607290d906abd49"),
        "version": String("1"),
        "digest": String("HaidtDc3EvRD6jQhs9JQFBWX9dAjgkhHNcGnJ2dgheHg"),
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

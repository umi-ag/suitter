/// a_hello contract
module sandbox::a_hello {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// init method
    fun init(ctx: &mut TxContext) {

    }

    /// Memo Struct
    struct Memo has key, store {
        id: UID,
        text: String,
    }

    public entry fun new_memo(
        ctx: &mut TxContext,
    ) {
        let memo = Memo {
            id: object::new(ctx),
            text: string::utf8(b""),
        };
        let user_address = tx_context::sender(ctx);
        transfer::public_transfer(memo, user_address);
    }

    public entry fun write_memo(
        memo: &mut Memo,
        text: vector<u8>,
        ctx: &mut TxContext,
    ) {
        memo.text = string::utf8(text);
    }

    public entry fun write2_memo(
        memo: Memo,
        text: vector<u8>,
        ctx: &mut TxContext,
    ) {
        memo.text = string::utf8(text);
        let user_address = tx_context::sender(ctx);
        transfer::public_transfer(memo, user_address);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

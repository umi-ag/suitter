module sandbox::hello {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::table::{Self, Table};
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::vec_set::{Self, VecSet};
    use sui::dynamic_field as df;

    fun init(ctx: &mut TxContext) {
    }

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

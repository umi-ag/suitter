/// c_thread Contract
module sandbox::c_thread {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    fun init(ctx: &mut TxContext) {
    }

    struct Memo has store, drop {
        text: String,
    }

    /// thread struct
    struct Thread has key, store {
        id: UID,
        memo_list: vector<Memo>,
    }

    /// create new thread
    public entry fun new_thread(
        ctx: &mut TxContext,
    ) {
        let memo = Thread {
            id: object::new(ctx),
            memo_list: vector::empty(),
        };
        transfer::public_share_object(memo);
    }

    public entry fun write_thread(
        thread: &mut Thread,
        text: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let memo = Memo {
            text: string::utf8(text),
        };
        vector::push_back(&mut thread.memo_list, memo);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

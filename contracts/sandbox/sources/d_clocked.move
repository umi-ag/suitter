module sandbox::d_clocked {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};

    fun init(ctx: &mut TxContext) {
    }

    struct Post has store, drop {
        text: String,
        created_at: u64,
        author: address,
    }

    struct Thread has key, store {
        id: UID,
        post_list: vector<Post>,
    }

    public entry fun new_thread(
        ctx: &mut TxContext,
    ) {
        let memo = Thread {
            id: object::new(ctx),
            post_list: vector::empty(),
        };
        transfer::public_share_object(memo);
    }

    public entry fun write_thread(
        thread: &mut Thread,
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let post = Post {
            text: string::utf8(text),
            created_at: clock::timestamp_ms(clock),
            author: tx_context::sender(ctx),
        };
        vector::push_back(&mut thread.post_list, post);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

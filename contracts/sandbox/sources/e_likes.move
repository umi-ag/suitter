module sandbox::e_likes {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::vec_set::{Self, VecSet};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;

    fun liked_key(): String {
        string::utf8(b"liked")
    }

    fun init(ctx: &mut TxContext) {
    }

    struct Post has key, store {
        id: UID,
        text: String,
        created_at: u64,
        author: address,
        count_likes: u64,
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
            id: object::new(ctx),
            text: string::utf8(text),
            created_at: clock::timestamp_ms(clock),
            author: tx_context::sender(ctx),
            count_likes: 0,
        };
        df::add(&mut post.id, liked_key(), vec_set::empty<address>());
        vector::push_back(&mut thread.post_list, post);
    }

    public entry fun like_post(
        post: &mut Post,
        ctx: &mut TxContext,
    ) {
        post.count_likes = post.count_likes + 1;
        let liked_set: &mut VecSet<address> = df::borrow_mut(&mut post.id, liked_key());
        let user_address = tx_context::sender(ctx);
        vec_set::insert(liked_set, user_address);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

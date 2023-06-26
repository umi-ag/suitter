module sandbox::f_reply {
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

    fun repled_key(): String {
        string::utf8(b"replyed")
    }

    fun init(ctx: &mut TxContext) {
    }

    struct Post has key, store {
        id: UID,
        text: String,
        created_at: u64,
        author: address,
        count_likes: u64,
        count_replies: u64,
    }

    fun new_post(
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Post {
        let post = Post {
            id: object::new(ctx),
            text: string::utf8(text),
            created_at: clock::timestamp_ms(clock),
            author: tx_context::sender(ctx),
            count_likes: 0,
            count_replies: 0,
        };
        df::add(&mut post.id, liked_key(), vec_set::empty<address>());
        df::add(&mut post.id, repled_key(), vector::empty<Post>());
        post
    }

    public entry fun create_post(
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        let post = new_post(text, clock, ctx);
        transfer::public_share_object(post);
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

    public entry fun reply_post(
        text: vector<u8>,
        clock: &Clock,
        post: &mut Post,
        ctx: &mut TxContext,
    ) {
        post.count_replies = post.count_replies + 1;
        let replied_set: &mut vector<ID> = df::borrow_mut(&mut post.id, repled_key());
        let user_address = tx_context::sender(ctx);
        let post = new_post(text, clock, ctx);
        let post_id = object::id(&post);
        transfer::public_share_object(post);
        vector::push_back(replied_set, post_id);
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

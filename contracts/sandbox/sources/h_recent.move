module sandbox::h_recent {
    use std::string::{Self, String};
    use std::vector::{Self};

    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui::vec_set::{Self, VecSet};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;

    const MAX_RECENT_POSTS: u64 = 20;

    fun liked_key(): String {
        string::utf8(b"liked")
    }

    fun repled_key(): String {
        string::utf8(b"replyed")
    }

    fun init(ctx: &mut TxContext) {
        create_recent_posts(ctx);
    }

    struct Post has key, store {
        id: UID,
        text: String,
        created_at: u64,
        author: address,
        count_likes: u64,
        count_replies: u64,
    }

    struct ReplyPool has key, store {
        id: UID,
    }

    struct RecentPosts has key, store {
        id: UID,
        posts: vector<ID>,
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
        dof::add(&mut post.id, repled_key(), ReplyPool { id: object::new(ctx) });
        post
    }

    public entry fun create_post(
        text: vector<u8>,
        recent_posts: &mut RecentPosts,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        /// create post object
        let post = new_post(text, clock, ctx);
        update_recent_posts(recent_posts, object::id(&post));
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
        your_post: &mut Post,
        text: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext,
    ) {
        your_post.count_replies = your_post.count_replies + 1;
        let reply_pool: &mut ReplyPool = dof::borrow_mut(&mut your_post.id, repled_key());
        /// create new Post
        let my_post = new_post(text, clock, ctx);
        let my_post_id = object::id(&my_post);
        /// add post
        dof::add(&mut reply_pool.id, my_post_id, my_post);
    }

    fun create_recent_posts(
        ctx: &mut TxContext,
    ) {
        let recent_posts = RecentPosts {
            id: object::new(ctx),
            posts: vector::empty(),
        };
        transfer::public_share_object(recent_posts);
    }

    fun update_recent_posts(
        recent_posts: &mut RecentPosts,
        post_id: ID,
    ) {
        // TODO: Use Deque
        vector::push_back(&mut recent_posts.posts, post_id);
        if (vector::length(&recent_posts.posts) > MAX_RECENT_POSTS) {
            vector::remove<ID>(&mut recent_posts.posts, 0);
        };
    }

    #[test]
    fun test_plus() {
        assert!(1 + 1 == 2, 1001);
    }
}

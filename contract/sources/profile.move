module suitter::profile {
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
        // let profile_table = table::new<ID, ID>(ctx);
        // transfer::public_share_object(profile_table);
    }

    struct Profile has key, store {
        id: UID,
        biography: String,
        followers_count: u64,
        followings_count: u64,
        created_at: u64,
    }

    struct ProfileOwnerCap has key, store { id: UID, profile: ID }

    fun followings_key(): String {
        string::utf8(b"followings")
    }

    fun followers_key(): String {
        string::utf8(b"followers")
    }

    fun posts_key(): String {
        string::utf8(b"posts")
    }

    public fun new(
        clock: &Clock,
        ctx: &mut TxContext,
    ): (Profile, ProfileOwnerCap)
    {
        let profile = Profile {
            id: object::new(ctx),
            biography: string::utf8(b""),
            followers_count: 0,
            followings_count: 0,
            created_at: clock::timestamp_ms(clock),
        };

        let profile_owner_cap = ProfileOwnerCap {
            id: object::new(ctx),
            profile: object::id(&profile)
        };

        df::add(&mut profile.id, followers_key(), vec_set::empty<ID>());
        df::add(&mut profile.id, followings_key(), vec_set::empty<ID>());
        df::add(&mut profile.id, posts_key(), vector::empty<ID>());

        (profile, profile_owner_cap)
    }

    public entry fun follow_you(
        my_profile: &mut Profile,
        your_profile: &mut Profile,
        // profile_owner_cap: &ProfileOwnerCap
    ) {
        // assert_profile_owner(profile, profile_owner_cap);

        let my_followings_list = df::borrow_mut(&mut my_profile.id, followings_key());
        vec_set::insert(my_followings_list, object::id(your_profile));

        let my_followers_list = df::borrow_mut(&mut your_profile.id, followers_key());
        vec_set::insert(my_followers_list, object::id(my_profile));

        my_profile.followings_count = my_profile.followings_count + 1;
        your_profile.followers_count = your_profile.followers_count + 1;
    }

    public fun unfollow_you(
        _my_profile: &mut Profile,
        _your_profile: &mut Profile,
        // _profile_owner_cap: &ProfileOwnerCap
    ) {
       // TODO: to be implemented
    }
}

module suitter::profile {
  use std::string::{Self, String};
  use sui::object::{Self, UID, ID};
  use sui::clock::{Self, Clock};
  use sui::tx_context::{Self, TxContext};
  use sui::transfer::{Self};

  const E_NOT_OWNER:u64 = 0;

  struct Profile has key, store {
    id: UID,
    name: String,
    description: String,
    website: String,
    image_url: String,
    cover_url: String,
    followers_count: u64,
    followings_count: u64,
    created_at: u64
  }

  struct ProfileOwnerCap has key, store {
    id: UID,
    profile: ID
  }

  public fun new(
    clock: &Clock,
    ctx: &mut TxContext
  ): (Profile, ProfileOwnerCap) {
    let profile = Profile {
      id: object::new(ctx),
      name: string::utf8(b""),
      description: string::utf8(b""),
      website: string::utf8(b""),
      image_url: string::utf8(b""),
      cover_url: string::utf8(b""),
      followers_count: 0,
      followings_count: 0,
      created_at: clock::timestamp_ms(clock),
    };

    let owner_cap = ProfileOwnerCap {
      id: object::new(ctx),
      profile: object::id(&profile)
    };

    (profile, owner_cap)
  }

  public fun update(
    profile_owner_cap: &ProfileOwnerCap,
    profile: &mut Profile,
    name: String,
    description: String,
    website: String,
    image_url: String,
    cover_url: String,
  ) {
    assert!(object::id(profile) == profile_owner_cap.profile, E_NOT_OWNER);

    profile.name = name;
    profile.description = description;
    profile.website = website;
    profile.image_url = image_url;
    profile.cover_url = cover_url;
  }

  public fun create(
    name: String,
    description: String,
    website: String,
    image_url: String,
    cover_url: String,
    clock: &Clock,
    ctx: &mut TxContext
  ) {
    let (profile, owner_cap) = new(clock, ctx);
    update(&owner_cap, &mut profile, name, description, website, image_url, cover_url);

    transfer::public_transfer(owner_cap, tx_context::sender(ctx));
    transfer::public_share_object(profile);
  }
}
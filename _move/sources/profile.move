module suitter::profile {
  use std::string::{String};
  use sui::object::{Self, UID, ID};
  use sui::clock::{Self, Clock};
  use sui::tx_context::{TxContext};

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
    name: String,
    description: String,
    website: String,
    image_url: String,
    cover_url: String,
    clock: &Clock,
    ctx: &mut TxContext
  ): (Profile, ProfileOwnerCap) {
    let profile = Profile {
      id: object::new(ctx),
      name: name,
      description: description,
      website: website,
      image_url: image_url,
      cover_url: cover_url,
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
}
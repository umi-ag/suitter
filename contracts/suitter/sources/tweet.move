
/// tweet Contract
module suitter::tweet {
    use sui::object::{Self, UID, ID};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Supply, Balance};
    use sui::transfer;
    use sui::math;
    use sui::tx_context::{Self, TxContext};
    use std::type_name;
    use std::ascii::{Self, String};
    use std::vector;
    use sui::event;
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;
    use sui::clock::{Self, Clock};

    fun init(ctx: &mut sui::tx_context::TxContext) {
    }

    fun post(

        ctx: &mut TxContext,
    ) {

    }
}

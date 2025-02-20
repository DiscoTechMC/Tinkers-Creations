// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded server scripts)')

ServerEvents.tags('item', event => {
    event.add('forge:rock_salt', 'spelunkery:rock_salt')
    event.add('forge:dusts/salt', 'spelunkery:salt')
    event.add('forge:dusts/salt', 'spelunkery:saltpeter')
})

ServerEvents.recipes(event => {
    function fluid(fluid, amount) {
        return { fluid: fluid, amount: amount }
    }

    function entity_melting(entities, output, damage) {
        event.custom({
            "type": "tconstruct:entity_melting",
            "entity": {
                "types": entities
            },
            "result": output,
            "damage": damage
        })
    }

    function compacting(inputs, output) {
        event.custom({
            type: 'create:compacting',
            ingredients: inputs,
            results: [
                output
            ]
        })
    }

    function crushing(input, outputs, time) {
        event.custom({
            type: 'create:crushing',
            ingredients: [input],
            results: outputs,
            processingTime: time
        })
    }

    function sanding(input, output) {
        event.custom({
            "type": "create_dd:sanding",
            "ingredients": [
                input
            ],
            "results": [
                output
            ]
        })
    }

    function severing(entities, output) {
        event.custom({
            "type": "tconstruct:severing",
            "entity": {
                "types": entities
            },
            "result": output
        })
    }

    event.shapeless(
        Item.of('minecraft:ender_pearl'), // arg 1: output
        [
            '#endermanoverhaul:ender_pearls'
        ]
    )

    compacting([
        Item.of('minecraft:flint'),
        Item.of('minecraft:flint'),
        Item.of('minecraft:flint'),
        Item.of('minecraft:quartz'),
        fluid('minecraft:lava', 100)
    ], Item.of('minecraft:tuff'))

    crushing(Item.of('minecraft:dripstone_block'), [ Item.of('minecraft:clay_ball'), { "chance": 0.12, "item": "create_ironworks:tin_nugget" } ], 250)
    crushing(Item.of('tconstruct:cobalt_ore'), [ { "item": "tconstruct:raw_cobalt" }, { "chance": 0.75, "item": "tconstruct:raw_cobalt" }, { "chance": 0.75, "item": "create:experience_nugget" }, { "chance": 0.125, "item": "minecraft:netherrack" } ], 250)

    sanding(Item.of('spelunkery:rough_cinnabar'), Item.of('spelunkery:cinnabar'))
    sanding(Item.of('spelunkery:rough_diamond'), Item.of('minecraft:diamond'))
    sanding(Item.of('spelunkery:rough_emerald'), Item.of('minecraft:emerald'))
    sanding(Item.of('spelunkery:rough_lazurite'), Item.of('minecraft:lapis_lazuli'))

    let creepers = [
        "creeperoverhaul:jungle_creeper",
        "creeperoverhaul:bamboo_creeper",
        "creeperoverhaul:desert_creeper",
        "creeperoverhaul:badlands_creeper",
        "creeperoverhaul:hills_creeper",
        "creeperoverhaul:savannah_creeper",
        "creeperoverhaul:mushroom_creeper",
        "creeperoverhaul:swamp_creeper",
        "creeperoverhaul:dripstone_creeper",
        "creeperoverhaul:cave_creeper",
        "creeperoverhaul:dark_oak_creeper",
        "creeperoverhaul:spruce_creeper",
        "creeperoverhaul:beach_creeper",
        "creeperoverhaul:snowy_creeper"
    ]

    let endermen = [
        "endermanoverhaul:crimson_forest_enderman",
        "endermanoverhaul:dark_oak_enderman",
        "endermanoverhaul:desert_enderman",
        "endermanoverhaul:end_enderman",
        "endermanoverhaul:end_islands_enderman",
        "endermanoverhaul:flower_fields_enderman",
        "endermanoverhaul:ice_spikes_enderman",
        "endermanoverhaul:mushroom_fields_enderman",
        "endermanoverhaul:nether_wastes_enderman",
        "endermanoverhaul:savanna_enderman",
        "endermanoverhaul:snowy_enderman",
        "endermanoverhaul:soulsand_valley_enderman",
        "endermanoverhaul:swamp_enderman",
        "endermanoverhaul:warped_forest_enderman",
        "endermanoverhaul:windswept_hills_enderman",
        "endermanoverhaul:badlands_enderman",
        "endermanoverhaul:cave_enderman",
        "endermanoverhaul:coral_enderman"
    ]

    entity_melting(endermen, fluid('tconstruct:molten_ender', 25), 2)
    entity_melting(['minecraft:silverfish'], fluid('tconstruct:molten_silver', 10), 2)

    severing(creepers, Item.of('minecraft:creeper_head'))
    severing(creepers, Item.of('minecraft:tnt'))
    severing(endermen, Item.of('tconstruct:enderman_head'))

    // Removal

    let compressed = [/.*_bag/, /.*_basket/, /.*_block/, /.*_crate/, /.*_sack/]
    event.remove({ input: /minecraft:.*/, output: compressed, mod: 'berry_good' })
    event.remove({ input: /minecraft:.*/, output: compressed, mod: 'cratedelight' })
    event.remove({ input: /minecraft:.*/, output: compressed, mod: 'farmersdelight' })
    event.remove({ input: /minecraft:.*/, output: compressed, mod: 'quark' })

})
# Rule-based filtering

Rule-based filtering allows you to setup rules for items you're interested in the shop.

Basic layout looks like this:

```
[
RULE-1,
RULE-2,
...
RULE-n
]
```

Multiple rules can be defined successively, with each item in a shop being compared against every rule separately and considered a match if it matches one or more of the rules.

Each `RULE` contains one or more filters, that each need to match for that specific rule to be considered a match:

```
{
FILTER-1,
FILTER-2,
...
FILTER-n
}
```

where each `FILTER` is some type of `"key": value` pair, explained further below.

Note: The format is called JSON and it can be quite strict with formatting. If you feel like your configuration should work but it doesn't, it's usually good idea to check with a tool like https://jsoneditoronline.org/ to make sure you're not missing comma or a quote from somewhere.

## Supported filters

### Array based

Array filters (`[]`) allow listing **one or more** matches. If the item matches _any_ of the array contents it's considered a match for that filter. If only one value is specified the brackets are optional: `"character": "psyker"` is evaluated the same way as `"character": ["psyker"]`

- `character`: character archetype(s) that has the item in their store
  - possible values: `veteran`, `psyker`, `ogryn`, `zealot`
  - example: `"character": ["psyker", "veteran"]`
- `item`: item name(s)
  - possible values: any part of item name
  - example: `"item": ["Mk V Infantry Autogun", "Recon Lasgun"]`
- `blessing`: blessing name(s)
  - possible values: any part of the blessings **name**
  - example: `"blessing": ["Deflect", "Brutal Momentum"]`
- `perk`: perk name(s)
  - possible values: any part of the perks **description**
  - example: `"perk": ["Sprint Efficiency", "Critical Hit Chance"]`

### Numeric

Numeric filters are just normal integers, only a single value can be defined at a time.

- `minStats`: minimum sum of all modifiers combined
  - example: `"minStats": 360`
- `minRating`: minimum total rating of the item
  - example: `"minRating": 500`
- `minBlessingRarity`: requirement for a blessing to be of specific rarity, if there are multiple blessings it's considered a match if any of the blessings has this rarity.
  - possible values: `1`, `2`, `3`, `4`
  - example: `"minBlessingRarity": 3`
- `minPerkRarity`: same as above, but for perks
  - possible values: `1`, `2`, `3`, `4`
  - example: `"minPerkRarity": 4`

### Strings

String filters allow defining only a single possible value.

- `shop`: require item to be in a specific shop
  - possible values: `credits`, `marks`
  - example: `"shop": "marks"`

## Default configuration

By default the configuration looks like this:

```json
[
  {
    "minStats": 360
  }
]
```

This is a configuration with single rule that has a single filter. This specific filter requires the item to have total sum of items modifier percentages to be 360 or more to be considered a match.

## Advanced examples

Lets consider the following example:

```json
[
  {
    "item": "Power Sword",
    "blessing": "Power Cycler"
  },
  {
    "item": "Kantrael MG XII Infantry Lasgun",
    "blessing": [
      "Infernus",
      "Ghost"
    ]
  }
  {
    "minStats": 360
  },
  {
    "minBlessingRarity": 3,
    "store": "credits"
  },
  {
    "character": "veteran",
    "item": ["(Reliquary)", "(Caged)", "(Casket)"],
    "blessing": "Endurance",
    "perk": "Block Efficiency",
    "minRating": 80
  }
]
```

This configuration contains five separate rules with various amounts of filters each. As mentioned before, each rule is matched separately, and as long as any of them matches an item it's considered a match.

The five rules in this configurations are the following:

### Example: Item with specific blessing

```json
{
  "item": "Power Sword",
  "blessing": "Power Cycler"
}
```

This would match any Power Sword with the blessing `Power Cycler`. Since there is only one item that has `Power Sword` in it's name there's no need to write the complete name of the item.

```json
{
  "item": "Kantrael MG XII Infantry Lasgun",
  "blessing": [
    "Infernus",
    "Ghost"
  ]
}
```

Similar to the first one, but here we're looking for specific variation of the Infantry Lasgun, and are required to write down more specific name. Variations that would also work are things like `Kantrael MG XII` or `XII Infantry Lasgun`. 

In addition we're looking for more than one possible blessing, so they're inside square brackets. Note that while the filter spans multiple lines, it's exactly same as `"blessing": ["Infernus","Ghost"]`.

### Example: any item with good enough combined stats

```json
{
  "minStats": 360
}
```

This rule will match any shop item that has sum of all stat modifiers combined 360 or larger. While it's here as its own rule, it can be combined with any other filters just like anything else.

### Example: any blessing with higher rarity

```json
{
  "minBlessingRarity": 3,
  "store": "credits"
}
```

This rule will match any item in the hourly shop that has blessing of rarity 3 or higher.

### Example: curios for specific character

```json
{
  "character": "veteran",
  "item": ["(Reliquary)", "(Caged)", "(Casket)"],
  "blessing": "Endurance",
  "perk": "Block Efficiency",
  "minRating": 80
}
```

First of all this rule only matches items that are available to your `veteran` character. While there isn't a specific filter to match Curios specifically, `"item": ["(Reliquary)", "(Caged)", "(Casket)"]` should do just that.

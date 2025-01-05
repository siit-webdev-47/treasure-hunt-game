# Treasure Hunt Game

## RULES OF THE GAMEpm

## THE GAME 🎮
Find the hidden treasure before you run out of energy and die! 🡪 WINNER 🏆

- You will use a map with 1 hidden treasure, some hidden bonuses, and some crappy bad surprises.
- Skillfully navigate through the map to find the treasure and…not die before you do so.

**Note:** Do we want to add a timer for extra game drama?

## THE PLAYER 🎮

- To begin, we create 1 AVATAR - 1 PLAYER.
  - TBD later if we want to create more avatars for users to choose from or even allow multiple players to race against each other.

### Energy Level:
- The player starts with a predefined energy level that resets when the game is reset (either by the user or when the game is over, whether won or lost).
  - Need to define how we calculate the energy level - should we use 0 as the MIN value and 100 as the MAX? Do we work with multiples of 10…or in another way?

### Navigation:
- The player has a predefined MAP to explore and find the TREASURE.
- Moves can be made by navigating to different tiles:
  - RIGHT
  - LEFT
  - UP
  - DOWN
- The START point is in the TOP LEFT CORNER.

### Play Buttons:
- The player will have 4 buttons to navigate the map:
  - RIGHT
  - LEFT
  - UP
  - DOWN

### Energy Consumption:
- The player can see upfront the ENERGY REQUIRED to move to a specific tile.

  **Examples:**
  - DOWN – uses 5 energy points
  - UP – uses 8 energy points
  - LEFT – uses 15 energy points
  - RIGHT – uses 1 energy point

- Every MOVE will:
  - Require the use of ENERGY (energy cost).
  - Potentially INCREASE ENERGY if the tile has an energy bonus.
  - Potentially DECREASE ENERGY if the player lands on a crappy tile.

  **Note:** How do we deduct energy from the existing energy pool?

## THE TREASURE MAP 🗺️
- The map has a predefined number of tiles and a SPECIAL TILE containing the TREASURE.
- All tiles will have:
  - COST OF ENERGY to navigate through (see examples from the Energy Consumption section above).
  - TRAVEL TRAIL showing where the player has navigated from, colored differently and showing any applied bonus or penalty.

### Tile Set-ups:
- **BONUS:** Increases ENERGY (e.g., by 1, 5, 10… x points).
  - **Note:** Should we create a bonus for extra points which can be converted into energy? Maybe some tiles can have (also) extra points besides energy.
- **PENALTIES:** Decreases ENERGY from the player's existing energy level.
  - **Note:** Should we add something to the list like sending the player back to start or deducting extra points if we implement a points system?
- **CHILL TILE:** No bonus, no penalty.
###
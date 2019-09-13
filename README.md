# Gridcannon

This project's goal is to recreate the solitaire game Gridcannon. The work on this project was inspired by the youtube video [How to play Gridcannon: a single player game with regular playing cards](https://www.youtube.com/watch?v=gqmUpQjFHrA) by [Tom Francis](https://www.youtube.com/channel/UCQ-twzO6v-PBgckhkrXVaDQ). Gridcannon is a single player card game with the goal of elimintating the royal cards with the use of a cannon made up of a grid of cards.

## How to Play

### The Deck
Start with a well shuffled deck of cards that contains the cards 2-9, K, Q, J, A in each of the four suits and two joker cards. In total there should be 54 cards in the deck: 13 Hearts, 13 Diamonds, 13 Clubs, 13 Spades, and two jokers.

### The Deal

Keeping the deck face down, deal cards face up in a three by three grid leaving the central tile empty. If any royal (J, Q, K) cards are dealt set those aside in a separate, face down pile. Stop dealing when the grid is complete.

#### The Royals

Once the grid is complete, retrive the set aside deck of royals and shuffle it, keeping it face down. Deal the first royal to outside of the grid. Royals must be placed next to the highest card of that suit or color. For example, a J of hearts would be placed next to a 5 of hearts. A K of spades would be placed next to a 3 of clubs if there are no spades. A Q of clubs would be placed next to a 7 of diamonds if there are no spades, clubs, or higher diamonds or hearts. When being placed on a corner, choose which side the card should be on. See the killing royals section to formulate strategy. Once a space is occupied by a royal, it cannot be removed or replaced.

In the end, the board should look like this:

|   |   |   |   |   |  
|---|---|---|---|---|
| X | R | R | R | X |
| R | C | C | C | R |
| R | C | F | C | R |
| R | C | C | C | R |
| X | R | R | R | X |

Where X is an unplayable tile, R is where a royal would be, C is where regular cards should be, and F is a free space.

### The Round

Once the grid is placed and all set aside royals are dealt, rounds can begin. A round begins by taking the top card from the remaining deck. There are three types of cards that can be drawn that have special rules: Royals, Cannon Fodder, or Resets.

### Royals

Drawing a royal during a round is handled just as it was during the deal. The royal is placed outside of the grid on a free space next to the card most similar to it in the grid. See "The Royals" section in "The Deal" for more details.

### Cannon Fodder

Most cards will be cannon fodder. Cards with a face value of 2-10 are cannon fodder and must be placed on the grid. A card can only be placed on a tile that has a value lower than it. For example, a 7 can be placed on a 6 but it cannot be placed on a 8. The suits are irrelevant to the placement of the cards.

If a card is drawn that cannot be placed on the grid, the player suffers a choice of penalty. The first choice is the card can become armor for a royal. The armor must first match the suit of the royal it is applying to. If a royal of matching suit is not available, the player can choose which royal to apply the armor. The second choice is to add the card to the shame pile. Place the card out of play in a separate deck. Choose a grid pile to reset by shuffling it and placing it at the bottom of your main deck. The grid tile is now a free space.

With the exception of the outside grid, placing a card will trigger a cannon to go off. The cannon will fire orthoginally from the placed card toward the royal on the edge. This is how royals are killed. See the "Killing Royals" section for details on how Royals are killed.

#### Killing Royals

Royals are killed by adding up the two cannon fodder cards closest to the royal on the same line. Royals are killed (turned face down) when they occupy a tile outside of the grid that was fired on by a cannon (see "Cannon Fodder") and the sum total of two cards closest to the Royal is greater than or equal to the value of the Royal plus any armor they have acquired. Jacks have 11 life and can be killed by cannon fodder of any suit. Queens have 12 life and can be killed by cannon fodder of the same color (e.g. a queen of spades can only be killed by clubs or spades). Kings have 13 life and can be killed by cannon fodder of the same suit.

### End of Game

The game is over when the player successfully kills all of the Royals. The player earns 11 points for each Jack, 12 points for each Queen, and 13 points for each King for a total of 144 points. The player loses a point each round of play where a Royal is not placed. The goal is to finish the game with as many points as possible. If the player ends with 0 or less points, he or she has lost.
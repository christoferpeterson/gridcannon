const script = document.currentScript;
const canvas = document.createElement("canvas");
const cardSprite = document.createElement("img");
var newImg = new Image;
newImg.onload = function() {
    cardSprite.src = this.src;
}
newImg.src = 'src/cards.gif';

const FPS = 30;
const NUMBER_OF_JOKERS = 2;
const GRID_SIZE = 3;
const CARD_HEIGHT = 58.5;
const CARD_WIDTH = 40.5;
const TILE_Y_OFFSET = CARD_HEIGHT + 2;
const TILE_X_OFFSET = CARD_WIDTH + 2;
const DEFAULT_BUTTON_PADDING = 30;

const Gridcannon = function(context) {
    this.context = context;
    this.context.canvas.height = 480;
    this.context.canvas.width = 860;
    this.assets = Gridcannon.BuildUI();
    this.frames = 1;
}

Gridcannon.prototype.run = function() {
    this.assets.push(this.gameboard = this.buildGameBoard());
    this.gameLoopId = setInterval(() => this.loop(), 1000 / FPS);
}

Gridcannon.prototype.loop = function() {
    this.process();
    this.update();
    this.draw(this.context);
}

Gridcannon.prototype.process = function() {
    
}

Gridcannon.prototype.update = function() {
    this.assets.forEach(asset => !!asset.update && asset.update());
}

Gridcannon.prototype.draw = function(ctx) {
    this.assets.forEach(asset => !!asset.draw && asset.draw(ctx));
}

Gridcannon.prototype.buildDeck = (numberOfJokers) => {
    const output = [];

    for (let i = 1; i < 53; i++) {
        var modulo = i%13;
        var suit = Math.ceil(i/13);
        var card;
        switch (modulo) {
            case 1: // aces
                card = new Card('A', modulo, suit);
                break;
            case 11: // jacks
                card = new Card('J', 11, suit);
                break;
            case 12: // queens
                card = new Card('Q', 12, suit);
                break;
            case 0: // kings
                card = new Card('K', 13, suit);
                break;
            default: // cannon fodder cards
                card = new Card(`${modulo}`, modulo, suit)
                break;
        }
        output.push(card);
    }

    // add the jokers
    for (let i = 0; i < numberOfJokers; i++) {
        output.push(new Card('0', 0, 0))        
    }

    return output;
}

Gridcannon.prototype.newGame = (seed) => {
    // TODO: how to seed?
    this.state = {};
    this.state.deck = this.buildDeck(NUMBER_OF_JOKERS);
    this.state.deck = this.shuffle(this.deck, seed);
    this.state.shameDeck = [];
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * TODO: how to seed?
 */
Gridcannon.prototype.shuffle = (a, seed) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

Gridcannon.prototype.buildGameBoard = () => {
    const tiles = [];

    if(GRID_SIZE % 1 !== 0) {
        throw 'The grid size must be an odd number.';
    }

    const totalGridSize = GRID_SIZE + 2;
    for (let i = 0; i < totalGridSize; i++) {
        tiles[i] = [];
        for(let j = 0; j < totalGridSize; j++) {
            const isBlocked = (i == 0 || i == totalGridSize - 1) && (j == 0 || j == totalGridSize - 1);
            const isRoyalsOnly = !isBlocked && ((i == 0 || i == totalGridSize - 1 ) || (j == 0 || j == totalGridSize - 1));
            const isTrigger = !isRoyalsOnly && !isBlocked && ((i == 1 || i == totalGridSize - 2) || (j == 1 || j == totalGridSize - 2));
            tiles[i][j] = new Tile(isBlocked, isRoyalsOnly, isTrigger);
        }
    }

    return new Gameboard(tiles);
}

Gridcannon.BuildUI = () => {
    const output = [];
    
    output.push(new Background());
    output.push(new Button("New Game", 25, 25, DEFAULT_BUTTON_PADDING, () => {}));

    return output;
}

const Gameboard = function(tiles) {
    this.tiles = tiles;
}

Gameboard.prototype.draw = function(ctx) {
    let y = (ctx.canvas.height / 2) - ((GRID_SIZE + 2) * TILE_Y_OFFSET / 2);
    let x = (ctx.canvas.width / 2) - ((GRID_SIZE + 2) * TILE_X_OFFSET / 2);

    for (let i = 0; i < this.tiles.length; i++) {
        const row = this.tiles[i];
        for (let j = 0; j < row.length; j++) {
            const tile = row[j];
            tile.y = y + (i * TILE_Y_OFFSET);
            tile.x = x + (j * TILE_X_OFFSET);
            tile.draw(ctx);
        }
    }
}

const Tile = function(blocked, royalsOnly, trigger) {
    this.isBlocked = blocked; // indicates that this tile cannot be used
    this.isRoyalsOnly = royalsOnly; // indicates this is a tile where royals must live
    this.isTrigger = trigger; // indicates this tile triggers cannons
    this.cards = [];
}

Tile.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, CARD_WIDTH + 2, CARD_HEIGHT + 2);
}

const Card = function(type, strength, suit) {
    this.type = type;
    this.strength = strength;
    this.suit = suit;
}

Card.prototype.draw = function(ctx) {

}

const Background = function() {

}

Background.prototype.draw = function(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const Button = function(text, x, y, padding, onClick) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.onClick = onClick;
    this.padding = padding;
}

Button.prototype.update = function() {

}

Button.prototype.draw = function(ctx) {
    ctx.font = '20px Kremlin Pro Web';
    ctx.textAlign="center";
    ctx.textBaseline = "middle";
    const measure = ctx.measureText(this.text);
    this.height = 20 + this.padding;
    this.width = measure.width + this.padding;
    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillStyle = 'rgba(225,225,225,0.5)';
    ctx.fillRect(this.x, this.y, this.width, this.height); 
    ctx.fillStyle = `rgba(255,255,255,1)`;
    ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
}

script.before(canvas);
const gridcannon = new Gridcannon(canvas.getContext("2d"));
gridcannon.run();
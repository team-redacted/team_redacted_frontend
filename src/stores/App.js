import { makeAutoObservable } from 'mobx';

export default class App {

  turn = 0;
  order = [];
  players = {};
  solution = [];

  locations = {
    // top rooms
    room1:  { type: 'room', align: 'none', adj: ["hall1", "hall3"]},
    hall1:  { type: 'hall', align: 'horizontal', adj: ["room1", "room2"]},
    room2:  { type: 'room', align: 'none', adj: ["hall1", "hall2", "hall4"]},
    hall2:  { type: 'hall', align: 'horizontal', adj: ["room2", "room3"]},
    room3:  { type: 'room', align: 'none', adj: ["hall2", "hall5"]},

    // top to middle hallways
    hall3:  { type: 'hall', align: 'vertical', adj: ["room1", "room4"]},
    space1: { type: '', align: '', adj: []},
    hall4:  { type: 'hall', align: 'vertical', adj: ["room2", "room5"]},
    space2: { type: '', align: '', adj: []},
    hall5:  { type: 'hall', align: 'vertical', adj: ["room3", "room6"]},
    room4:  { type: 'room', align: 'none', adj: ["hall3", "hall6", "hall8"]},

    // middle rooms
    hall6:  { type: 'hall', align: 'horizontal', adj: ["room4", "room5"]},
    room5:  { type: 'room', align: 'none', adj: ["hall4", "hall6", "hall7", "hall9"]},
    hall7:  { type: 'hall', align: 'horizontal', adj: ["room5", "room6"]},
    room6:  { type: 'room', align: 'none', adj: ["hall5", "hall7", "hall10"]},
    hall8:  { type: 'hall', align: 'vertical', adj: ["room4", "room7"]},

    // midle to bottom hallways
    space3: { type: '', align: '', adj: []},
    hall9:  { type: 'hall', align: 'vertical', adj: ["room5", "room8"]},
    space4: { type: '', align: '', adj: []},
    hall10: { type: 'hall', align: 'vertical', adj: ["room6", "room9"]},

    // bottom rooms
    room7:  { type: 'room', align: 'none', adj: ["hall8", "hall11"]},
    hall11: { type: 'hall', align: 'horizontal', adj: ["room7", "room8"]},
    room8:  { type: 'room', align: 'none', adj: ["hall9", "hall11", "hall12"]},
    hall12: { type: 'hall', align: 'horizontal', adj: ["room8", "room9"]},
    room9:  { type: 'room', align: 'none', adj: ["hall10", "hall12"]},
  }

  cards =  {
    // people
    card1:  { type: 'person', name: 'peacock'},
    card2:  { type: 'person', name: 'scarlett'},
    card3:  { type: 'person', name: 'orchid'},
    card4:  { type: 'person', name: 'green'},
    card5:  { type: 'person', name: 'plum'},
    card6:  { type: 'person', name: 'mustard'},

    // weapons
    card7:  { type: 'weapon', name: 'revolver'},
    card8:  { type: 'weapon', name: 'dagger'},
    card9:  { type: 'weapon', name: 'lead pipe'},
    card10: { type: 'weapon', name: 'rope'},
    card11: { type: 'weapon', name: 'candlestick'},
    card12: { type: 'weapon', name: 'wrench'},

    // rooms
    card13: { type: 'room',   name: 'ballroom'},
    card14: { type: 'room',   name: 'billiard room'},
    card15: { type: 'room',   name: 'conservatory'},
    card16: { type: 'room',   name: 'dining room'},
    card17: { type: 'room',   name: 'hall'},
    card18: { type: 'room',   name: 'kitchen'},
    card19: { type: 'room',   name: 'library'},
    card20: { type: 'room',   name: 'lounge'},
    card21: { type: 'room',   name: 'study'},
  }
  
  constructor() {
    makeAutoObservable(this, { autoBind: true });

    this.order = ["player1", "player2"];
    this.players = {
      player1: {
          loc: 'room1',
          color: 'red',
          cards: ['card2', 'card8', 'card14']
      },
      player2: {
          loc: 'room2',
          color: 'blue',
          cards: ['card3', 'card9', 'card15']
      },
    }
    this.solution = ['card1', 'card7', 'card13']
  }

  updateTurn() {
    let turn = this.turn;
    turn += 1;
    turn = turn % this.order.length;
    this.turn = turn;
  }

  setLocation(loc) {
    if (this.isAdjacent(loc)) {
        let players = this.players;
        let id = this.order[this.turn];
        let player = this.getCurrentPlayer();
        player.loc = loc;
        players[id] = player;
        this.players = players;
        this.updateTurn();
    }
  }

  getCurrentPlayer() {
    let playerId = this.order[this.turn];
    return this.players[playerId];
  }

  getCards() {
    let player = this.getCurrentPlayer();
    let cards = [];
    for (let card of player.cards) {
      cards.push(this.cards[card]);
    }
    return cards;
  }

  getPlayersAt(loc) {
      let players = [];
      for (const[player, value] of Object.entries(this.players)) {
          if (value.loc === loc) {
              players.push(value);
          }
      }
      return players;
  }

  isAdjacent(loc) {
      let player = this.getCurrentPlayer();
      let curr = this.locations[player.loc];
      return curr.adj.includes(loc);
  }

  startSuggestion() {
    console.log("Begin Suggestion Mode");
  }

  startAccusation() {
    console.log("Begin Accusation Mode");
  }
}

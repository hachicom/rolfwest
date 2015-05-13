var Hachiplayer = Class.create({
  initialize: function(level) {    
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.level = level;
    this.controlx = 0;
    this.padtouched = false;
  },

  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.level = 1;
  }
});
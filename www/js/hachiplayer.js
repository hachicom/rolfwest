var Hachiplayer = Class.create({
  initialize: function(level) {    
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.level = level;
  },

  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.level = 1;
  }
});
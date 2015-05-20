var Hachiplayer = Class.create({
  initialize: function(level,levellimit) {    
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.level = level;
    this.levellimit = levellimit;
    this.world = Math.ceil((level/levellimit));
    this.round = level%levellimit;
    if (this.world<1) this.world = 1;
    this.controlx = 0;
    this.padtouched = false;
  },

  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.coins = 0;
    this.world = 1;
    this.round = 1;
    this.level = 1;
  },
  
  levelUp: function(incVal) {
    this.level += incVal;
    this.world = Math.ceil((level/levellimit));
    this.round = level%levellimit;
  }
});
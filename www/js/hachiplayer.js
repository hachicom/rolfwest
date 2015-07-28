var Hachiplayer = Class.create({
  initialize: function(level,levellimit,scoreRewards,hiscore,maxstage) {    
    this.lives = 3;
    this.health = 3;
    this.score = 0;
    this.coins = 0;
    this.scoreRewards = scoreRewards;
    this.scoreTarget = 0;
    this.hiscore = hiscore;
    this.maxstage = maxstage;
    this.multiplier = 1;
    
    this.level = level;
    this.levellimit = levellimit;
    this.world = Math.ceil((level/levellimit));
    this.round = level%levellimit;
    if (this.round<=0) {
      //this.world += 1;
      this.round = levellimit;
    }
    this.controlx = 0;
    this.padtouched = false;
  },

  reset: function() {
    this.lives = 3;
    this.health = 3;
    this.score = 0;
    this.coins = 0;
    this.world = 1;
    this.round = 1;
    this.level = 1;
    this.multiplier = 1;
  },
  
  levelUp: function(incVal) {
    this.level += incVal;
    this.world = Math.ceil((this.level/this.levellimit));
    this.round = this.level%this.levellimit;
    if (this.round<=0) {
      //this.world += 1;
      this.round = this.levellimit;
    }
    if (this.level >= this.maxstage) this.maxstage = this.level;
  },

  addScore: function (value,multi) {
    if (multi) this.score = this.score + (value * this.multiplier);
    else this.score = this.score + value;
    if (this.scoreTarget<this.scoreRewards.length){
      if (this.score >= this.scoreRewards[this.scoreTarget]){
        this.lives+=1;
        this.scoreTarget+=1;
      }
    }
    // if (this.score >= 99999) {
      // this.score = 99999;
      // this.winGame = 2;
    // }
    if (this.score >= this.hiscore) this.hiscore = this.score;
  },
});

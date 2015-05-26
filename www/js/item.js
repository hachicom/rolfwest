// Item Class
var Item = Class.create(Sprite, {
  initialize: function(x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears){
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image = game.assets['res/itemSheet.png'];
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moveSpeed = movespeed;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.xAccel = xAccel;
    this.yAccel = yAccel;
    this.timeToDestroy = 150;
    this.disappears = disappears;
    
    // Animate
    this.frame = 0;
    this.iniFrame = iniframe;
    this.endFrame = endframe;
    this.animationDuration = 0;
    this.animationSpeed = animationSpeed;
    this.idleTime=0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(){
    var game;
    game = Game.instance;
    
    if (!this.parentNode.parentNode.paused){//todo item deve pertencer ao grupo correspondente (Item Group)
      if (this.disappears){
        this.timeToDestroy -= 1;
        if (this.timeToDestroy <= 0) this.remove();
      }
      
      /*START MOVEMENT BLOCK*/
      this.x += this.moveSpeed * Math.cos(this.direction);
      this.y += this.moveSpeed * Math.sin(this.direction);
    
      if(this.y > game.height || this.x > game.width || this.x < -this.width || this.y < -this.height){
        this.remove();
      }
      this.ySpeed += this.yAccel;
      //if (this.ySpeed <= 10) this.ySpeed = 10;
      this.xSpeed += this.xAccel;
      this.y += this.ySpeed;
      this.x += this.xSpeed;
      
      if(this.y >= 360){
        this.y = 360;
        this.xSpeed = 0;
      }
      /*END MOVEMENT BLOCK*/
      
      /*START ANIMATION BLOCK*/
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      /*END ANIMATION BLOCK*/
    }
  },
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  }
});

//***************** CHILD ITEMS *****************

// HatItem class
var HatItem = Class.create(Item, {
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 1, 0, 0, 0, true);
    this.frame = 0;
    this.itemId = 'hat';
  },
  
  gotHit: function(playerObj,hero) {
    hero.incHealth(playerObj);
    playerObj.score+=1000;
    this.remove();
  }
});

// CoinItem class
var CoinItem = Class.create(Item, {
  initialize: function(x, y, playerSprite, level, author){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 1, 1, 4, 0.25, true);
    this.frame = 1;
    this.itemId = 'coin';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=50;
    this.remove();
  }
});

// GoldCupItem class
var GoldCupItem = Class.create(Item, {
  initialize: function(x, y, playerSprite, level, author){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 1, 6, 6, 0, true);
    this.frame = 6;
    this.itemId = 'cup';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=100;
    this.remove();
  }
});

// GoldBarsItem class
var GoldBarsItem = Class.create(Item, {
  initialize: function(x, y, playerSprite, level, author){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 1, 7, 7, 0, true);
    this.frame = 7;
    this.itemId = 'bars';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=500;
    this.remove();
  }
});

// DiamondItem class
var DiamondItem = Class.create(Item, {
  initialize: function(x, y, playerSprite, level, author){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 1, 8, 9, 0.1, true);
    this.frame = 8;
    this.itemId = 'diamond';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=1000;
    this.remove();
  }
});

var SandubaItem = Class.create(Item, {
  initialize: function(x, y, playerSprite, level, author){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 1, -10, 0, 1, 5, 5, 0, false);
    this.frame = 5;
    this.itemId = 'sanduba';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=500;
    this.parentNode.parentNode.endLevel = true;
    this.remove();
  }
});

// Item Class
var Item = Class.create(Sprite, {
  initialize: function(x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed){
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image = game.assets['res/itemSheet.png'];
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.moveSpeed = movespeed;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.xAccel = xAccel;
    this.yAccel = yAccel;
    
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
      /*START MOVEMENT BLOCK*/
      this.x += this.moveSpeed * Math.cos(this.direction);
      this.y += this.moveSpeed * Math.sin(this.direction);
    
      if(this.y > game.height || this.x > game.width || this.x < -this.width || this.y < -this.height){
        this.remove();
      }
      this.ySpeed += this.yAccel;
      this.xSpeed += this.xAccel;
      this.y += this.ySpeed;
      this.x += this.xSpeed;
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

// HatItem class
var HatItem = Class.create(Item, {
  // Succeeds bullet class
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed
    Item.call(this, x, y, 0, 0, 2, -20, 0, 2, 0, 0, 0);
    this.frame = 0;
    this.itemId = 'hat';
  },
  
  update: function(){
    Item.prototype.update.call(this);
    if (!this.parentNode.parentNode.paused){
      if(this.y >= 360){
        this.y = 360;
        this.xSpeed = 0;
      }
    }
  },
  
  gotHit: function(playerObj,hero) {
    hero.incHealth(playerObj);
    this.parentNode.removeChild(this);
    delete this;
  }
});

// CoinItem class
var CoinItem = Class.create(Item, {
  // Succeeds bullet class
  initialize: function(x, y, playerSprite, level, author){
    Item.call(this, x, y, 0, 0, 0, 3, 0, 0, 0, 0, 0.25);
    this.frame = 0;
    this.itemId = 'coin';
  },
  
  update: function(){
    Item.prototype.update.call(this);
    if (!this.parentNode.parentNode.paused){
      if(this.y >= 360){
        this.y = 360;
      }
    }
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.score+=100;
    this.parentNode.removeChild(this);
    delete this;
  }
});
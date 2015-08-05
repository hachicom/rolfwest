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
    this.timeToDestroy = 5; //secs
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
  
  update: function(evt){
    var game;
    game = Game.instance;
    
    if (!this.parentNode.parentNode.paused){//todo item deve pertencer ao grupo correspondente (Item Group)
      if (this.disappears){
        this.timeToDestroy -= evt.elapsed * 0.001;
        if (this.timeToDestroy <= 0) this.remove();
      }
      
      /*START MOVEMENT BLOCK*/
      this.x += this.moveSpeed * Math.cos(this.direction) * evt.elapsed * 0.001;
      this.y += this.moveSpeed * Math.sin(this.direction) * evt.elapsed * 0.001;
    
      if(this.y > game.height || this.x > game.width || this.x < -this.width){
        this.remove();
      }
      this.ySpeed += this.yAccel * evt.elapsed * 0.001;
      //if (this.ySpeed <= 10) this.ySpeed = 10;
      this.xSpeed += this.xAccel * evt.elapsed * 0.001;
      this.y += this.ySpeed;
      this.x += this.xSpeed;
      
      if(this.y >= 424){
        this.y = 424;
        this.xSpeed = 0;
      }
      /*END MOVEMENT BLOCK*/
      
      /*START ANIMATION BLOCK*/
      this.animationDuration += evt.elapsed * 0.001;    
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
    Item.call(this, x, y, 0, 0, 0, -10, 0, 40, 0, 0, 0, true);
    this.frame = 0;
    this.itemId = 'hat';
  },
  
  gotHit: function(playerObj,hero) {
    hero.incHealth(playerObj);
    playerObj.addScore(1000,false);
    this.parentNode.parentNode.showReward(this.x,this.y,1000);
    this.parentNode.parentNode.playSound("powerup");
    this.remove();
  }
});

// CoinItem class
var CoinItem = Class.create(Item, {
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 40, 1, 4, 0.05, true);
    this.frame = 1;
    this.itemId = 'coin';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.addScore(50,false);
    this.parentNode.parentNode.showReward(this.x,this.y,50);
    this.parentNode.parentNode.playSound("coin");
    this.remove();
  }
});

// GoldCupItem class
var GoldCupItem = Class.create(Item, {
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 40, 6, 6, 0, true);
    this.frame = 6;
    this.itemId = 'cup';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.addScore(100,false);
    this.parentNode.parentNode.showReward(this.x,this.y,100);
    this.parentNode.parentNode.playSound("coin");
    this.remove();
  }
});

// GoldBarsItem class
var GoldBarsItem = Class.create(Item, {
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 40, 7, 7, 0, true);
    this.frame = 7;
    this.itemId = 'bars';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.addScore(250,false);
    this.parentNode.parentNode.showReward(this.x,this.y,250);
    this.parentNode.parentNode.playSound("item");
    this.remove();
  }
});

// DiamondItem class
var DiamondItem = Class.create(Item, {
  initialize: function(x, y){
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 0, -10, 0, 40, 8, 9, 0.05, true);
    this.frame = 8;
    this.itemId = 'diamond';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.addScore(500,false);
    this.parentNode.parentNode.showReward(this.x,this.y,500);
    this.parentNode.parentNode.playSound("item");
    this.remove();
  }
});

var SandubaItem = Class.create(Item, {
  initialize: function(x, y, level){
    frame = 5;
    if(level == 23) frame = 16;
    //x, y, direction, movespeed, xSpeed, ySpeed, xAccel, yAccel, iniframe, endframe, animationSpeed, disappears
    Item.call(this, x, y, 0, 0, 1, -4, 0, 5, frame, frame, 0, false);
    this.frame = frame;
    this.itemId = 'sanduba';
  },
  
  gotHit: function(playerObj,hero) {
    playerObj.addScore(this.parentNode.parentNode.bonusReward,false);
    for (var i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
      var item;
      item = this.parentNode.childNodes[i];
      if (item.itemId!='sanduba'){
        item.gotHit(playerObj,hero); //collect all itens
      }
    }
    this.parentNode.parentNode.playSound("powerup");
    this.parentNode.parentNode.endLevel = true;
    this.remove();
  }
});

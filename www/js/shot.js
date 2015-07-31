// Shot
var Shot = Class.create(Sprite, {
  initialize: function(x, y, direction, size){
    // Call superclass constructor
    var bulletfile = 'res/bulletSheet.png'; 
    var spritesize = 5;
    var spriteheight = 8;
    switch(size){
      case 1: bulletfile = 'res/bulletSheet.png'; spritesize = 5; spriteheight = 8; break;
      case 2: bulletfile = 'res/bulletDoubleSheet.png'; spritesize = 15; spriteheight = 8; break;
      case 3: bulletfile = 'res/bulletBossSheet.png'; spritesize = 24; spriteheight = 24; break;
      default: bulletfile = 'res/bulletSheet.png'; spritesize = 5; spriteheight = 8; break;
    }
    Sprite.apply(this,[spritesize, spriteheight]);
    this.image = game.assets[bulletfile];
    this.x = x;
    this.y = y;
    this.direction = direction;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(){
    var game;
    game = Game.instance;
    
    if (!this.parentNode.parentNode.paused){//todo tiro deve pertencer ao grupo correspondente (Player ou Enemy Shot Group)
      this.x += this.moveSpeed * Math.cos(this.direction);
      this.y += this.moveSpeed * Math.sin(this.direction);
    
      if(this.y > game.height || this.x > game.width || this.x < -this.width || this.y < -this.height){
        this.remove();
      }
    }
  },
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  }
});

// PlayerShot class
var PlayerShot = Class.create(Shot, {
  // Succeeds bullet class
  initialize: function(x, y, size){
    this.angle = Math.atan2(-1, 0); //shooting up (Y-0,X-0)
    Shot.call(this, x, y, this.angle, size);
    this.frame = [0,0,4];
    this.moveSpeed = 16;
  }
});

// EnemyShot class
var EnemyShot = Class.create(Shot, {
  // Succeeds bullet class
  initialize: function(x, y, playerSprite, level, author, shootdown){
    var playerRadius = playerSprite.width/2;
    if(!shootdown)this.angle = findAngle(x,y,playerSprite.x+playerRadius,playerSprite.y+playerRadius); //shooting towards player
    else this.angle = Math.atan2(1, 0); //shooting up
    switch(author){
      case 'bat': frame = [1,1,4]; moveSpeed = 3 + level/2; this.size = 1; break;
      case 'batkid': frame = [2,2,4]; moveSpeed = 4 + level/2; this.size = 1; break;
      case 'batsniper': frame = [3,3,4]; moveSpeed = 5 + level/2; this.size = 1; break;
      case 'boss1': frame = [1,2,3,4]; moveSpeed = 6 + level/2; this.size = 2; break;
      case 'boss2': frame = 1; moveSpeed = 8 + level/2; this.size = 3; break;
      case 'boss3': frame = 2; moveSpeed = 10 + level/2; this.size = 3; break;
      case 'boss3-2': frame = [0,3,3,4]; moveSpeed = 12 + level/2; this.size = 2; break;
      case 'boss4': frame = [0,0,4]; moveSpeed = 14; this.size = 2; break;
      default: frame = 1; moveSpeed = 4 + level; this.size = 1; break;
    }
    Shot.call(this, x, y, this.angle, this.size);
    this.scaleY = -1;
    this.frame = frame; this.moveSpeed = moveSpeed;
    this.typeId = 'bullet';
    this.bulletId = author;
  }
});

// Explosion Object
var Explosion = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,hurt) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/explosionSheet.png'];      
    this.x = x;
    this.y = y;
    this.hurt = hurt;
    this.typeId = 'explosion';
    //if(hurt) this.scale(4,4);
    
    // Animate
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 6;
    this.animationDuration = 0;
    this.animationSpeed = 0.15;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var paused = false;
    if(this.hurt) {
      paused = this.parentNode.parentNode.paused; //está no grupo de tiro pra machucar o jogador      
    } else {
      paused = this.parentNode.paused;      
    }  //explosão normal
    if (!paused){
      this.animationDuration += 0.05;
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.remove();
        this.animationDuration -= this.animationSpeed;
      }
    }
  },
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  }
});
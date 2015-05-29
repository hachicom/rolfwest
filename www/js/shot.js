// Shot
var Shot = Class.create(Sprite, {
  initialize: function(x, y, direction, size){
    // Call superclass constructor
    var bulletfile = 'res/bulletSheet.png'; 
    var spritesize = 5;
    switch(size){
      case 1: bulletfile = 'res/bulletSheet.png'; spritesize = 5; break;
      case 2: bulletfile = 'res/bulletDoubleSheet.png'; spritesize = 15; break;
      case 3: bulletfile = 'res/bulletBossSheet.png'; spritesize = 24; break;
      default: bulletfile = 'res/bulletSheet.png'; spritesize = 5; break;
    }
    Sprite.apply(this,[spritesize, 8]);
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
    this.angle = Math.atan2(-1, 0); //shooting up (Ytarget-Ystart,Xtarget-Xstart)
    Shot.call(this, x, y, this.angle, size);
    this.frame = 0;
    this.moveSpeed = 16;
  }
});

// EnemyShot class
var EnemyShot = Class.create(Shot, {
  // Succeeds bullet class
  initialize: function(x, y, playerSprite, level, author){
    var playerRadius = playerSprite.width/2;
    this.angle = findAngle(x,y,playerSprite.x+playerRadius,playerSprite.y+playerRadius); //shooting towards player
    switch(author){
      case 'bat': frame = 1; moveSpeed = 3 + level; this.size = 1; break;
      case 'batkid': frame = 2; moveSpeed = 4 + level; this.size = 1; break;
      case 'batsniper': frame = 3; moveSpeed = 5 + level; this.size = 1; break;
      case 'boss1': frame = 0; moveSpeed = 6 + level; this.size = 3; break;
      case 'boss2': frame = 1; moveSpeed = 7 + level; this.size = 3; break;
      case 'boss3': frame = 2; moveSpeed = 8 + level; this.size = 3; break;
      case 'boss4': frame = 0; moveSpeed = 16; this.size = 2; break;
      default: frame = 1; moveSpeed = 4 + level; this.size = 1; break;
    }
    Shot.call(this, x, y, this.angle, this.size);
    this.scaleY = -1;
    this.frame = frame; this.moveSpeed = moveSpeed;
  }
});

// Axe shot (machadinha)
/* var Axe = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,vx) {
    // Call superclass constructor
    Sprite.apply(this,[16, 16]);
    this.image  = Game.instance.assets['res/IceFrag.png'];      
    this.rotationSpeed = Math.random() * 100 - 50;
    this.ySpeed = -10;
    this.yAccel = 1;
    this.x = x;
    this.y = y;
    this.xSpeed = vx;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    if (!this.parentNode.paused){
      var game;
     
      game = Game.instance;
      
      this.ySpeed += this.yAccel;
      this.y += this.ySpeed;
      this.x += this.xSpeed;
      this.rotation += this.rotationSpeed * evt.elapsed * 0.001;           
      if (this.y > game.height || this.x < 0 || this.x > game.width) {
        this.parentNode.removeChild(this);        
      }
    }
  }
}); */
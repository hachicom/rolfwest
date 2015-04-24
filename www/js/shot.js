// Shot
var Shot = Class.create(Sprite, {
  initialize: function(x, y, direction){
    // Call superclass constructor
    Sprite.apply(this,[5, 8]);
    this.image = game.assets['res/bulletSheet.png'];
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
  initialize: function(x, y){
    this.angle = Math.atan2(-1, 0); //shooting up (Ytarget-Ystart,Xtarget-Xstart)
    Shot.call(this, x, y, this.angle);
    this.frame = 0;
    this.moveSpeed = 10;
  }
});

// EnemyShot class
var EnemyShot = Class.create(Shot, {
  // Succeeds bullet class
  initialize: function(x, y, playerSprite, level){
    this.angle = findAngle(playerSprite.x,x,playerSprite.y,y); //shooting towards player
    Shot.call(this, x, y, this.angle);
    this.frame = 1;
    this.scaleY = -1;
    this.moveSpeed = 10 + (level*2);
  }
});
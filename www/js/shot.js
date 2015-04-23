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
    
    this.x += this.moveSpeed * Math.cos(this.direction);
    this.y += this.moveSpeed * Math.sin(this.direction);
    
    if(this.y > game.height || this.x > game.width || this.x < -this.width || this.y < -this.height){
      this.remove();
    }
  }
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  }
});

// PlayerShoot class
var PlayerShoot = Class.create(Shot, { 
  // Succeeds bullet class
  initialize: function(x, y){
    this.angle = Math.atan2(1, 0); //shooting up
    Shot.call(this, x, y, this.angle);
    this.frame = 0;
    this.moveSpeed = 10;
  }
});

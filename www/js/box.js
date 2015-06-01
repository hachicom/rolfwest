// Box Sprite
var BoxSprite = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/boxSheet.png'];
    this.x = x;
    this.y = y;

    // 2 - Status
    this.hp = 3;
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    var i,game;
    var arrSpeed = [1,3,-3,-1];
    var arrHeight = [0,16,16,0];
    var arrFrag = [];
    
    this.hp-=1;
    for(i=0;i<4;i++){
      arrFrag[i] = new BoxPiece(this.x+(this.width/2),this.y+this.height+arrHeight[i],arrSpeed[i]);
      this.parentNode.parentNode.addChild(arrFrag[i]);
    }
    if(this.hp<=0){
      this.parentNode.removeChild(this);
      delete this;
    }
    return true;
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    
    if (!this.parentNode.parentNode.paused){      
      /*START ANIMATION BLOCK*/
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      /*END ANIMATION BLOCK*/
    }
  }
});

var BoxPiece = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,vx) {
    // Call superclass constructor
    Sprite.apply(this,[16, 16]);
    this.image  = Game.instance.assets['res/boxPiece.png'];      
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
});

//Box Generator
var BoxGenerator = Class.create(Sprite, {
  // The windows that will create the batkids
  initialize: function(x,y,lvlBoxMap,boxGroup) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/doorgen.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    //this.boxes = [];
    
    for(var i=0; i<lvlBoxMap.length; i++){
      var box = new BoxSprite(lvlBoxMap[i][0],lvlBoxMap[i][1]);
      boxGroup.addChild(box);
    }
  }
});

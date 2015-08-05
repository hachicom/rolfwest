// Box Sprite
var BoxSprite = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,frame,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/boxSheet.png'];
    this.x = x;
    this.y = y;
    
    // 0=normal (2hits); 1=iron (6hits); 2=tnt (3hits); 3=powerup (4hits)
    this.frame = frame;
    this.mode = frame;
    switch(frame){
      case 0: this.hp = 2; break;
      case 1: this.hp = 6; break;
      case 2: this.hp = 3; break;
      case 3: this.hp = 4; break;
      default: this.hp = 1; break;
    }
    
    if(difficulty=='hard') {
      if(this.y < 384){
        // this.hp = this.hp + 2;
        if(this.frame == 0) {
          this.frame = 1;
          this.hp = 6;
        }
      }else{
        this.hp = 1;
        // if(this.frame == 0) {
          // this.frame = 2;
          // this.mode = 2;
        // }
      }
    }
    
    // Animate
    this.animationDuration = 0;
    this.vulnerableBlinkTime  = 0.033; //secs
    this.vulnerableNormalTime = 0.133; //secs
    this.animationSpeed = 0.133;
    this.idleTime=0;
    this.iniFrame = this.frame;
    this.endFrame = 4;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj,addScore) {
    var i,game;
    var arrSpeed = [1,3,-3,-1];
    var arrHeight = [0,16,16,0];
    var arrFrag = [];
    
    this.hp-=1;
    if(addScore==true) playerObj.addScore(10,false);
    if(this.hp<=1){ this.frame = this.endFrame; }
    for(i=0;i<4;i++){
      arrFrag[i] = new BoxPiece(this.x+(this.width/2),this.y+this.height+arrHeight[i],arrSpeed[i]);
      this.parentNode.parentNode.addChild(arrFrag[i]);
    }
    if(this.hp<=0){
      if(this.mode == 2){
        var s1 = new Explosion(this.x-20,this.y-20,true);
        var s2 = new Explosion(this.x+4, this.y-20,true);
        var s3 = new Explosion(this.x+28,this.y-20,true);
        var s4 = new Explosion(this.x-20,this.y+4, true);
        var s5 = new Explosion(this.x+4, this.y+4, true);
        var s6 = new Explosion(this.x+28,this.y+4, true);
        var s7 = new Explosion(this.x-20,this.y+28,true);
        var s8 = new Explosion(this.x+4, this.y+28,true);
        var s9 = new Explosion(this.x+28,this.y+28,true);
        var s10 = new Explosion(this.x+4, this.y-44,true);
        var s11 = new Explosion(this.x-44,this.y+4, true);
        var s12 = new Explosion(this.x+52,this.y+4, true);
        var s13 = new Explosion(this.x+4, this.y+52,true);
        this.parentNode.parentNode.explosionGroup.addChild(s1);
        this.parentNode.parentNode.explosionGroup.addChild(s2);
        this.parentNode.parentNode.explosionGroup.addChild(s3);
        this.parentNode.parentNode.explosionGroup.addChild(s4);
        this.parentNode.parentNode.explosionGroup.addChild(s5);
        this.parentNode.parentNode.explosionGroup.addChild(s6);
        this.parentNode.parentNode.explosionGroup.addChild(s7);
        this.parentNode.parentNode.explosionGroup.addChild(s8);
        this.parentNode.parentNode.explosionGroup.addChild(s9);
        this.parentNode.parentNode.explosionGroup.addChild(s10);
        this.parentNode.parentNode.explosionGroup.addChild(s11);
        this.parentNode.parentNode.explosionGroup.addChild(s12);
        this.parentNode.parentNode.explosionGroup.addChild(s13);
        this.parentNode.parentNode.playSound("explode");
      }
      if(this.mode == 3){
        var hat = new HatItem(this.x,this.y);
        this.parentNode.parentNode.itemGroup.addChild(hat);
      }
        this.parentNode.parentNode.playSound("crash");
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
      // this.animationDuration += 0.05;    
      // if (this.animationDuration >= this.animationSpeed) {
        // if(this.frame<this.endFrame) this.frame ++;
        // else this.frame = this.iniFrame;
        // this.animationDuration -= this.animationSpeed;
      // }
      if(this.hp<=1){
        this.animationDuration+=evt.elapsed * 0.001;
        if(this.animationDuration>=this.animationSpeed){
          this.animationDuration -= this.animationSpeed;
          if(this.frame!=this.endFrame){
            this.frame=this.endFrame;
            this.animationSpeed = this.vulnerableBlinkTime;
          }else {
            this.frame=this.iniFrame;
            this.animationSpeed = this.vulnerableNormalTime;
          }
        }
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
    this.rotationSpeed = 120;
    this.ySpeed = -10;
    this.yAccel = 40;
    this.x = x;
    this.y = y;
    this.xSpeed = vx;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    if (!this.parentNode.paused){
      var game;
     
      game = Game.instance;
      
      this.ySpeed += this.yAccel * evt.elapsed * 0.001;
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
  initialize: function(x,y,lvlBoxMap,boxGroup,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/doorgen.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    //this.boxes = [];
    
    for(var i=0; i<lvlBoxMap.length; i++){
      var box = new BoxSprite(lvlBoxMap[i][0],lvlBoxMap[i][1],lvlBoxMap[i][2],difficulty);
      boxGroup.addChild(box);
    }
  }
});

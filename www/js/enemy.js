// Bat Enemy
var BatEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,yTarget,level) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/fishSheet.png'];
    this.direction = findAngle(x,y,xTarget,yTarget);
    this.x = x;
    this.y = y;

    // 2 - Status
    this.level = level;
    this.nextposX = xTarget;
    this.nextposY = yTarget;
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 10;
    
    // 3 - Animate
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 1;
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
    this.idleTime=0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function() {
    this.parentNode.removeChild(this);
    this.remove();
  },
  
  update: function(evt) {
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
      
      if(this.mode == 'start'){
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.nextposY >= this.y){
          this.mode = 'idle';
          this.y = this.nextposY;
          this.x = this.nextposX;
        }
        console.log(this.x,this.y);
      }
      if(this.mode == 'idle'){
        this.idleTime+=1;
        if(this.idleTime >= 60) this.mode = 'fly';
      }
      if(this.mode == 'fly'){
        /* TODO: fazer o morcego voar na direção do jogador */
      }
    }
  }
});

//Bat Generator
var BatGenerator = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,yTarget) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/Ice.png'];      
    
    this.x = x;
    this.y = y;
    this.yTarget = yTarget;
    this.xTargets = [72,96,120];
    this.createBatTime = 10;
    this.batIdx = 0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    if (!this.parentNode.paused){
      //console.log(this.parentNode.batGroup.childNodes.length);
      if (this.batIdx < 3){
        this.createBatTime -= 1;
        if (this.createBatTime <= 0) {
          //console.log("creating bat");
          var bat = new BatEnemy(this.x,this.y,this.xTargets[this.batIdx],this.yTarget,1);
          this.parentNode.batGroup.addChild(bat);
          this.createBatTime = 10;
          this.batIdx+=1;
          //console.dir(this.parentNode.batGroup);
        }
      }
    }
  }
});
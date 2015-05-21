// Bosses
/* var MadBatBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,level,batsniperGenKey,moveLimit,moveHideout) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/batsniperSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.batsniperGenKey = batsniperGenKey;

    // 2 - Status
    this.level = level;
    this.position = xTarget;
    this.nextposX = xTarget;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, idle, fly, hit
    if(this.x< Game.instance.width/2)
      this.modeMove = 'desc';
    else this.modeMove = 'asc';
    this.moveSpeed = 2;    
    this.moveLeftLimit = moveLimit[0];
    this.moveRightLimit = moveLimit[1];
    this.hideoutStart = moveHideout[0];
    this.hideoutEnd = moveHideout[1];
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.hp = 2; //after two shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 30;
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  isHidden: function() {
    if(this.hideoutStart==0 && this.hideoutEnd==0) return false; //there's no place to hide in this stage
    if(this.mode=='start' || this.mode=='hiding') return true; //is behind hideout
    else if(this.x>this.hideoutStart && (this.x+32)<this.hideoutEnd) return true; //is behind hideout
    else return false; //is exposed
  },
  
  gotHit: function(playerObj) {
    if (!this.isHidden() || this.mode=='shoot' || this.mode=='offguard'){
      switch(this.mode){
        case 'idle'   : playerObj.score+=20; break;
        case 'shoot'  : playerObj.score+=70; break;
        case 'fly'    : playerObj.score+=60; break;
        case 'crazy'  : playerObj.score+=200; break;
      }
      this.hp-=1;
      if(this.hp<0){
        this.parentNode.parentNode.batsniperGenerator.rearrangeBatSnipers(this.batsniperGenKey);
        var batsniperk = new BossKilled(this.x,this.y);
        this.parentNode.parentNode.addChild(batsniperk);
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 10;
        this.animationDuration = 0;
        this.frame = 4;
        this.iniFrame = 4;
        this.endFrame = 4;
      }
      return true;
    }
    else return false;
  },
  
  setTarget: function(batqty) {
    var game = Game.instance;
    var addBullet = 0;
    if(batqty <=6) addBullet = 1;
    //alert(addBullet);
    if(this.hp>1) {
      this.shootTime = 10;
      this.mode = 'shoot';
      this.bullets = 0 + addBullet;
    }else if(this.hp>0) {
      this.shootTime = 5;
      this.mode = 'shoot';
      this.bullets = 3 + addBullet*2;
    }else if(this.hp<=0) {
      this.startTime = 20;
      this.mode = 'hiding';
    }
    //this.moveSpeed = 6;
    //this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    //this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    this.nextposX = this.parentNode.parentNode.batsniperGenerator.batsniperEnemyMap[this.position][0];
    
    if (!this.parentNode.parentNode.paused){
      if(this.mode == 'start'){
        this.startTime-=1;
        if(this.startTime%2==0){
          this.visible=false;
        }else this.visible=true;
        if(this.startTime<=0){
          this.visible = true;
          this.mode = 'idle';
          //this.y = this.nextposY;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'idle'){
        //this.y = this.nextposY;
        if(this.modeMove == 'desc'){
          this.x -= this.moveSpeed;
          if(this.x<this.moveLeftLimit) {
            this.x = this.moveLeftLimit;
            this.modeMove = 'asc';
          }
        }else{
          this.x += this.moveSpeed;
          if(this.x>this.moveRightLimit) {
            this.x = this.moveRightLimit;
            this.modeMove = 'desc';
          }
        }
      }
      if(this.mode == 'shoot'){
        //shoot at player
        this.shootTime-=1;
        if(this.bullets>=0 && this.shootTime<=0){
          if(this.isHidden()) this.y=this.originY - 16;
          var s = new EnemyShot(this.x+16, this.y+16, this.parentNode.parentNode.rolf, this.level, 'batsniper');
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          if(this.bullets<=0){
            this.mode = 'offguard';
            this.shootTime = 20; 
          }else this.shootTime = 2;
        }
      }
      if(this.mode == 'offguard'){
        //shoot at player
        this.shootTime-=1;
        if(this.shootTime<=0){
         this.mode = 'idle';
         if(this.isHidden()) this.y=this.originY;        
        }
      }      
      if(this.mode == 'hiding'){
        this.startTime-=1;
        if(this.startTime%2==0){
          this.visible=false;
        }else this.visible=true;
        if(this.startTime<=0){
          this.visible = true;
          this.bullets = 5;
          this.shootTime = 16;
          this.y = 248;
          this.x = -32;
          this.moveSpeed = 5;
          this.mode = 'fly';
        }
      }
      if(this.mode == 'fly'){
        //movement
        this.x += this.moveSpeed;
        this.shootTime-=1;
        if(this.bullets>=0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+16, this.y+16, this.parentNode.parentNode.rolf, this.level, 'batsniper');
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 16;
        }
        if(this.x >= game.width){
          this.startTime = 30;
          this.moveSpeed = 2;
          this.mode = 'start';
          this.x = this.originX;
          this.y = this.originY;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=1;
        if(this.gotHitTime<=0) {
          if(this.hp>0){
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 3;
          }else{
            this.animationDuration = 0;
            this.frame = 5;
            this.iniFrame = 5;
            this.endFrame = 8;
          }
        }
      }
      
      //START ANIMATION BLOCK//
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      //END ANIMATION BLOCK//
    }
  }
});

var BossKilled = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/batsniperSheet.png'];
    this.x = x;
    this.y = y;
    this.aboutToDieTime = 10;
    
    // 3 - Animate
    this.frame = 9;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    this.aboutToDieTime-=1;
    if(this.aboutToDieTime%2==0){
      this.visible=false;
    }else this.visible=true;
    if(this.aboutToDieTime<=0){
      this.parentNode.removeChild(this);
      delete this;
    }
  }
}); */

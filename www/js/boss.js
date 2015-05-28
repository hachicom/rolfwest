// Bosses
var MadBatBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/madbatSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;

    // 2 - Status
    this.level = level;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, fly, hit
    this.moveSpeed = 2;
    this.ySpeed = 0;
    this.yAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 10; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 30;
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    this.frame = 10;
    this.iniFrame = 10;
    this.endFrame = 10;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    if (this.gotHitTime>0) return false;
    if (this.mode=='fly'){
      switch(this.mode){
        case 'fly'    : playerObj.score+=10; break;
      }
      this.hp-=1;
      if(this.hp<0){
        //alert("i'm dead");
        var madbatk = new BossKilled(this.x,this.y, 'madbat');
        this.parentNode.parentNode.addChild(madbatk);
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 10;
        this.animationDuration = 0;
        this.frame = 10;
        this.iniFrame = 10;
        this.endFrame = 10;
      }
      return true;
    }
    else return false;
  },
  
  setTarget: function(batqty) {
    var game = Game.instance;
    //alert(addBullet);
    if(this.hp>4) {
      this.shootTime = 10;
      this.bullets = 4;
    }else if(this.hp>1) {
      this.shootTime = 5;
      this.bullets = 8;
    }
    //this.moveSpeed = 6;
    //this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    //this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!    
    if (!this.parentNode.parentNode.paused){
      if(this.mode == 'start'){
        this.startTime-=1;
        if(this.startTime%2==0){
          this.visible=false;
        }else this.visible=true;
        if(this.startTime<=0){
          this.visible = true;
          this.mode = 'fly';
          //this.y = this.nextposY;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'fly'){
        //movement
        if(this.y <= this.originY){
          if(this.y<=this.originY - 8) this.verticalDir=2;
        } else {
          if(this.y>=this.originY + 8) this.verticalDir=1;
        }
        if(this.verticalDir==1){ //up
          this.ySpeed -= this.yAccel;
          if(this.ySpeed<=-7)this.ySpeed=-7;
        }else{ //down
          this.ySpeed += this.yAccel;
          if(this.ySpeed>=7)this.ySpeed=7;
        }
        this.y += this.ySpeed;
        if(this.horizontalDir==1){ //left
          this.x -= this.moveSpeed;
          if (this.x < 0) {
            this.x = 0;
            this.horizontalDir = 2;
          }
        }else{ //right
          this.x += this.moveSpeed;
          if (this.x > game.width-this.width) {
            this.x = game.width-this.width;
            this.horizontalDir = 1;
          }
        }
        
        this.shootTime-=1;
        if(this.shootTime<=0){
          var s = new EnemyShot(this.x+16, this.y+16, this.parentNode.parentNode.rolf, this.level, 'batsniper');
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 30;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=1;
        if(this.gotHitTime<=0) {
          if(this.hp>2){
            this.animationDuration = 0;
            this.frame = 10;
            this.iniFrame = 10;
            this.endFrame = 10;
          }else{
            this.animationDuration = 0;
            this.frame = 10;
            this.iniFrame = 10;
            this.endFrame = 10;
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
  initialize: function(x,y,enemy) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/madbatSheet.png'];
    this.x = x;
    this.y = y;
    this.id = enemy;
    this.aboutToDieTime = 30;
    
    // 3 - Animate
    switch(enemy){ //madbat, chiefbatoh, bartho, agilewest
      default: this.frame = 9; break;
    }
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    this.aboutToDieTime-=1;
    if(this.aboutToDieTime%2==0){
      this.visible=false;
    }else this.visible=true;
    if(this.aboutToDieTime<=0){
      this.parentNode.bossGenerator.defeated = true;
      this.parentNode.checkLevelComplete();
      this.parentNode.removeChild(this);
      delete this;
    }
  }
});

//Boss Generator
var BossGenerator = Class.create(Sprite, {
  // The windows that will create the batsnipers
  initialize: function(x,y,world,round) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/Ice.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    this.createBossTime = 10;
    this.sendBossTime = 90 + (10 * getRandom(1,4));
    this.batsniperIdx = 0;
    this.world = world;
    this.round = round;
    this.defeated = false;
    
    //this.addEventListener(Event.ENTER_FRAME, this.update);
  },
    
  createBoss: function() {
    var game = Game.instance;
    switch(this.world){
      case 1: 
        var boss = new MadBatBoss(game.width/2 - 32,this.y,this.world);
        break;
    }
    this.parentNode.bossGroup.addChild(boss);
  }
});
// Bosses
var MadBatBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/bossMadbatSheet.png'];
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
    this.hp = 30; //after 10 shots, goes crazy
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
  
  gotHit: function(playerObj) {
    //if (this.gotHitTime>0) return false;
    if (this.mode=='fly'){
      switch(this.mode){
        case 'fly'    : playerObj.score+=10; break;
      }
      this.hp-=1;
      if(this.hp<0){
        //alert("i'm dead");
        this.parentNode.parentNode.bossGenerator.defeated = true;
        var madbatk = new BossKilled(this.x,this.y, 'madbat');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=1000;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 10;
        this.animationDuration = 0;
        this.frame = 4;
        this.iniFrame = 4;
        this.endFrame = 5;
      }
      return true;
    }
    else return false;
  },
  
  // setTarget: function(batqty) {
    // var game = Game.instance;
    // if(this.hp>10) {
      // this.shootTime = 20;
      // this.bullets = 4;
    // }else if(this.hp>5) {
      // this.shootTime = 10;
      // this.bullets = 8;
    // }
  // },
  
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
          var bulletId = 'boss1';
          if(this.level>=4) bulletId = 'boss3';
          var s = new EnemyShot(this.x+16, this.y+50, this.parentNode.parentNode.rolf, this.level, bulletId, false);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 60;
          if(this.level>=4) this.shootTime = 30;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=1;
        if(this.gotHitTime<=0) {
          if(this.hp>2){
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 3;
          }else{
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 3;
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

var ChiefBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/bossChiefSheet.png'];
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
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 30; //after 10 shots, goes crazy
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
  
  gotHit: function(playerObj) {
    //if (this.gotHitTime>0) return false;
    if (this.mode=='fly'){
      switch(this.mode){
        case 'fly'    : playerObj.score+=10; break;
      }
      this.hp-=1;
      if(this.hp<0){
        //alert("i'm dead");
        this.parentNode.parentNode.bossGenerator.defeated = true;
        var madbatk = new BossKilled(this.x,this.y, 'chief');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=1000;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 10;
        this.animationDuration = 0;
        this.frame = 4;
        this.iniFrame = 4;
        this.endFrame = 5;
      }
      return true;
    }
    else return false;
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
        if(this.x <= this.parentNode.parentNode.rolf.x){
          if(this.x<=this.parentNode.parentNode.rolf.x - 24) this.horizontalDir=2;
        } else {
          if(this.x>=this.parentNode.parentNode.rolf.x + 24) this.horizontalDir=1;
        }
        if(this.horizontalDir==1){
          this.xSpeed -= this.xAccel;
          if(this.xSpeed<=-7)this.xSpeed=-7;
        }else{
          this.xSpeed += this.xAccel;
          if(this.xSpeed>=7)this.xSpeed=7;
        }
        this.x += this.xSpeed;
        
        this.shootTime-=1;
        if(this.shootTime<=0){
          var shootdown = true;
          if(this.level>=4) shootdown = false;
          var s = new EnemyShot(this.x+16, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss2', shootdown);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 25;
          if(this.level>=4) this.shootTime = 15;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=1;
        if(this.gotHitTime<=0) {
          if(this.hp>2){
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 3;
          }else{
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 3;
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

var BarthoBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/bossBarthoSheet.png'];
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
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 60; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 30;
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 1;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    //if (this.gotHitTime>0) return false;
    if (this.mode=='idle' || this.mode=='crazy'){
      switch(this.mode){
        case 'idle'    : playerObj.score+=10; break;
        case 'crazy'    : playerObj.score+=20; break;
      }
      this.hp-=1;
      if(this.hp<0){
        //alert("i'm dead");
        this.parentNode.parentNode.bossGenerator.defeated = true;
        var madbatk = new BossKilled(this.x,this.y, 'bartho');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=1000;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 10;
        this.animationDuration = 0;
        this.frame = 2;
        this.iniFrame = 2;
        this.endFrame = 3;
      }
      return true;
    }
    else return false;
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
          this.mode = 'idle';
          //this.y = this.nextposY;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'idle'){
        this.shootTime-=1;
        if(this.hp<=20){
          this.mode = 'crazy';
          this.bullets = 3;
          this.shootTime = 20;
        }
        if(this.shootTime<=0){
          var s = new EnemyShot(this.parentNode.parentNode.rolf.x, -24, this.parentNode.parentNode.rolf, this.level, 'boss3', true);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.shootTime = 20;
        }
      }
      if(this.mode == 'crazy'){
        this.shootTime-=1;
        if(this.shootTime<=0){
          if(this.bullets > 0){
            var s1 = new EnemyShot(this.x+6, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss3-2', false);
            this.parentNode.parentNode.evilShotGroup.addChild(s1);
            var s2 = new EnemyShot(this.x+48, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss3-2', false);
            this.parentNode.parentNode.evilShotGroup.addChild(s2);
            this.bullets-=1;
          }else{
            this.bullets = 3;
            this.shootTime = 20;
          }
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=1;
        if(this.gotHitTime<=0) {
          if(this.hp>2){
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 1;
          }else{
            this.animationDuration = 0;
            this.frame = 0;
            this.iniFrame = 0;
            this.endFrame = 1;
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
    this.image  = Game.instance.assets['res/bossDefeatedSheet.png']; //Create a new sheet with all bosses defeated
    this.x = x;
    this.y = y;
    this.id = enemy;
    this.aboutToDieTime = 90;
    
    // 3 - Animate
    switch(enemy){ //madbat, chief, bartho, agile
      case 'madbat': this.frame = 0; break;
      case 'chief':  this.frame = 1; break;
      case 'bartho': this.frame = 2; break;
      case 'agile':  this.frame = 3; break;
      default: this.frame = 0; break;
    }
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    this.aboutToDieTime-=1;
    if(this.aboutToDieTime%2==0){
      this.visible=false;
    }else this.visible=true;
    if(this.aboutToDieTime%5==0){
      var explosion = new Explosion(getRandom(this.x-12,this.x+this.width),getRandom(this.y-12,this.y+this.height),false);
      this.parentNode.addChild(explosion);
    }
    if(this.aboutToDieTime<=0){
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
      case 2: 
        var boss = new ChiefBoss(game.width/2 - 32,this.y,this.world);
        break;
      case 3: 
        var boss = new BarthoBoss(game.width/2 - 32,96,this.world);
        break;
      case 4: 
        var boss = new MadBatBoss(game.width/2 - 32,this.y,this.world);
        break;
      case 5: 
        var boss = new ChiefBoss(game.width/2 - 32,this.y,this.world);
        break;
      // case 6: 
        // var boss = new AgileBoss(game.width/2 - 32,this.y,this.world);
        // break;
    }
    this.parentNode.bossGroup.addChild(boss);
  }
});
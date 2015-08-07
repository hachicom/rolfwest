// Bosses
var MadBatBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    if(level>=4) this.image  = Game.instance.assets['res/bossCannonSheet.png'];
    else this.image  = Game.instance.assets['res/bossMadbatSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.difficulty = difficulty;

    // 2 - Status
    this.level = level;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, fly, hit
    this.moveSpeed = 80;
    this.ySpeed = 0;
    this.yAccel = 20;
    this.shootTime = 0;
    this.bullets = 3;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 30; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 1;
    
    if(difficulty=='hard') {
      this.hp = 36;
      this.moveSpeed = 160;
    }
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.08;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    this.vulnerableBlinkTime = 0.01; //secs
    
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
        var madbatk;
        if(this.level>=4) madbatk = new BossKilled(this.x,this.y, 'cannon');
        else madbatk = new BossKilled(this.x,this.y, 'madbat');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=1000*this.level;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 0.333;
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
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
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
          this.ySpeed -= this.yAccel * evt.elapsed * 0.001;
          if(this.ySpeed<=-7)this.ySpeed=-7;
        }else{ //down
          this.ySpeed += this.yAccel * evt.elapsed * 0.001;
          if(this.ySpeed>=7)this.ySpeed=7;
        }
        this.y += this.ySpeed;
        if(this.horizontalDir==1){ //left
          this.x -= this.moveSpeed * evt.elapsed * 0.001;
          if (this.x < 0) {
            this.x = 0;
            this.horizontalDir = 2;
          }
        }else{ //right
          this.x += this.moveSpeed * evt.elapsed * 0.001;
          if (this.x > game.width-this.width) {
            this.x = game.width-this.width;
            this.horizontalDir = 1;
          }
        }
        
        this.shootTime-=evt.elapsed * 0.001;
        if(this.shootTime<=0){
          if(this.level>=4){
            bulletId = 'boss3';
            var s = new EnemyShot(this.x+16, this.y+50, this.parentNode.parentNode.rolf, this.level, bulletId, false);
            this.parentNode.parentNode.evilShotGroup.addChild(s);
            this.parentNode.parentNode.playSound("eshoot");
            //this.bullets-=1;
            this.shootTime = 1;
            if(this.difficulty=='hard') this.shootTime = 0.667;
          }else{
            if(this.bullets > 0){
              var s1 = new EnemyShot(this.x+16, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss1', false);
              this.parentNode.parentNode.evilShotGroup.addChild(s1);
              var s2 = new EnemyShot(this.x+32, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss1', false);
              this.parentNode.parentNode.evilShotGroup.addChild(s2);
              this.parentNode.parentNode.playSound("eshoot");
              this.bullets-=1;
            }else{
              this.bullets = 3;
              this.shootTime = 1;
              if(this.difficulty=='hard') this.shootTime = 0.667;
            }
          }
          
          if(this.level>=4 || this.difficulty=='hard') this.shootTime = 1; //???
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
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
      this.animationDuration += evt.elapsed * 0.001;    
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
  initialize: function(x,y,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    if(level>=4) this.image  = Game.instance.assets['res/bossChenSheet.png'];
    else this.image  = Game.instance.assets['res/bossChiefSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.difficulty = difficulty;

    // 2 - Status
    this.level = level;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, fly, hit
    this.moveSpeed = 80;
    this.xSpeed = 0;
    this.xAccel = 20;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 30; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 1; //secs
    
    if(difficulty=='hard') {
      this.hp = 38;
      this.moveSpeed = 160;
    }
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.08;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    this.vulnerableBlinkTime = 0.01; //secs
    
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
        var madbatk;
        if(this.level>=4) madbatk = new BossKilled(this.x,this.y, 'chen');
        else madbatk = new BossKilled(this.x,this.y, 'chief');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=1000*this.level;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 0.333;
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
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
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
          this.xSpeed -= this.xAccel * evt.elapsed * 0.001;
          if(this.xSpeed<=-7)this.xSpeed=-7;
        }else{
          this.xSpeed += this.xAccel * evt.elapsed * 0.001;
          if(this.xSpeed>=7)this.xSpeed=7;
        }
        this.x += this.xSpeed;
        
        this.shootTime-=evt.elapsed * 0.001;
        if(this.shootTime<=0){
          var shootdown = true;
          if(this.level>=4 || this.difficulty=='hard') shootdown = false;
          var s = new EnemyShot(this.x+16, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss2', shootdown);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          this.shootTime = 0.833;
          if(this.level>=4 || this.difficulty=='hard') this.shootTime = 0.667;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
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
      this.animationDuration += evt.elapsed * 0.001;    
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
  initialize: function(x,y,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[64, 64]);
    this.image  = Game.instance.assets['res/bossBarthoSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.difficulty = difficulty;

    // 2 - Status
    this.level = level;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, fly, hit
    this.moveSpeed = 80;
    this.xSpeed = 0;
    this.xAccel = 20;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 22; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 1; //secs
    
    if(difficulty=='hard') {
      this.hp = 33;
      //this.moveSpeed = 4;
    }
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.08;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 1;
    this.vulnerableBlinkTime = 0.01; //secs
    
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
        playerObj.score+=1000*this.level;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 0.333;
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
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
        if(this.startTime<=0){
          this.visible = true;
          this.mode = 'idle';
          //this.y = this.nextposY;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'idle'){
        this.shootTime-=evt.elapsed * 0.001;
        if(this.hp<=18){
          this.mode = 'crazy';
          this.bullets = 3;
          this.shootTime = 0.667;
        }
        if(this.shootTime<=0){
          var s = new EnemyShot(this.parentNode.parentNode.rolf.x, -24, this.parentNode.parentNode.rolf, this.level, 'boss3', true);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("explode");
          this.shootTime = 1.333;
          if(this.difficulty=='hard') this.shootTime = 1;
        }
      }
      if(this.mode == 'crazy'){
        this.shootTime-=evt.elapsed * 0.001;
        if(this.shootTime<=0){
          if(this.bullets > 0){
            var s1 = new EnemyShot(this.x+6, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss3-2', false);
            this.parentNode.parentNode.evilShotGroup.addChild(s1);
            var s2 = new EnemyShot(this.x+24, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss3-2', false);
            this.parentNode.parentNode.evilShotGroup.addChild(s2);
            var s3 = new EnemyShot(this.x+42, this.y+50, this.parentNode.parentNode.rolf, this.level, 'boss3-2', false);
            this.parentNode.parentNode.evilShotGroup.addChild(s3);
            this.parentNode.parentNode.playSound("eshoot");
            this.bullets-=1;
          }else{
            this.bullets = 3;
            this.shootTime = 1;
            if(this.difficulty=='hard') this.shootTime = 0.667;
          }
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
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
      this.animationDuration += evt.elapsed * 0.001;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      //END ANIMATION BLOCK//
    }
  }
});

var AgileBoss = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/bossAgileSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.difficulty = difficulty;

    // 2 - Status
    this.level = level;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, fly, hit
    this.moveSpeed = 80;
    this.xSpeed = 0;
    this.xAccel = 20;
    this.ySpeed = 0;
    this.yAccel = 20;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.verticalDir = getRandom(1,2); //up/down
    this.hp = 40; //after 10 shots, goes crazy
    this.gotHitTime = 0;
    this.startTime = 1;
    this.modeTime = 3;
    
    if(difficulty=='hard') {
      this.hp = 60;
      this.moveSpeed = 160;
    }
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.08;
    this.idleTime=0;
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    this.vulnerableBlinkTime = 0.01; //secs
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    //if (this.gotHitTime>0) return false;
    if (this.mode=='fly' || this.mode=='retreat' || this.mode == 'surprise'){
      switch(this.mode){
        case 'fly'    : playerObj.score+=10; break;
      }
      this.hp-=1;
      if(this.hp<0){
        //alert("i'm dead");
        this.parentNode.parentNode.bossGenerator.defeated = true;
        var madbatk = new BossKilled(this.x,this.y, 'agile');
        this.parentNode.parentNode.addChild(madbatk);
        playerObj.score+=10000;
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 0.333;
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
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
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
          this.ySpeed -= this.yAccel * evt.elapsed * 0.001;
          if(this.ySpeed<=-7)this.ySpeed=-7;
        }else{ //down
          this.ySpeed += this.yAccel * evt.elapsed * 0.001;
          if(this.ySpeed>=7)this.ySpeed=7;
        }
        this.y += this.ySpeed;
        
        if(this.x <= this.parentNode.parentNode.rolf.x){
          if(this.x<=this.parentNode.parentNode.rolf.x - 24) this.horizontalDir=2;
        } else {
          if(this.x>=this.parentNode.parentNode.rolf.x + 24) this.horizontalDir=1;
        }
        if(this.horizontalDir==1){
          this.xSpeed -= this.xAccel * evt.elapsed * 0.001;
          if(this.xSpeed<=-7)this.xSpeed=-7;
        }else{
          this.xSpeed += this.xAccel * evt.elapsed * 0.001;
          if(this.xSpeed>=7)this.xSpeed=7;
        }
        this.x += this.xSpeed;
        //if(this.x <= 0) this.x = 0;
        //else if(this.x >= 296) this.x = 296;
        
        this.shootTime-=evt.elapsed * 0.001;
        if(this.shootTime<=0){
          var s = new EnemyShot(this.x, this.y+24, this.parentNode.parentNode.rolf, this.level, 'boss4', true);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          this.shootTime = 0.267;
          if(this.difficulty=='hard') this.shootTime = 0.133;
        }
        this.modeTime -= evt.elapsed * 0.001;
        if(this.modeTime<=0) {this.mode = 'hide'; this.modeTime = 1;}
      }            
      if(this.mode == 'hide'){
        this.modeTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
        if(this.modeTime<=0){
          this.visible = true;
          this.bullets = 6;
          if(this.difficulty=='hard') this.bullets+= getRandom(0,3);
          this.shootTime = 0;
          this.y = this.parentNode.parentNode.rolf.y - 96;
          this.x = this.parentNode.parentNode.rolf.x;
          this.mode = 'surprise';
        }
      }
      if(this.mode == 'surprise'){
        this.shootTime-=evt.elapsed * 0.001;
        if(this.bullets>=0 && this.shootTime<=0){
          var s = new EnemyShot(this.x, this.y+24, this.parentNode.parentNode.rolf, this.level, 'boss4', true);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          if(this.bullets<=0){
            this.mode = 'retreat';
          }
          this.shootTime = 0.133;
          if(this.difficulty=='hard') this.shootTime = 0.067;
        }
      }
      if(this.mode == 'retreat'){
        if(this.x<=(game.width/2)-12){
          this.x -= 120 * evt.elapsed * 0.001;
          if(this.x<=-24){
            this.mode = 'restart';
          }
        }else{
          this.x += 120 * evt.elapsed * 0.001;
          if(this.x>=game.width){
            this.mode = 'restart';
          }
        }
      }
      if(this.mode == 'restart'){
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
        if(this.startTime<=0){
          this.visible = true;
          this.y = this.originY;
          this.x = this.originX;
          this.modeTime = 3;
          this.startTime = 1;
          this.mode = 'start';
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
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
      this.animationDuration += evt.elapsed * 0.001;    
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
    this.aboutToDieTime = 3;
    this.vulnerableBlinkTime = 0.01; //secs
    this.createExplosionTime = 0.125; //secs
    
    // 3 - Animate
    switch(enemy){ //madbat, chief, bartho, agile
      case 'madbat': this.frame = 0; break;
      case 'chief':  this.frame = 1; break;
      case 'bartho': this.frame = 2; break;
      case 'cannon': this.frame = 3; break;
      case 'chen':   this.frame = 4; break;
      case 'agile':  this.frame = 5; break;
      default: this.frame = 0; break;
    }
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    if (!this.parentNode.paused){
      this.aboutToDieTime-=evt.elapsed * 0.001;
      this.vulnerableBlinkTime -= evt.elapsed * 0.001;
      this.createExplosionTime -= evt.elapsed * 0.001;
      if(this.vulnerableBlinkTime<=0){
        this.visible=!this.visible;
        this.vulnerableBlinkTime += 0.01;
      }
      if(this.createExplosionTime<=0){
        var correction = 0;
        if(this.id=='agile') correction = 32;
        var explosion = new Explosion(getRandom(this.x-12-correction,this.x+this.width-correction),getRandom(this.y-12-correction,this.y+this.height-correction),false);
        this.parentNode.addChild(explosion);
        this.parentNode.playSound("explode");
        this.createExplosionTime += 0.125;
      }
      if(this.aboutToDieTime<=0){
        this.parentNode.checkLevelComplete();
        this.parentNode.removeChild(this);
        delete this;
      }
    }
  }
});

//Boss Generator
var BossGenerator = Class.create(Sprite, {
  // The windows that will create the batsnipers
  initialize: function(x,y,world,round,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/Ice.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    //this.createBossTime = 0.333;
    //this.sendBossTime = 3 + (0.3 * getRandom(1,4));
    this.world = world;
    this.round = round;
    this.defeated = false;
    this.difficulty = difficulty;
    
    //this.addEventListener(Event.ENTER_FRAME, this.update);
  },
    
  createBoss: function() {
    var game = Game.instance;
    switch(this.world){
      case 1: 
        var boss = new MadBatBoss(game.width/2 - 32,this.y,this.world,this.difficulty);
        break;
      case 2: 
        var boss = new ChiefBoss(game.width/2 - 32,this.y,this.world,this.difficulty);
        break;
      case 3: 
        var boss = new BarthoBoss(game.width/2 - 32,64,this.world,this.difficulty);
        break;
      case 4: 
        var boss = new MadBatBoss(game.width/2 - 32,this.y,this.world,this.difficulty);
        break;
      case 5: 
        var boss = new ChiefBoss(game.width/2 - 32,this.y,this.world,this.difficulty);
        break;
      case 6: 
        var boss = new AgileBoss(game.width/2,this.y,this.world,this.difficulty);
        break;
    }
    this.parentNode.bossGroup.addChild(boss);
  }
});
// BatSniper Enemy
var BatSniperEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,level,batsniperGenKey,moveLimit,moveHideout,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/batsniperSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.batsniperGenKey = batsniperGenKey;
    this.difficulty = difficulty;

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
    this.moveSpeed = 80;    
    this.moveLeftLimit = moveLimit[0];
    this.moveRightLimit = moveLimit[1];
    this.hideoutStart = moveHideout[0];
    this.hideoutEnd = moveHideout[1];
    this.xSpeed = 0;
    this.xAccel = 20;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.hp = 3; //goes crazy when hp = 0
    if(difficulty=='hard') this.hp = 5;
    this.gotHitTime = 0;
    this.startTime = 1; //secs
    
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
  
  isHidden: function() {
    if(this.mode=='start' || this.mode=='hiding') return true; //is teleporting
    else return false; //is exposed
  },
  
  gotHit: function(playerObj) {
    //if (this.gotHitTime>0) return false;
    if (!this.isHidden()){
      switch(this.mode){
        case 'idle'    : playerObj.addScore(20,false); break;
        case 'shoot'   : playerObj.addScore(50,false); break;
        case 'offguard': playerObj.addScore(500,false); break;
        case 'fly'     : playerObj.addScore(250,false); break;
      }
      this.hp-=1;
      if(this.hp<0){
        this.parentNode.parentNode.batsniperGenerator.rearrangeBatSnipers(this.batsniperGenKey);
        var batsniperk = new BatsniperKilled(this.x,this.y);
        this.parentNode.parentNode.addChild(batsniperk);
    
        if(this.mode == 'fly'){
          var diamond = new DiamondItem(this.x,this.y);
          this.parentNode.parentNode.itemGroup.addChild(diamond);
        }
        
        this.parentNode.removeChild(this);
        delete this;
      }else{
        this.gotHitTime = 0.2;
        this.animationDuration = 0;
        this.frame = 4;
        this.iniFrame = 4;
        this.endFrame = 4;
        
        if(this.hp == 0 && this.mode != 'idle'){
          var hat = new HatItem(this.x,this.y,playerObj.health);
          this.parentNode.parentNode.itemGroup.addChild(hat);
        }
      }
      return true;
    }
    else return false;
  },
  
  gotKilled: function(playerObj) {
    //this.parentNode.parentNode.batkidGenerator.rearrangeBatKids(this.batkidGenKey);
    var batsniperk = new BatsniperKilled(this.x,this.y);
    this.parentNode.parentNode.addChild(batsniperk);
    
    /* if(this.mode == 'fly'){
      var diamond = new DiamondItem(this.x,this.y);
      this.parentNode.parentNode.itemGroup.addChild(diamond);
    }else{
      var coinchance = getRandom(1,3);
      if(coinchance == 2){
        var hat = new HatItem(this.x,this.y,playerObj.health);
        this.parentNode.parentNode.itemGroup.addChild(hat);
      }
    } */
    this.parentNode.removeChild(this);
    delete this;
  },
  
  setTarget: function(batqty) {
    var game = Game.instance;
    var addBullet = 0;
    if(batqty <=6) addBullet = 1;
    //alert(addBullet);
    if(this.hp>1) {
      this.shootTime = 0.2;
      this.mode = 'shoot';
      this.bullets = 0 + addBullet;
      if(this.level>=5 || this.difficulty=='hard') this.bullets = 3 + addBullet;
    }else if(this.hp>0) {
      this.shootTime = 0.1;
      this.mode = 'shoot';
      this.bullets = 3 + addBullet*2;
      if(this.level>=5 || this.difficulty=='hard') this.bullets = 3 + addBullet * getRandom(3,6);
    }else if(this.hp<=0) {
      this.startTime = 0.667;
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
        //this.y = this.nextposY;
        if(this.modeMove == 'desc'){
          this.x -= this.moveSpeed * evt.elapsed * 0.001;
          if(this.x<this.moveLeftLimit) {
            this.x = this.moveLeftLimit;
            this.modeMove = 'asc';
          }
        }else{
          this.x += this.moveSpeed * evt.elapsed * 0.001;
          if(this.x>this.moveRightLimit) {
            this.x = this.moveRightLimit;
            this.modeMove = 'desc';
          }
        }
      }
      if(this.mode == 'shoot'){
        //shoot at player
        this.shootTime-=evt.elapsed * 0.001;
        if(this.bullets>=0 && this.shootTime<=0){
          //if(this.isHidden()) this.y=this.originY - 16;
          var s = new EnemyShot(this.x+16, this.y+16, this.parentNode.parentNode.rolf, this.level, 'batsniper', false);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          if(this.bullets<=0){
            this.mode = 'offguard';
            this.shootTime = 0.667; 
          }else this.shootTime = 0.05;
        }
      }
      if(this.mode == 'offguard'){
        //shoot at player
        this.shootTime-=evt.elapsed * 0.001;
        if(this.shootTime<=0){
         this.mode = 'idle';
         //if(this.isHidden()) this.y=this.originY;        
        }
      }      
      if(this.mode == 'hiding'){
        this.startTime-=evt.elapsed * 0.001;
        this.vulnerableBlinkTime -= evt.elapsed * 0.001;
        if(this.vulnerableBlinkTime<=0){
          this.visible=!this.visible;
          this.vulnerableBlinkTime += 0.01;
        }
        if(this.startTime<=0){
          this.visible = true;
          this.bullets = 10;
          this.shootTime = getRandom(1,3)/30;
          this.y = 248;
          this.x = -32;
          this.moveSpeed = 200;
          this.mode = 'fly';
        }
      }
      if(this.mode == 'fly'){
        //movement
        this.x += this.moveSpeed * evt.elapsed * 0.001;
        this.shootTime-=evt.elapsed * 0.001;
        if(this.bullets>=0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+16, this.y+16, this.parentNode.parentNode.rolf, this.level, 'batsniper', true);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          this.shootTime = 0.25;
        }
        if(this.x >= game.width){
          this.startTime = 1;
          this.moveSpeed = 80;
          this.mode = 'start';
          this.x = this.originX;
          this.y = this.originY;
        }
      }
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
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
      
      /*START ANIMATION BLOCK*/
      this.animationDuration += evt.elapsed * 0.001;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      /*END ANIMATION BLOCK*/
    }
  }
});

var BatsniperKilled = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/batsniperSheet.png'];
    this.x = x;
    this.y = y;
    this.aboutToDieTime = 0.3;
    this.vulnerableBlinkTime = 0.01; //secs
    
    // 3 - Animate
    this.frame = 9;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    this.aboutToDieTime-=evt.elapsed * 0.001;
    this.vulnerableBlinkTime -= evt.elapsed * 0.001;
    if(this.vulnerableBlinkTime<=0){
      this.visible=!this.visible;
      this.vulnerableBlinkTime += 0.01;
    }
    if(this.aboutToDieTime<=0){
      this.parentNode.removeChild(this);
      delete this;
    }
  }
});

//BatSniper Generator
var BatSniperGenerator = Class.create(Sprite, {
  // The windows that will create the batsnipers
  initialize: function(x,y,lvlBatSniperEnemyMap,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/Ice.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    //this.genpoint = x + (this.width/2);
    this.batsnipers = [];
    this.createBatSniperTime = 0.3;
    //this.createBatSniperSide = getRandom(0,1); //0=on the same position; 1=on the other side;
    this.sendBatSniperTime = 3 + (0.1 * getRandom(1,4));
    this.batsniperIdx = 0;
    //this.batsniperIdy = 0;
    this.level = level;
    this.difficulty = difficulty;
    
    //movement vars
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'asc'; //asc ou desc
    
    //level map loading
    parsedMap = JSON.parse(JSON.stringify(lvlBatSniperEnemyMap));
    if(Object.keys(parsedMap).length>0){
      this.batsniperEnemyMap = parsedMap.startAt;
      this.moveLimit = parsedMap.limit;
      this.moveHideout = parsedMap.hideout;
    }else this.defeated = true;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game = Game.instance;
    if (!this.parentNode.paused && this.modeStart && !this.defeated){
      //console.log(this.parentNode.batsniperGroup.childNodes.length);
      if (this.batsniperIdx < this.batsniperEnemyMap.length){
        this.createBatSniperTime -= evt.elapsed * 0.001;
        if (this.createBatSniperTime <= 0) {
          //console.log("creating batsnipers");
          for(var j=0; j<this.batsniperEnemyMap.length; j++){
            this.x = this.batsniperEnemyMap[this.batsniperIdx][0];
            this.y = this.batsniperEnemyMap[this.batsniperIdx][1];
            var batsniper = new BatSniperEnemy(this.x,this.y,this.batsniperIdx,this.level,this.batsnipers.length,this.moveLimit,this.moveHideout,this.difficulty);
            this.batsnipers.push(batsniper);
            this.parentNode.batsniperGroup.addChild(batsniper);
            this.createBatSniperTime = 0.267;
            this.createBatSniperSide = getRandom(0,1);
            this.batsniperIdx+=1;
            if(this.batsniperIdx >= this.batsniperEnemyMap.length){
              this.readyToFight = true;
            }
          }
          //console.dir(this.parentNode.batsniperGroup);
        }
      }else{
        if(!this.parentNode.gotHit){
          this.sendBatSniperTime-=evt.elapsed * 0.001;
          if(this.sendBatSniperTime<=0 && this.batsnipers.length>0){
            var idbatsniper = getRandom(1,this.batsnipers.length) - 1;
            if(this.batsnipers[idbatsniper].mode == 'idle') {
              this.batsnipers[idbatsniper].setTarget(this.parentNode.batGenerator.bats.length);
              this.sendBatSniperTime = 3 + (0.1 * getRandom(1,4));
            }
          }
        }
      }
    }
  },
  
  rearrangeBatSnipers: function(batsniperGenKey) {
    this.batsnipers.splice(batsniperGenKey,1);
    if(this.batsnipers.length<=0) this.defeated = true;
    for(var i=batsniperGenKey; i<this.batsnipers.length; i++){
      this.batsnipers[i].batsniperGenKey-=1;
    }
  },
  
  loadNewLevel: function(lvlBatSniperEnemyMap,level) {
    //reseting vars
    this.batsnipers = [];
    this.createBatSniperTime = 0;
    this.sendBatSniperTime = 3 + (0.1 * getRandom(1,4));
    this.batsniperIdx = 0;
    this.level = level;
    
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'asc';
    
    //loading new map
    parsedMap = JSON.parse(JSON.stringify(lvlBatSniperEnemyMap));
    if(Object.keys(parsedMap).length>0){
      this.batsniperEnemyMap = parsedMap.startAt;
      this.moveLimit = parsedMap.limit;
      this.moveHideout = parsedMap.hideout;
    }else this.defeated = true;
  }
});

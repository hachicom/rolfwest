// BatKid Enemy
var BatKidEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,level,batkidGenKey,moveLimit,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/batkidSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.batkidGenKey = batkidGenKey;
    this.difficulty = difficulty;

    // 2 - Status
    this.level = level;
    this.position = xTarget;
    this.nextposX = xTarget;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 160;    
    this.moveLeftLimit = moveLimit[0];
    this.moveRightLimit = moveLimit[1];
    this.xSpeed = 0;
    this.xAccel = 20;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    this.hp = 0;
    if(difficulty=='hard') this.hp = 2;
    this.gotHitTime = 0;
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.08;
    this.idleTime=0;
    this.frame = 4;
    this.iniFrame = 4;
    this.endFrame = 7;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    //if(this.mode=='start') return false;
    switch(this.mode){
      //case 'start'  : playerObj.score+=120; break;
      case 'idle'   : playerObj.addScore(30,false); break;
      case 'fly'    : playerObj.addScore(40,false); break;
      case 'shoot'  : playerObj.addScore(50,false); break;
      case 'retreat': playerObj.addScore(100,false); break;
    }
    
    this.hp-=1;
    if(this.hp<0){
      this.parentNode.parentNode.batkidGenerator.rearrangeBatKids(this.batkidGenKey);
      var batkidk = new BatkidKilled(this.x,this.y);
      this.parentNode.parentNode.addChild(batkidk);
      
      if(this.mode == 'retreat' || this.mode=='shoot'){
        var bars = new GoldBarsItem(this.x,this.y);
        this.parentNode.parentNode.itemGroup.addChild(bars);
      }else{ 
        var coinchance = getRandom(1,3);
        if(coinchance == 2){
          var cup = new GoldCupItem(this.x,this.y);
          this.parentNode.parentNode.itemGroup.addChild(cup);
        }
      }
      this.parentNode.removeChild(this);
      delete this;
    }else{
      this.gotHitTime = 0.2;
      this.animationDuration = 0;
      this.frame = 8;
      this.iniFrame = 8;
      this.endFrame = 8;
    }
  },
  
  gotKilled: function(playerObj) {
    //this.parentNode.parentNode.batkidGenerator.rearrangeBatKids(this.batkidGenKey);
    var batkidk = new BatkidKilled(this.x,this.y);
    this.parentNode.parentNode.addChild(batkidk);
    
    if(this.mode == 'retreat' || this.mode=='shoot'){
      var bars = new GoldBarsItem(this.x,this.y);
      this.parentNode.parentNode.itemGroup.addChild(bars);
    }else{ 
      var coinchance = getRandom(1,3);
      if(coinchance == 2){
        var cup = new GoldCupItem(this.x,this.y);
        this.parentNode.parentNode.itemGroup.addChild(cup);
      }
    }
    this.parentNode.removeChild(this);
    delete this;
  },
  
  setTarget: function() {
    var game = Game.instance;
    this.moveSpeed = 240;
    this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    this.nextposX = this.parentNode.parentNode.batkidGenerator.batkidEnemyMap[this.position][0];
    //this.nextposY = this.y;
    
    if (!this.parentNode.parentNode.paused){      
      if(this.mode == 'start'){
        this.direction = findAngle(this.x,this.y,this.nextposX,this.y);
        this.x += this.moveSpeed * Math.cos(this.direction) * evt.elapsed * 0.001;
        this.y += this.moveSpeed * Math.sin(this.direction) * evt.elapsed * 0.001;
        if(this.nextposX < this.originX){//to the left
          this.iniFrame = 4;
          this.endFrame = 7;
          if(this.nextposX >= this.x){
            this.mode = 'idle';
            this.y = this.nextposY;
            this.x = this.nextposX;
            this.frame = 4;
            this.iniFrame = 4;
            this.endFrame = 7;
          }
        } else {//to the right
          //this.scaleX = 1;
          this.iniFrame = 4;
          this.endFrame = 7;
          if(this.nextposX <= this.x){
            this.mode = 'idle';
            this.y = this.nextposY;
            this.x = this.nextposX;
            this.frame = 4;
            this.iniFrame = 4;
            this.endFrame = 7;
          }
        }
        /* 
        if(this.nextposX<0) {this.parentNode.parentNode.batkidGenerator.modeMove = 'asc'; }
        else if(this.nextposX>game.width-this.width) {this.parentNode.parentNode.batkidGenerator.modeMove = 'desc'; } */
      }
      if(this.mode == 'idle'){
        //this.y = this.nextposY;
        this.x = this.nextposX;
        if(this.x<this.moveLeftLimit) {this.parentNode.parentNode.batkidGenerator.modeMove = 'asc'; }
        else if(this.x>this.moveRightLimit) {this.parentNode.parentNode.batkidGenerator.modeMove = 'desc'; }
      }
      if(this.mode == 'fly'){
        //movement
        this.x += this.moveSpeed * Math.cos(this.direction) * evt.elapsed * 0.001;
        this.y += this.moveSpeed * Math.sin(this.direction) * evt.elapsed * 0.001;
        if(this.y >= 220){
          this.mode = 'shoot';
          this.shootTime = 0.3;
          this.bullets = 2;
          if(this.level>=4 || this.difficulty=='hard') this.bullets = getRandom(3,this.level);
          this.moveSpeed = 80;
          this.y = 220;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'shoot'){
        //shoot at player
        this.shootTime-=evt.elapsed * 0.001;
        if(this.bullets>0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+12, this.y+12, this.parentNode.parentNode.rolf, this.level, 'batkid', false);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.parentNode.parentNode.playSound("eshoot");
          this.bullets-=1;
          if(this.bullets<=0){
            this.direction = findAngle(this.x,this.y,this.nextposX,this.originY);
            this.mode = 'retreat';
            this.moveSpeed = 240;
          }else this.shootTime = 0.3;          
        }
      }
      if(this.mode == 'retreat'){
        this.direction = findAngle(this.x,this.y,this.nextposX,this.originY);
        this.x += this.moveSpeed * Math.cos(this.direction) * evt.elapsed * 0.001;
        this.y += this.moveSpeed * Math.sin(this.direction) * evt.elapsed * 0.001;
        if(this.nextposY >= this.y){
          this.mode = 'idle';
          this.y = this.nextposY;
          this.x = this.nextposX;
        }
      }
      
      if(this.gotHitTime>0){
        this.gotHitTime-=evt.elapsed * 0.001;
        if(this.gotHitTime<=0) {
          this.animationDuration = 0;
          this.frame = 4;
          this.iniFrame = 4;
          this.endFrame = 7;
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

var BatkidKilled = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/batkidSheet.png'];
    this.x = x;
    this.y = y;
    this.aboutToDieTime = 0.3;
    this.vulnerableBlinkTime = 0.01; //secs
    
    // 3 - Animate
    this.frame = 8;
    
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

//BatKid Generator
var BatKidGenerator = Class.create(Sprite, {
  // The windows that will create the batkids
  initialize: function(x,y,lvlBatKidEnemyMap,level,difficulty) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/doorgen.png'];      

    //controle vars
    this.x = x;
    this.y = y;
    this.genpoint = -64;
    this.batkids = [];
    this.createBatKidTime = 0;
    this.createBatKidSide = getRandom(0,1); //0=on the same position; 1=on the other side;
    this.sendBatKidTime = 3 + (0.1 * getRandom(1,4));
    this.batkidIdx = 0;
    //this.batkidIdy = 0;
    this.level = level;
    this.difficulty = difficulty;
    
    //movement vars
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'asc'; //asc ou desc
    
    //level map loading
    parsedMap = JSON.parse(JSON.stringify(lvlBatKidEnemyMap));
    if(Object.keys(parsedMap).length>0){
      this.batkidEnemyMap = parsedMap.startAt;
      this.moveLimit = parsedMap.limit;
    }else this.defeated = true;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game = Game.instance;
    if (!this.parentNode.paused && this.modeStart && !this.defeated){
      //console.log(this.parentNode.batkidGroup.childNodes.length);
      if (this.batkidIdx < this.batkidEnemyMap.length){
        this.createBatKidTime -= evt.elapsed * 0.001;
        if (this.createBatKidTime <= 0) {
          //console.log("creating batkid");
          this.y = this.batkidEnemyMap[this.batkidIdx][1];
          var batkid = new BatKidEnemy(this.genpoint+this.createBatKidSide*(game.width+64),this.y,this.batkidIdx,this.level,this.batkids.length,this.moveLimit,this.difficulty);
          this.batkids.push(batkid);
          this.parentNode.batkidGroup.addChild(batkid);
          this.createBatKidTime = 0.167;
          this.createBatKidSide = getRandom(0,1);
          this.batkidIdx+=1;
          if(this.batkidIdx >= this.batkidEnemyMap.length){
            this.readyToFight = true;
            this.parentNode.batsniperGenerator.modeStart = true;
          }
          //console.dir(this.parentNode.batkidGroup);
        }
      }else{
        if(!this.parentNode.gotHit && this.parentNode.batGenerator.bats.length<=9){
          this.sendBatKidTime-=evt.elapsed * 0.001;
          if(this.sendBatKidTime<=0 && this.batkids.length>0){
            var idbatkid = getRandom(1,this.batkids.length) - 1;
            if(this.batkids[idbatkid].mode == 'idle') {
              this.batkids[idbatkid].setTarget();
              this.sendBatKidTime = 3 + (0.1 * getRandom(1,4));
            }
          }
        }
      }
      
      if(this.readyToFight)
      for(var j=0; j<this.batkidEnemyMap.length; j++){
        if(this.modeMove == 'asc') this.batkidEnemyMap[j][0]+=1;
        else if(this.modeMove == 'desc') this.batkidEnemyMap[j][0]-=1;
      }
      
      // if(this.batkidEnemyMap[0][this.moveLeftLimit][0]<=0) this.modeMove = 'asc';
      // else if(this.batkidEnemyMap[0][this.moveRightLimit][0]>=game.width-24) this.modeMove = 'desc';
    }
  },
  
  rearrangeBatKids: function(batkidGenKey) {
    this.batkids.splice(batkidGenKey,1);
    if(this.batkids.length<=0 && this.readyToFight == true) this.defeated = true;
    for(var i=batkidGenKey; i<this.batkids.length; i++){
      this.batkids[i].batkidGenKey-=1;
    }
  },
  
  loadNewLevel: function(lvlBatKidEnemyMap,level) {
    //reseting vars
    this.batkids = [];
    this.createBatKidTime = 0;
    this.sendBatKidTime = 3 + (0.1 * getRandom(1,4));
    this.batkidIdx = 0;
    this.level = level;
    
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'asc';
    
    //loading new map
    parsedMap = JSON.parse(JSON.stringify(lvlBatKidEnemyMap));
    if(Object.keys(parsedMap).length>0){
      this.batkidEnemyMap = parsedMap.startAt;
      this.moveLimit = parsedMap.limit;
    }else this.defeated = true;
  }
});

// Score Sprite
var ScoreSprite = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,scoreval) {
    // Call superclass constructor
    Sprite.apply(this,[24, 12]);
    this.image  = Game.instance.assets['res/scoreSheet.png'];    
    this.frame = 0;
    switch(scoreval){
      case 50: this.frame = 0; break;
      case 100: this.frame = 1; break;
      case 250: this.frame = 2; break;
      case 500: this.frame = 3; break;
      case 1000: this.frame = 4; break;
      default: this.visible=false; break;
    }
    
    this.x = x;
    this.y = y;
    this.yUp = 20;
    this.aboutToDieTime = 60;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  },
    
  update: function(evt) { 
    //this object must be added directly to the scene
    if (!this.parentNode.paused){
      this.aboutToDieTime-=1;
      if(this.yUp>0) {
        this.yUp-=1;
        this.y-=1;
      }
      // if(this.aboutToDieTime%2==0){
        // this.visible=false;
      // }else this.visible=true;
      if(this.aboutToDieTime<=0){
        this.remove();
      }
    }
  }
});

// Melody Sprite
var Melody = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x, y, mode) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/melodySheet.png'];    
    this.scaleX = -1;
    this.mode = mode;
    if(mode == 'distress'){
      this.frame = 2;  
      this.iniFrame = 2;
      this.endFrame = 3;
      this.keepmove = false;
      this.animationSpeed = 0.60;
    }else{
      this.frame = 0;  
      this.iniFrame = 0;
      this.endFrame = 1;
      this.keepmove = true;
      this.animationSpeed = 0.30;
    }
    this.animationDuration = 0;
    this.startTime = 30;
    
    this.x = x;
    this.y = y;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  interact: function(playerObj,hero){
    // this.frame = 3;
    // this.iniFrame = 3;
    // this.endFrame = 3;
    playerObj.addScore(this.parentNode.parentNode.bonusReward,false);
    for (var i = this.parentNode.parentNode.itemGroup.childNodes.length - 1; i >= 0; i--) {
      var item;
      item = this.parentNode.parentNode.itemGroup.childNodes[i];
      item.gotHit(playerObj,hero); //collect all itens
    }
    this.parentNode.parentNode.endLevel = true;
    this.keepmove = false;
    this.endFrame = this.iniFrame;
  },
    
  update: function(evt) { 
    if (!this.parentNode.parentNode.paused){
      // Movement
      if(this.keepmove==true){
        if (this.x > 224) this.x-=1;
        else {
          this.x = 224;
          this.frame = 0;
          this.iniFrame = 0;
          this.endFrame = 0;
        }
      }
      if(this.mode == 'distress'){
        this.startTime-=1;
        if(this.startTime%2==0){
          this.visible=false;
        }else this.visible=true;
        if(this.startTime<=0){
          this.visible = true;
        }
      }
      // Animation    
      this.animationDuration += 0.05;
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
    }
  }
});

//Melody Kidnapped
var MelodyKidnapped = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,level) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/melodySheet.png'];
    this.x = x;
    this.y = y;
    this.scaleX = -1;
    this.frame = 2;
    this.iniFrame = 2;
    this.endFrame = 3;
    this.aboutToDisappear = 30;
    this.disappear = false;
    this.animationSpeed = 0.60;
    this.animationDuration = 0;
    
    if(level!=24) this.visible = false;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) {
    if (!this.parentNode.paused){
      if(this.disappear==true){
        this.aboutToDisappear-=1;
        if(this.aboutToDisappear%2==0){
          this.visible=false;
        }else this.visible=true;
        
        if(this.aboutToDisappear<=0){
          this.parentNode.removeChild(this);
          delete this;
        }
      }

      this.animationDuration += 0.05;
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
    }
  }
});

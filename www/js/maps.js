var globalBatMap = {
  stage1: [    
        [[40,160],[68,160],[96,160],[124,160],[152,160],[180,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        ],
  stage2: [    
        //[[96,160],[124,160],[152,160],[180,160],[208,160]],
        [[40,190],[68,190],[96,190],[124,190],[152,190],[180,190],[208,190],[236,190],[264,190]],
        [[40,214],[68,214],[236,214],[264,214]],
        ],
  stage3: [    
        [[40,160],[68,160],[96,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        [[96,208],[124,208],[152,208],[180,208],[208,208]],
        ],
  stage4: [    
        [[40,160],[68,160],[96,160],[124,160],[152,160],[180,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        ],
  stage5: [    
        [[40,200],[68,200],[96,200],[124,200],[152,200],[180,200],[208,200],[236,200],[264,200]],
        [[40,224],[68,224],[236,224],[264,224]],
        ],
  stage6: [    
        [[96,190],[124,190],[152,190],[180,190],[208,190]],
        [[40,214],[68,214],[96,214],[124,214],[152,214],[180,214],[208,214],[236,214],[264,214]],
        [[40,238],[68,238],[236,238],[264,238]],
        ],
  stage7: [    
        [[96,190],[124,190],[152,190],[180,190],[208,190]],
        [[40,214],[68,214],[96,214],[124,214],[152,214],[180,214],[208,214],[236,214],[264,214]],
        [[40,238],[68,238],[236,238],[264,238]],
        ],
  stage8: [    
        [[40,160],[68,160],[96,160],[124,160],[152,160],[180,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        ],
  stage9: [],
  stage10: [],
  stage11: [],
  stage12: [],
  stage13: [],
  stage14: [],
  stage15: [],
  stage16: [],
  stage17: [],
  stage18: [],
  stage19: [],
  stage20: [],
  stage21: [],
  stage22: [],
  stage23: [],
  stage24: [],
};

var globalBatKidMap = {
  stage1: {
    startAt: [[68,128],[96,128],[124,128],[152,128]],
    limit: [64,256]
  },
  stage2: {
    startAt: [[68,168],[96,168],[180,168],[208,168]],
    limit: [64,256]
  },
  stage3: {
    startAt: [[124,104],[124,128],[152,128],[152,104]],
    limit: [64,256]
  },
  stage4: {
  },
  stage5: {
    startAt: [[68,168],[96,168],[180,168],[208,168]],
    limit: [64,256]
  },
  stage6: {
    startAt: [[32,148],[64,148],[96,148],[128,148],[160,148]],
    limit: [32,224]
  },
  stage7: {
    startAt: [[32,148],[64,148],[96,148],[128,148],[160,148]],
    limit: [32,224]
  },
  stage8: {
  },
  stage9: {
  },
  stage10: {
  },
  stage11: {
  },
  stage12: {
  },
  stage13: {
  },
  stage14: {
  },
  stage15: {
  },
  stage16: {
  },
  stage17: {
  },
  stage18: {
  },
  stage19: {
  },
  stage20: {
  },
  stage21: {
  },
  stage22: {
  },
  stage23: {
  },
  stage24: {
  },
};

var globalBatSniperMap = {
  stage1: {
  },
  stage2: {
    startAt: [[64,64],[224,64]],
    limit: [64,224],
    hideout: [0,0]
  },
  stage3: {
    startAt: [[64,64],[224,64]],
    limit: [16,256],
    hideout: [0,0]
  },
  stage4: {
  },
  stage5: {
    startAt: [[64,96],[224,96]],
    limit: [32,256],
    hideout: [0,0]
  },
  stage6: {
    startAt: [[64,76],[224,76]],
    limit: [32,224],
    hideout: [0,0]
  },
  stage7: {
    startAt: [[64,76],[224,76]],
    limit: [32,224],
    hideout: [0,0]
  },
  stage8: {
  },
  stage9: {
  },
  stage10: {
  },
  stage11: {
  },
  stage12: {
  },
  stage13: {
  },
  stage14: {
  },
  stage15: {
  },
  stage16: {
  },
  stage17: {
  },
  stage18: {
  },
  stage19: {
  },
  stage20: {
  },
  stage21: {
  },
  stage22: {
  },
  stage23: {
  },
  stage24: {
  },
};

var globalBgColor = {
  stage1: '#55AAFF',
  stage2: '#FFFF55',
  stage3: '#FF5555',
  stage4: '#000055',
};

var globalTileMap = {  
  stage1: {
      sheet: 'res/western1Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], //32
        [-1,-1,-1,0,17,17,1,-1,-1,-1],   //64
        [-1,16,18,19,20,17,23,17,21,-1], //96
        [-1,24,26,27,28,25,30,25,29,-1], //128
        [-1,2,9,9,10,12,13,13,3,-1],     //160
        [-1,6,17,23,17,17,22,17,7,-1],   //192
        [-1,6,25,30,25,25,30,25,7,-1],   //224
        [-1,6,17,23,17,17,22,17,7,-1],   //256
        [-1,6,25,30,25,25,30,25,7,-1],   //288
        [-1,45,9,10,11,11,12,13,53,-1],  //320
        [-1,6,23,46,19,19,47,23,7,-1],   //352
        [-1,6,30,54,27,27,55,30,7,-1],   //384 
        [15,38,33,51,35,35,52,31,39,15], //416
        [40,41,41,41,41,41,41,41,41,42], //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50], //480
        [48,49,49,49,49,49,49,49,49,50], //512
        [48,49,49,49,49,49,49,49,49,50], //544
        ],
      boxlayer: [[0,416,1],[96,416,1],[224,416,1],[288,416,1],[64,320,0],[224,320,0],[128,64,3]],
  },
  
  stage2: {
      sheet: 'res/western2Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,-1,-1,0,1,1,2,-1,-1,-1],      //64
        [-1,-1,8,9,12,12,12,12,-1,-1],    //96
        [-1,-1,16,22,17,17,23,21,-1,-1],  //128
        [-1,-1,24,30,25,25,31,29,-1,-1],  //160
        [-1,10,10,9,9,9,12,12,12,-1],     //192
        [-1,16,17,23,17,17,17,23,21,-1],  //224
        [-1,16,17,4,17,17,17,5,21,-1],    //256
        [-1,16,17,23,17,17,17,23,21,-1],  //288
        [-1,16,17,4,17,17,17,5,21,-1],    //320
        [-1,16,17,18,19,19,20,23,21,-1],  //352
        [15,24,25,26,27,27,28,30,29,39],  //384 
        [32,32,32,34,35,35,36,37,37,37],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,1],[224,416,1],[288,416,1],[64,320,2],[224,320,2],[128,96,3]],
  },
  
  stage3: {
      sheet: 'res/western1Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //64
        [16,17,23,17,22,17,23,17,21,-1],  //96
        [16,17,30,17,30,17,30,17,21,-1],  //128
        [2,9,9,9,10,12,13,13,3,-1],      //160
        [6,17,22,17,23,17,23,17,7,-1],    //192
        [6,17,30,17,30,17,30,17,7,-1],    //224
        [45,9,9,9,10,11,12,13,53,-1],     //256
        [6,17,23,17,23,17,23,17,7,15],    //288
        [6,25,30,25,30,25,30,25,7,15],    //320
        [6,17,23,17,18,19,20,17,7,15],    //352
        [6,25,30,25,26,27,28,25,7,15],    //384 
        [38,33,33,33,34,35,36,31,39,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,1],[224,416,1],[288,416,1],[64,64,3]],
  },
  
  stage4: {
      sheet: 'res/western2Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //64
        [-1,-1,0,1,1,1,1,2,-1,-1],        //96
        [-1,-1,16,22,17,17,23,21,-1,-1],  //128
        [-1,-1,24,30,25,25,31,29,-1,-1],  //160
        [-1,8,9,10,10,10,10,9,14,-1],     //192
        [-1,16,17,23,17,17,23,17,21,-1],  //224
        [-1,16,17,5,17,17,4,17,21,-1],  //256
        [-1,16,17,23,17,17,23,17,21,-1],  //288
        [-1,16,17,4,17,17,5,17,21,-1],    //320
        [-1,8,10,9,18,19,20,23,21,-1],    //352
        [-1,24,25,25,26,27,28,30,29,-1],  //384
        [39,32,32,32,34,35,36,37,37,-1],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544 
        ],
      boxlayer: [[0,416,1],[96,416,2],[224,416,2],[288,416,1],[160,320,3]],
  },
  
  stage5: {
      sheet: 'res/western3Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,3,1,1,4,-1,-1,-1],      //32
        [-1,0,1,17,18,19,20,1,2,-1],      //64
        [-1,24,25,25,26,27,28,25,29,-1],  //96
        [-1,8,9,9,10,12,13,13,14,-1],     //128
        [-1,16,22,17,23,23,17,22,21,-1],  //160
        [-1,16,30,17,30,30,17,30,21,-1],  //192
        [-1,16,23,17,22,23,17,22,21,-1],  //224
        [-1,16,30,17,30,30,17,30,21,-1],  //256
        [-1,24,25,25,25,25,25,25,29,-1],  //288
        [8,9,9,10,11,11,12,13,13,14],     //320
        [16,23,23,18,19,19,20,23,23,21],  //352
        [24,31,31,26,27,27,28,31,31,29],  //384
        [32,33,33,34,35,35,36,38,38,38],  //416
        [40,41,41,41,41,41,41,41,41,41],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage6: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage7: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage8: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage9: {
      sheet: 'res/western3Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,3,1,1,4,-1,-1,-1],      //32
        [-1,0,1,17,18,19,20,1,2,-1],      //64
        [-1,24,25,25,26,27,28,25,29,-1],  //96
        [-1,8,9,9,10,12,13,13,14,-1],     //128
        [-1,16,22,17,23,23,17,22,21,-1],  //160
        [-1,16,30,17,30,30,17,30,21,-1],  //192
        [-1,16,23,17,22,23,17,22,21,-1],  //224
        [-1,16,30,17,30,30,17,30,21,-1],  //256
        [-1,24,25,25,25,25,25,25,29,-1],  //288
        [8,9,9,10,11,11,12,13,13,14],     //320
        [16,23,23,18,19,19,20,23,23,21],  //352
        [24,31,31,26,27,27,28,31,31,29],  //384
        [32,33,33,34,35,35,36,38,38,38],  //416
        [40,41,41,41,41,41,41,41,41,41],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage10: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage11: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage12: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,0],[96,416,2],[224,416,0],[288,416,2],[128,160,1],[160,160,1],[128,192,1],[160,192,1]],
  },
  
  stage13: {
      sheet: 'res/western3Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,3,1,1,4,-1,-1,-1],      //32
        [-1,0,1,17,18,19,20,1,2,-1],      //64
        [-1,24,25,25,26,27,28,25,29,-1],  //96
        [-1,8,9,9,10,12,13,13,14,-1],     //128
        [-1,16,22,17,23,23,17,22,21,-1],  //160
        [-1,16,30,17,30,30,17,30,21,-1],  //192
        [-1,16,23,17,22,23,17,22,21,-1],  //224
        [-1,16,30,17,30,30,17,30,21,-1],  //256
        [-1,24,25,25,25,25,25,25,29,-1],  //288
        [8,9,9,10,11,11,12,13,13,14],     //320
        [16,23,23,18,19,19,20,23,23,21],  //352
        [24,31,31,26,27,27,28,31,31,29],  //384
        [32,33,33,34,35,35,36,38,38,38],  //416
        [40,41,41,41,41,41,41,41,41,41],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage14: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage15: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage16: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,256,1],[32,256,1],[64,256,1],[96,256,1],[128,256,1],[160,256,1],[192,256,1],[224,256,1],[256,256,1],[288,256,1]],
  },
  
  stage17: {
      sheet: 'res/western3Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,3,1,1,4,-1,-1,-1],      //32
        [-1,0,1,17,18,19,20,1,2,-1],      //64
        [-1,24,25,25,26,27,28,25,29,-1],  //96
        [-1,8,9,9,10,12,13,13,14,-1],     //128
        [-1,16,22,17,23,23,17,22,21,-1],  //160
        [-1,16,30,17,30,30,17,30,21,-1],  //192
        [-1,16,23,17,22,23,17,22,21,-1],  //224
        [-1,16,30,17,30,30,17,30,21,-1],  //256
        [-1,24,25,25,25,25,25,25,29,-1],  //288
        [8,9,9,10,11,11,12,13,13,14],     //320
        [16,23,23,18,19,19,20,23,23,21],  //352
        [24,31,31,26,27,27,28,31,31,29],  //384
        [32,33,33,34,35,35,36,38,38,38],  //416
        [40,41,41,41,41,41,41,41,41,41],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage18: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage19: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage20: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,224,1],[64,224,1],[96,224,1],[128,224,2],[160,224,2],[192,224,1],[224,224,1],[288,224,1]],
  },
  
  stage21: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage22: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,1],[96,416,0],[224,416,0],[288,416,1]],
  },
  
  stage23: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[128,160,1],[160,160,1],[128,192,1],[160,192,1]],
  },
  
  stage24: {
      sheet: 'res/western4Sheet.png',      
      mainlayer: [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //0
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],  //32
        [-1,6,7,-1,-1,-1,6,7,-1,-1],      //64
        [-1,38,9,9,9,9,9,9,-1,-1],        //96
        [-1,16,17,17,18,19,20,21,-1,-1],  //128
        [-1,38,9,9,9,12,13,39,-1,-1],     //160
        [-1,16,17,23,17,23,17,21,-1,-1],  //192
        [-1,16,17,31,17,31,17,21,-1,-1],  //224
        [-1,16,17,23,17,23,17,21,-1,-1],  //256
        [-1,16,17,31,17,31,17,21,-1,-1],  //288
        [-1,38,9,9,9,9,9,39,-1,-1],       //320
        [-1,46,25,18,19,20,22,47,15,-1],  //352
        [15,46,25,26,27,28,30,47,15,15],  //384
        [15,54,33,34,35,36,53,55,15,15],  //416
        [40,41,41,41,41,41,41,41,41,42],  //448 FLOOR
        [48,49,49,49,49,49,49,49,49,50],  //480
        [48,49,49,49,49,49,49,49,49,50],  //512
        [48,49,49,49,49,49,49,49,49,50],  //544
        ],
      boxlayer: [[0,416,3],],
  },
};
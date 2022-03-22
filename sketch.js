var sTailSize = 1;

var sHeadX = 12;
var sHeadY = 12;
var sHeadPic;

var sTailX = [];
var sTailY = [];

var sVelX = 0;
var sVelY = 0;

var sSpeed = 5; // 1 - 10;
var curFrame = 0;

var updateSnake = false;

var apple = false;
var appleX = 0;
var appleY = 0;
var pagesUnlocked = 0;
var applePic;

var score = 0;
var fail = false;

var pages = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for( var i = 0; i < sTailSize; i++ ) {
    sTailX[i] = sHeadX;
    sTailX[i] = sHeadY;
  }
  
  sSpeed = 10 - sSpeed;
  
  pages = [
    {
      "content" : "I am 27 years old",
      "pos" : [950,70]
    },
    {
      "content" : "I am deaf in one ear",
      "pos" : [700,100]
    },
    {
      "content" : "My favorite color is green",
      "pos" : [880,130]
    },
    {
      "content" : "I'm from Spring Grove, IL, home of the world's largest corn maze",
      "pos" : [730,160]
    },
    {
      "content" : "I have 7 siblings",
      "pos" : [1050,190]
    },
    {
      "content" : "I have a turtle named Turb",
      "pos" : [680,220]
    },
    {
      "content" : "My shoe size is 10 1/2",
      "pos" : [790,250]
    },
    {
      "content" : "I have a girlfriend",
      "pos" : [940,280]
    },
    {
      "content" : "I'm 6'1",
      "pos" : [650,310]
    },
    {
      "content" : "I scuba dive",
      "pos" : [900,330]
    },
    {
      "content" : "I like diet coke",
      "pos" : [740,360]
    },
    {
      "content" : "I can put balls in hoops like it's a job",
      "pos" : [1000,390]
    },
    {
      "content" : "I could eat chipotle for every meal for the rest of my life",
      "pos" : [640,420]
    },
    {
      "content" : "I trust no-one",
      "pos" : [900,450]
    },
    {
      "content" : "I went to Iowa State",
      "pos" : [750,480]
    }
  ];
  
  applePic = createImg('apple.png',"apple");
  applePic.style('width',"19px");
  applePic.style('height',"19px");
  
  sHeadPic = createImg('paul.png',"paul");
  sHeadPic.style('width',"19px");
  sHeadPic.style('height',"19px");
}

function draw() {
  background(200);
  
  curFrame++;
  if(curFrame % sSpeed == 0) {
    updateSnake = true;
  } else {
    updateSnake = false;
  }
  
  //snake grid bg
  fill(255,255,255);
  stroke(0,0,0);
  strokeWeight(2);
  rect(40,40,500,500);
  
  //snake gridlines
  fill(100,100,100);
  noStroke();
  for( var i = 1; i < 25; i++ ) {
    rect( 40+(i*20), 40, 1, 500 );
    rect( 40, 40+(i*20), 500, 1 );
  }
  
  //move snake
  if(updateSnake) {
    checkFail();
  }
  if( updateSnake && !fail ) {
    if( sVelX == -1 && sHeadX == 0 ) {
      fail = true;
    }
    
    var tempTailX = [];
    var tempTailY = [];
    tempTailX[0] = sHeadX;
    tempTailY[0] = sHeadY;
    for( var i = 1; i < sTailSize; i++ ) {
      tempTailX[i] = sTailX[i-1];
      tempTailY[i] = sTailY[i-1];
    }
    sTailX = tempTailX;
    sTailY = tempTailY;
    
    if( (sVelX == 1 && sHeadX < 24) || (sVelX == -1 && sHeadX > 0) ) {
      sHeadX += sVelX;
    }
    if( (sVelY == 1 && sHeadY < 24) || (sVelY == -1 && sHeadY > 0) ) {
      sHeadY += sVelY;
    }
  }
  
  //draw snake
  fill(0,175,0);
  noStroke();
  //rect( 41+(20*sHeadX), 41+(20*sHeadY), 19, 19 );
  sHeadPic.position( 41+(20*sHeadX), 41+(20*sHeadY) );
  for( var i = 0; i < sTailSize; i++ ) {
    rect( 41+(20*sTailX[i]), 41+(20*sTailY[i]), 19, 19 );
  }
  
  //check for apple
  if(apple == false) {
    appleX = floor(random(25));
    appleY = floor(random(25));
    apple = true;
  } else {
    if( appleX == sHeadX & appleY == sHeadY ) {
      sTailSize += 3;
      for( var i = 0; i < 3; i++ ) {
        sTailX[sTailX.length+i] = sTailX[sTailX.length-1];
        sTailY[sTailY.length+i] = sTailY[sTailY.length-1];
      }
      score += 10;
      if(pagesUnlocked*10 < score && pagesUnlocked < pages.length ) {
        pagesUnlocked++;
      }
      apple = false;
    }
  }
  
  //draw apple
  if( apple == true ) {
    fill(255,225,225);
    rect( 41+(20*appleX), 41+(20*appleY), 19, 19 );
    applePic.position(41+(20*appleX),41+(20*appleY));
  }
  
  
  //score
  fill(0,0,0);
  textSize(15);
  text("Score: " + score, 260, 560 );
  
  
  //fail screen
  if(fail) {
    fill(0,0,0);
    stroke(255,255,255);
    strokeWeight(5);
    textSize(100);
    text( "Whoops!", 100, 290 );
    textSize(15);
    text( "(click to reset)", 240, 335 );
  }
  
  //reset
  if( fail && mouseIsPressed && (mouseX > 40 && mouseX < 540) && (mouseY > 40 && mouseY < 540) ) {
    apple = false;
    sTailSize = 1;
    sHeadX = 12;
    sHeadY = 12;
    sVelX = 0;
    sVelY = 0;
    score = 0;
    fail = false;
  }
  
  
  //chalkboard
  fill(50, 120, 80);
  stroke(186, 140, 99);
  strokeWeight(10);
  rect(600,40,750,500);
  noStroke();
  fill(255,255,255);
  rect(700,530,60,5);
  rect(1100,530,30,5);
  rect(1200,530,50,5);
  fill(50,50,50);
  rect(970,515,80,20);
  fill(150,150,150);
  rect(970,512,80,3);

  //info
  stroke(255,255,255)
  strokeWeight(1);
  fill(255,255,255)
  textSize(20);
  if( pagesUnlocked > 0 ) {
    for( var i = 0; i < pagesUnlocked; i++ ) {
      text( pages[i].content, pages[i].pos[0], pages[i].pos[1] );
    }
  }
  
  //instructions
  noStroke();
  fill(0,0,0);
  textSize(40);
  text("Make the teacher eat 15 apples in a row to learn 15 things about Chad", 65, 640 );
  textSize(11);
  text("Use arrow keys to control the teacher", 40, 555);
}

function checkFail() {
  if( (sHeadX == 0 && sVelX == -1) || (sHeadX == 24 && sVelX == 1) || (sHeadY == 0 && sVelY == -1) || (sHeadY == 24 && sVelY == 1) ) {
    fail = true;
  }
  
  for(var i = 1; i < sTailSize; i++ ) {
    if( sHeadX == sTailX[i] && sHeadY == sTailY[i] ) {
      fail = true;
    }
  }
}


function keyPressed() {
  if (keyCode === LEFT_ARROW && sVelX != 1) {
    sVelX = -1;
    sVelY = 0;
  } else if (keyCode === RIGHT_ARROW && sVelX != -1) {
    sVelX = 1;
    sVelY = 0;
  } else if (keyCode === UP_ARROW && sVelY != 1) {
    sVelY = -1;
    sVelX = 0;
  } else if (keyCode === DOWN_ARROW && sVelY != -1) {
    sVelY = 1;
    sVelX = 0;
  }
}

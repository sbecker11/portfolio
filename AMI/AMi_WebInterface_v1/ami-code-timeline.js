// JavaScript Document
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_timelineStop(tmLnName) { //v1.2
  //Copyright 1997, 2000 Macromedia, Inc. All rights reserved.
  if (document.MM_Time == null) MM_initTimelines(); //if *very* 1st time
  if (tmLnName == null)  //stop all
    for (var i=0; i<document.MM_Time.length; i++) document.MM_Time[i].ID = null;
  else document.MM_Time[tmLnName].ID = null; //stop one
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_timelineGoto(tmLnName, fNew, numGotos) { //v2.0
  //Copyright 1997, 2000 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,lastKeyFr,propNum,theObj;
  if (document.MM_Time == null) MM_initTimelines(); //if *very* 1st time
  tmLn = document.MM_Time[tmLnName];
  if (numGotos != null)
    if (tmLn.gotoCount == null) tmLn.gotoCount = 1;
    else if (tmLn.gotoCount++ >= numGotos) {tmLn.gotoCount=0; return}
  jmpFwd = (fNew > tmLn.curFrame);
  for (i = 0; i < tmLn.length; i++) {
    sprite = (jmpFwd)? tmLn[i] : tmLn[(tmLn.length-1)-i]; //count bkwds if jumping back
    if (sprite.charAt(0) == "s") {
      numKeyFr = sprite.keyFrames.length;
      firstKeyFr = sprite.keyFrames[0];
      lastKeyFr = sprite.keyFrames[numKeyFr - 1];
      if ((jmpFwd && fNew<firstKeyFr) || (!jmpFwd && lastKeyFr<fNew)) continue; //skip if untouchd
      for (keyFrm=1; keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]; keyFrm++);
      for (j=0; j<sprite.values.length; j++) {
        props = sprite.values[j];
        if (numKeyFr == props.length) propNum = keyFrm-1 //keyframes only
        else propNum = Math.min(Math.max(0,fNew-firstKeyFr),props.length-1); //or keep in legal range
        if (sprite.obj != null) {
          if (props.prop2 == null) sprite.obj[props.prop] = props[propNum];
          else        sprite.obj[props.prop2][props.prop] = props[propNum];
      } }
    } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
  }
  tmLn.curFrame = fNew;
  if (tmLn.ID == 0) eval('MM_timelinePlay(tmLnName)');
}

function MM_timelinePlay(tmLnName, myID) { //v1.2
  //Copyright 1997, 2000 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,propNum,theObj,firstTime=false;
  if (document.MM_Time == null) MM_initTimelines(); //if *very* 1st time
  tmLn = document.MM_Time[tmLnName];
  if (myID == null) { myID = ++tmLn.ID; firstTime=true;}//if new call, incr ID
  if (myID == tmLn.ID) { //if Im newest
    setTimeout('MM_timelinePlay("'+tmLnName+'",'+myID+')',tmLn.delay);
    fNew = ++tmLn.curFrame;
    for (i=0; i<tmLn.length; i++) {
      sprite = tmLn[i];
      if (sprite.charAt(0) == 's') {
        if (sprite.obj) {
          numKeyFr = sprite.keyFrames.length; firstKeyFr = sprite.keyFrames[0];
          if (fNew >= firstKeyFr && fNew <= sprite.keyFrames[numKeyFr-1]) {//in range
            keyFrm=1;
            for (j=0; j<sprite.values.length; j++) {
              props = sprite.values[j]; 
              if (numKeyFr != props.length) {
                if (props.prop2 == null) sprite.obj[props.prop] = props[fNew-firstKeyFr];
                else        sprite.obj[props.prop2][props.prop] = props[fNew-firstKeyFr];
              } else {
                while (keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]) keyFrm++;
                if (firstTime || fNew==sprite.keyFrames[keyFrm-1]) {
                  if (props.prop2 == null) sprite.obj[props.prop] = props[keyFrm-1];
                  else        sprite.obj[props.prop2][props.prop] = props[keyFrm-1];
        } } } } }
      } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
      if (fNew > tmLn.lastFrame) tmLn.ID = 0;
  } }
}

function MM_initTimelines() { //v4.0
    //MM_initTimelines() Copyright 1997 Macromedia, Inc. All rights reserved.
    var ns = navigator.appName == "Netscape";
    var ns4 = (ns && parseInt(navigator.appVersion) == 4);
    var ns5 = (ns && parseInt(navigator.appVersion) > 4);
    document.MM_Time = new Array(1);
    document.MM_Time[0] = new Array(5);
    document.MM_Time["TL-Reports"] = document.MM_Time[0];
    document.MM_Time[0].MM_Name = "TL-Reports";
    document.MM_Time[0].fps = 15;
    document.MM_Time[0][0] = new String("behavior");
    document.MM_Time[0][0].frame = 1;
    document.MM_Time[0][0].value = "MM_timelineStop('TL-Reports')";
    document.MM_Time[0][1] = new String("behavior");
    document.MM_Time[0][1].frame = 2;
    document.MM_Time[0][1].value = "MM_timelineStop('TL-Reports')";
    document.MM_Time[0][2] = new String("behavior");
    document.MM_Time[0][2].frame = 24;
    document.MM_Time[0][2].value = "MM_showHideLayers('ReportsDropdown','','hide')";
    document.MM_Time[0][3] = new String("behavior");
    document.MM_Time[0][3].frame = 25;
    document.MM_Time[0][3].value = "MM_timelineGoto('TL-Reports','1')";
    document.MM_Time[0][4] = new String("sprite");
    document.MM_Time[0][4].slot = 1;
    if (ns4)
        document.MM_Time[0][4].obj = document["ReportsDropdown"];
    else if (ns5)
        document.MM_Time[0][4].obj = document.getElementById("ReportsDropdown");
    else
        document.MM_Time[0][4].obj = document.all ? document.all["ReportsDropdown"] : null;
    document.MM_Time[0][4].keyFrames = new Array(1, 2, 22, 23);
    document.MM_Time[0][4].values = new Array(2);
    document.MM_Time[0][4].values[0] = new Array("hidden","visible","visible","hidden");
    document.MM_Time[0][4].values[0].prop = "visibility";
    if (!ns4)
        document.MM_Time[0][4].values[0].prop2 = "style";
    if (ns5)
        document.MM_Time[0][4].values[1] = new Array("104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px", "104px");
    else
        document.MM_Time[0][4].values[1] = new Array(104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104);
    document.MM_Time[0][4].values[1].prop = "height";
    if (!ns4)
        document.MM_Time[0][4].values[1].prop2 = "style";
    document.MM_Time[0].lastFrame = 25;
    for (i=0; i<document.MM_Time.length; i++) {
        document.MM_Time[i].ID = null;
        document.MM_Time[i].curFrame = 0;
        document.MM_Time[i].delay = 1000/document.MM_Time[i].fps;
    }
}
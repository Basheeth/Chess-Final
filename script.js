  // Creating the board
  let array = ["a", "b", "c", "d", "e", "f", "g", "h"];// first index of the div
  let board = document.getElementById("board");
  init();

  //Appending white and black div in the board and creating the coin in suitable div
  let c ="";
  function init(){
  for (let i = 1; i <= 8; i++) {
    for (let j = 0; j < 8; j++) {
      let box = document.createElement("div");
      board.appendChild(box);
      box.setAttribute("id", array[j] + i);
      if (i < 3 || i > 6) {
        let para = document.createElement("paragraph");
        para.setAttribute("draggable", "true");
        box.append(para);
        para.addEventListener("dragstart", dragStart);
        para.addEventListener("dragend", dragEnd);

        //Add id & class to the div
        //insert coins in the div
        //Add suitable class to the coins
        if (i == 2) {
          para.innerText = "\u{2659}";

          para.classList.add("whitePawn");
          box.classList.add("whitePawn", "White");
        }
        if (i == 7) {
          para.innerText = "\u{265F}";
          para.classList.add("blackPawn" );
          box.classList.add("blackPawn" , "Black");
        }
        if (i == 1) {
          if (j == 0 || j == 7) {
            para.innerText = "\u{2656}";
            para.classList.add("elephantWhite");
            box.classList.add("elephantWhite", "White");
          }
          if (j == 1 || j == 6) {
            para.innerText = "\u{2658}";
            para.classList.add("horseWhite");
            box.classList.add("horseWhite", "White");
          }
          if (j == 2 || j == 5) {
            para.innerText = "\u{2657}";
            para.classList.add("BishopWhite");
            box.classList.add("BishopWhite", "White");
          }
          if (j == 3) {
            para.innerText = "\u{2655}";
            para.classList.add("queenWhite");
            box.classList.add("queenWhite", "White");
          }
          if (j == 4) {
            para.innerText = "\u{2654}";
            para.classList.add("kingWhite");
            box.classList.add("kingWhite", "White");
          }
        }
        if (i == 8) {
          if (j == 0 || j == 7) {
            para.innerText = "\u{265C}";
            para.classList.add("elephantBlack");
            box.classList.add("elephantBlack", "Black");

          }
          if (j == 1 || j == 6) {
            para.innerText = "\u{265E}";
            para.classList.add("horseBlack");
            box.classList.add("horseBlack", "Black");
          }
          if (j == 2 || j == 5) {
            para.innerText = "\u{265D}";
            para.classList.add("BishopBlack");
            box.classList.add("BishopBlack", "Black");
          }
          if (j == 3) {
            para.innerText = "\u{265B}";
            para.classList.add("queenBlack");
            box.classList.add("queenBlack", "Black");
          }
          if (j == 4) {
            para.innerText = "\u{265A}";
            para.classList.add("kingBlack");
            box.classList.add("kingBlack", "Black");
          }
        }

      }

      if (i % 2 == 0) {
        box.classList.add("box");
      }
      else {
        box.classList.add("box1");
      }
      box.addEventListener("dragover", dragOver);
      box.addEventListener("drop", drop);
    }
  }
  }


  let a;
  let same;  // movable coin type
  let different;   // opponent coin type
  let turn = 0 ;
  let indexOne;  //first piece of the variable
  let indexTwo;  //second piece of the variable
  let divId = "";
  let BlackPosition = "e8";     //Position of the black king
  let WhitePosition = "e1";     //Position of the white king
  let functioncheck = 0;



  //  runs when the element starts to drag
  //  call the fuction clear and whereTODrop

  function dragStart(){
    undo();
    setTimeout(() => this.style.visibility = "hidden", 1);
    //To hide the item , when dragged
    
    parentDiv = this.parentElement;//Parent element of the dragged item
    dragItem = this; //the item which is dragged
    dragItemClass = this.className;//class name of the dragged item
    a = parentDiv.id.split("");
    indexOne = array.indexOf(a[0]);
    indexTwo = Number(a[1]);
    divId = dragItem;

    clear();//function to initialise the value
    if (parentDiv.className.includes("White")) {
      different = "Black";
      same = "White";
      if (turn == 0) {
        whereToDrop(dragItemClass[0]);//to call function ,eg : pawn()
      }
    }
    if (parentDiv.className.includes("Black")) {
      different = "White";
      same = "Black";
      if (turn == 1) {
        whereToDrop(dragItemClass[0]);//to call function ,eg : pawn()
      }
    }
  }

  // change the style at the end of the drag

  function dragEnd(){
    this.style.visibility = "visible", 0;
    //To show the item ,When it is dropped
  }


  // runs when the element is dropped
  // clear all the reusable variables
  // delete the element if it eliminated

  function drop(){
    console.log(overAllChances);
    console.log(kingChances);
    console.log(eliminateChances);
    let tellWin = 0;
    let s = this.className;
    if (s.includes(dragItemClass) && (s.includes("hover") || s.includes("eliminate") || s.includes("casing"))){
      this.appendChild(dragItem);
      if (this.className.includes("casing")){
        this.classList.remove("casing");
        if (this.id == "g1"){
          rightWhiteCasling();
        }
        else if (this.id == "b1"){
          leftWhiteCasling();
        }
        else if (this.id == "g8"){
          rightBlackCasling();
        }
        else if (this.id == "b8"){
          leftBlackCasling();
        }
        caslingArray = [];
        undo();
      }
      if (this.id == parentDiv.id){
        undo();
        caslingArray = [];
      }
      else{
        turn == 0?turn = 1:turn = 0;
        overAllChances = overAllChances.filter(ID => ID != this.id);
        eliminateChances = eliminateChances.filter(ID => ID != this.id);
        parentDiv.classList.remove(dragItemClass, same);
        if (document.getElementById(this.id).className.includes("eliminateSymbol")){
          this.classList.remove("eliminateSymbol", different, this.firstChild.className) ;
          let unicode = this.innerText;
          this.removeChild(this.firstElementChild);
          outBox(unicode,same);
        }
        else{
          this.classList.remove("hover");
        }
          defend = [];
          attack = [];
          check = 0;
          lockForward = [];
          lockLeftward = [];
          lockSideward = [];
          lockRightward = [];
          undo();
          checkmate = 0;
          checkMate();
          if (check == 1 && checkmate == 1){
            let div = this.id.split("");
            let b = setKing(array.indexOf(div[0]),Number(div[1]));
            if ( b == 28){
              console.log(defend);
              for (let  i of defend){
                  console.log(i);
                div = i.split("");
                functioncheck = 1;
                b = setKing(array.indexOf(div[0]),Number(div[1]));
                functioncheck = 0;
                if ( b == 28){
                  console.log("winnninsa");
                  b = pawnCheckMateCheck(array.indexOf(div[0]),Number(div[1]));
                  if (b == 1){
                      tellWin++;
                      break;
                  }
                }
                else{
                  tellWin++;
                  break;
                }
            }
            if (tellWin == 0){
            if (same == "White"){
              alert(different + " Won");
            }
            else if (same == "Black"){
              alert(same + " Won");
            }
            }
          } 
          }
      }
    }
    if (this.className.includes("kingWhite")){
      WhitePosition = this.id;
    }
    if (this.className.includes("kingBlack")){
      BlackPosition = this.id;
    }
    undo();
    clear();
    tellTurn();
    upcasting(this);
  }

  // shows the eliminated coin in the left and right side of the screen

  function outBox(unicode,same){
    let uniCodeArray = ["\u{2659}","\u{265F}","\u{2655}","\u{2656}","\u{2657}","\u{2658}","\u{2654}","\u{265A}","\u{265B}","\u{265C}","\u{265D}","\u{265E}"];
    for (let i of uniCodeArray){
    if (i.match(unicode)){
      if (same == "Black"){
      designWhite.innerHTML += i;
    }
    else{
      designBlack.innerHTML += i;
    }
    }
    }
  }

    function pawnCheckMateCheck(x,y){
      if (same == "White"){
        let doc = document.getElementById(array[x]+(y+1));
        if (doc.className.includes("blackPawn")){
          return 1;
        }
      }
      else if (same == "Black"){
        let doc = document.getElementById(array[x]+(y-1));
        if (doc.className.includes("whitePawn")){
            return 1;
        }
      }
    }

  function rightWhiteCasling(){
    let doc = document.getElementById("h1");
    doc.classList.remove("White","elephantWhite");
    let element = doc.firstChild;
    doc = document.getElementById("f1");
    doc.classList.add("elephantWhite","White");
    doc.appendChild(element);
    firstMoveWhite = 1;
  }


  function leftWhiteCasling(){
    let doc = document.getElementById("a1");
    doc.classList.remove("White","elephantWhite");
    let element = doc.firstChild;
    doc = document.getElementById("c1");
    doc.classList.add("elephantWhite","White");
    doc.appendChild(element);
    firstMoveWhite = 1;
  }


  function rightBlackCasling(){
    let doc = document.getElementById("h8");
    doc.classList.remove("Black","elephantBlack");
    let element = doc.firstChild;
    doc = document.getElementById("f8");
    doc.classList.add("elephantBlack","Black");
    doc.appendChild(element);
    firstMoveBlack = 1;
  }


  function leftBlackCasling(){
    let doc = document.getElementById("a8");
    doc.classList.remove("Black","elephantBlack");
    let element = doc.firstChild;
    doc = document.getElementById("c8");
    doc.classList.add("elephantBlack","Black");
    doc.appendChild(element);
    firstMoveBlack = 1;
  }

  //used to initialize the reusable arrays

  function clear() {
    forward = [];
    eliminateChances = [];
    overAllChances =[];
    backward = [];
    rightSide = [];
    leftSide = [];
    upRightCross = [];
    upLeftCross =[];
    downRightCross = [];
    downLeftCross = [];
    horseChances = [];
    kingChances = [];
  }


  let caslingArray = [];

  function undo(){
    for (let i of overAllChances){
      var doc = document.getElementById(i);
      doc.classList.remove("hover", dragItemClass, same);
    }
    for (let j of eliminateChances){
      var doc = document.getElementById(j);
      doc.classList.remove("eliminateSymbol", dragItemClass,same);
    }
    for (let k of caslingArray){
      let doc =document.getElementById(k);
      doc.classList.remove("casing","king"+same,same);
    }
  }

  function dragOver(){
    event.preventDefault();
  }

  // identify the element and call the correct function

  function whereToDrop(a) {
    if (a == "w") {
      pawnWhite();
    }
    if (a == "b") {
      pawnBlack();
    }
    if (a == "e") {
      elephant();
    }
    if (a == "h") {
      horse(); 
    }
    if (a == "B") {
      bishop();
    }
    if (a == "q") {
      queen();
    }
    if (a == "k") {
      king(1);
    }
  }


  //variables
  let forward = [];      
  let overAllChances =[];
  let differentMove = [];


  // code to run  white pawn
  // identify moving and eliminate chances of white pawn

  function pawnWhite(){
    let x = indexOne;
    let y = indexTwo;
    if (y != 8 ){
      let doc = document.getElementById(array[x]+(y+1));
  !doc.className.includes("Black")?!doc.className.includes("White")?forward.push(doc.id):null:null;
      if (y == 2){
        if (!doc.className.includes("Black") && !doc.className.includes("White")){
        doc = document.getElementById(array[x]+(y+2));    
  !doc.className.includes("Black")?!doc.className.includes("White")?forward.push(doc.id):null:null;
        }
      }
      if (!lockSideward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(forward);///add class name of the item to drop in it
      }
      if (x != 7){
        doc = document.getElementById(array[x+1]+(y+1));
        doc.className.includes(different)?eliminateChances.push(doc.id):null;
      }
      if (x != 0 ){
        doc = document.getElementById(array[x-1]+(y+1));
        doc.className.includes(different)?eliminateChances.push(doc.id):null;
      }
      if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addEliminateClass();
      }
    }
  }

  var backward = [];

  // code to run black pawn
  // identify moving and eliminate chances of black pawn

  function pawnBlack(){
    let x = indexOne;
    let y = indexTwo;
    if (y != 0 ){
      let doc = document.getElementById(array[x]+(y-1));
  !doc.className.includes("Black")?!doc.className.includes("White")?backward.push(doc.id):null:null;
      if (y == 7){
        if (!doc.className.includes("Black") && !doc.className.includes("White")){
        doc = document.getElementById(array[x]+(y-2));    
  !doc.className.includes("Black")?!doc.className.includes("White")?backward.push(doc.id):null:null;
      }
      }
      if (!lockSideward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(backward);///add class name of the item to drop in it
      }
      if (x != 7){
        doc = document.getElementById(array[x+1]+(y-1));
        doc.className.includes(different)?eliminateChances.push(doc.id):null;
      }
      if (x != 0 ){
        doc = document.getElementById(array[x-1]+(y-1));
        doc.className.includes(different)?eliminateChances.push(doc.id):null;
      }
      if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addEliminateClass();
      }
    }
  }



  // code to run elephant 

  let rightSide = [];  // stores the rightward movements
  let leftSide = [];   // stores the leftward movements

  // calculate moves of the elepahant and elimination
  function elephant(){
    let x = indexOne;
    let y = indexTwo;
    if (y != 8){
    for (let i = y+1 ; i < 9; i++){                             //calculate forward moves
      let doc = document.getElementById(array[x]+i);
      var b = set(forward,doc);''
      if (b == 1) {
        if (lockSideward.includes(array[x]+y)){
          eliminateChances.pop();  
        }
      break;
      }
      if ( b == 2){                                             // if it has no moves break the loop
        break;
      }
    }
    if (!lockSideward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(forward);
    }
    }
    if (y != 1){                         
    for (let i = y-1 ; i > 0; i--){                             // calculate backward moves
        let doc = document.getElementById(array[x]+i); 
        var b = set(backward,doc);
        if (b == 1) {
          if (lockSideward.includes(array[x]+y)){
            eliminateChances.pop();
          }
        break;
        }
        if ( b == 2){
          break;
        }
    }
    if (!lockSideward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(backward);
    }
    }
    if (x != 7){
    for (let i = x+1 ; i < 8; i++){                               // calculate rightside moves
        let doc = document.getElementById(array[i]+y);
        var b = set(rightSide,doc);
        if (b == 1){
          if (lockForward.includes(array[x]+y)){
            eliminateChances.pop();
          }
          break;
        }
        if ( b == 2){
          break;
        }
    }
    if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(rightSide);
    }
    }
    if (x != 0){
    for (let i = x-1 ; i >= 0; i--){                              // calculate leftside moves
        let doc = document.getElementById(array[i]+y);
        let b = set(leftSide,doc);
        if (b == 1){
          if (lockForward.includes(array[x]+y)){
            eliminateChances.pop();
          }
          break;
        }
        if ( b == 2){
          break;
        }
    }
    if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
      addClassName(leftSide);
    }  
    }
    if (!lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
        addEliminateClass(); 
    }
    else{
      eliminateChances = [];
    }
    
  }


  function set(h,doc) {                    // A function used to calculate normal moves and eliminate moves
    if (doc.className.includes(same)){     // It is called by other function multiple times
        return 2;                          
    }
    else{
      if (doc.className.includes(different)){
        eliminateChances.push(doc.id);
        return 1;
        }
        else{
        h.push(doc.id);
        }
    }
  }


  let upRightCross = [];
  let downLeftCross =[];
  let downRightCross =[];
  let upLeftCross =[];

  // code to run bishop
  // calculate the moves of the bishop

  function bishop(){
    let x = indexOne;
    let y = indexTwo;
    let g = y;
    for (let i = x+1 ; i <= 7 && g != 8 ; i++ ){//Right up side movement
      g++;
      let doc =document.getElementById(array[i]+g);
      let b = set(upRightCross,doc);
      if ( b == 1) {
        if (lockLeftward.includes(array[x]+y)){
          eliminateChances.pop();
        }
        break;
      }
      if ( b == 2){
        break;
      }
    }
    if (!lockForward.includes(array[x]+y) && !lockSideward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
    addClassName(upRightCross);
    }
    g = y;
    for (let i = x-1; i >= 0 && g != 1; i--) {// Left down side movement
      g--;
      let doc =document.getElementById(array[i]+g);
      let b = set(downLeftCross,doc);
      if ( b == 1) {
        if (lockLeftward.includes(array[x]+y)){
          eliminateChances.pop();
        }
        break;
      }
      if ( b == 2){
        break;
      }
    }
    if (!lockForward.includes(array[x]+y) && !lockSideward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y)){
    addClassName(downLeftCross);
    }
    g = y;
    for (let i = x+1 ; i <= 7 && g !=1 ; i++){//  Right down side movement
      g--;
      let doc =document.getElementById(array[i]+g);
      let b = set(downRightCross,doc);
      if ( b == 1){
        if (lockRightward.includes(array[x]+y)){
          eliminateChances.pop();
        }
        break;
      }
      if ( b == 2){
        break;
      }
    }
    if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockSideward.includes(array[x]+y)){
    addClassName(downRightCross);
    }
    g = y;
    for (let i = x-1 ; i >= 0 && g != 8 ; i-- ){// Left up side movement
      g++;
      let doc =document.getElementById(array[i]+g);
      let b = set(upLeftCross,doc);
      if ( b == 1){
        if (lockRightward.includes(array[x]+y)){
          eliminateChances.pop();
        }
        break;
      }
      if ( b == 2){
        break;
      }
    }
    if (!lockForward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockSideward.includes(array[x]+y)){
    addClassName(upLeftCross);
    }
    if (!lockForward.includes(array[x]+y) && !lockSideward.includes(array[x]+y)){
      addEliminateClass();
      }
      
  }


  // code to run queen
  // calls the elephant and queen function

  function queen(){
    elephant();
    bishop();
  }

  let horseChances= [];

  // code to run horse
  //calculate the horse moves

  function horse(){
    let x = indexOne;
    let y = indexTwo;
    let doc;
    if (x < 6 && y < 8){//Right Uside 
      doc = document.getElementById(array[x+2]+(y+1));
      set(horseChances,doc);
    }
    if (x < 7 && y < 7){//Right up
      doc = document.getElementById(array[x+1]+(y+2)); 
      set(horseChances,doc);
    }
    if (x > 1 && y < 8){//Left Uside
      doc = document.getElementById(array[x-2]+(y+1));
      set(horseChances,doc);
    }
    if (x > 0 && y < 7){//Left up
      doc = document.getElementById(array[x-1]+(y+2));
      set(horseChances,doc);
    }
    if (x > 1 && y > 1){//Left Dside
      doc = document.getElementById(array[x-2]+(y-1));
      set(horseChances,doc);
    }
    if (x > 0 && y > 2){//Left down
      doc = document.getElementById(array[x-1]+(y-2));
      set(horseChances,doc);
    }
    if (x < 6 && y > 1){//Right Dside
      doc = document.getElementById(array[x+2]+(y-1));
      set(horseChances,doc);
    }
    if (x < 7 && y > 2){//Right down
      doc = document.getElementById(array[x+1]+(y-2));
      set(horseChances,doc);
    }
    if (!lockSideward.includes(array[x]+y) && !lockRightward.includes(array[x]+y) && !lockLeftward.includes(array[x]+y) && !lockForward.includes(array[x]+y)){
    addClassName(horseChances);
    }
    addEliminateClass();
  }


  // add class to moving places

  function addClassName(arr){
    if (check == 1 && !dragItemClass.includes("king"+same)){
      addCheckClassName(arr);
      return;
    }
    for (let i of arr){
      document.getElementById(i).classList.add("hover", dragItemClass, same);
      overAllChances.push(i);
    }
  }


  function addCheckClassName(arr){
      let ar = [];
      for (let i of defend){
        if (arr.includes(i)){
          ar.push(i);
        }
      }
      for (let j of ar){
        document.getElementById(j).classList.add("hover", dragItemClass, same);
        overAllChances.push(j);
      }
  }



  function addCheckEliminateClass(){
    let arr = [];
    for (let i of attack){
        if (eliminateChances.includes(i)){
          arr.push(i);
        }
    }
    for (let j of arr){
        document.getElementById(j).classList.add("eliminateSymbol", dragItemClass , same);
    } 
  }


  let eliminateChances = [];

  // add class to eliminate places
  
  function addEliminateClass(){
    if (check == 1){
      addCheckEliminateClass();
      return;
    }
    for (let i of eliminateChances){
      document.getElementById(i).classList.add("eliminateSymbol", dragItemClass , same);
    }
  }

  let kingChances = [];

  // code to run king
  // calculate the king moves

  let firstMoveWhite = 0;
  let firstMoveBlack = 0;
  function king(ready){
    let x = indexOne;
    let y = indexTwo;
    let doc =""; 
    if(ready == 1){
      if (same == "White"){
      if (firstMoveWhite == 0){
          casingWhite();
      }
      }
      else if (same == "Black"){
      if (firstMoveBlack == 0){
          casingBlack();
      }
      }
    }
    if (y != 8 ){
      doc = document.getElementById(array[x]+(y+1));
      setKing(x,(y+1));
      if (x != 7){
        doc = document.getElementById(array[x+1]+(y+1));
        setKing((x+1),(y+1));
      }
      if (x != 0){
        doc = document.getElementById(array[x-1]+(y+1));
          setKing((x-1),(y+1));
      }
    }
    if (y != 1){
      doc = document.getElementById(array[x]+(y-1)); 
      setKing(x,(y-1));
      if (x != 0){
        doc = document.getElementById(array[x-1]+(y-1));
        setKing((x-1),(y-1));
      }
      if (x != 7){
        doc = document.getElementById(array[x+1]+(y-1));
        setKing((x+1),(y-1));
      }
    }
    if (x != 7){
      doc = document.getElementById(array[x+1]+y);
      setKing((x+1),y);
    }
    if (x != 0){
      doc = document.getElementById(array[x-1]+y);
      setKing((x-1),y);console.log("run");
    }
    if (ready == 1){
    addClassName(kingChances);
    addEliminateClass();
    }
  }

  function casingWhite(){
    let array1 = ["f1","g1"];
    let b = casingFunction(array1);
    if (b == 1){
      if (document.getElementById("h1").className.includes("elephant"+same)){
      document.getElementById("g1").classList.add("kingWhite","casing","White");
      caslingArray.push("g1");
      }
    }
    array1 = ["b1","c1","d1"];
    b = casingFunction(array1);
    if ( b == 1){
      if (document.getElementById("a1").className.includes("elephant"+same)){
      document.getElementById("b1").classList.add("kingWhite","casing","White");
      caslingArray.push("b1");
      }
    }
  }

  let casingKing = "";
  function casingFunction(array){
    for (let i of array){
      doc = document.getElementById(i);
      if (doc.className.includes("White") || doc.className.includes("Black")){
        return 0 ;
      }
    }
    return 1;
  }



  function casingBlack(){
    let array1 = ["f8","g8"];
    let b = casingFunction(array1);
    if (b == 1){
      if (document.getElementById("h8").className.includes("elephant"+same)){
      document.getElementById("g8").classList.add("kingBlack","casing","Black");
      caslingArray.push("g8");
      }
    }
    array1 = ["b8","c8","d8"];
    b = casingFunctionB(array1);
    if ( b == 1){
      if (document.getElementById("a8").className.includes("elephant"+same)){
      document.getElementById("b8").classList.add("kingBlack","casing","Black");
      caslingArray.push("b8");
      }
    }
  }

  function casingFunctionB(array){
    for (let i of array){
      doc = document.getElementById(i);
      if (doc.className.includes("Black") || doc.className.includes("Black")){
        return 0 ;
      }
    }
    return 1;
  }



  // It is a function called by other functions several times 
  // check the king is in check or not 

  function setKing(x,y){
    let doc ;
    let b ;
    let g ;
    let u = 0;
    let count = 0;
    let h = "";
    if (functioncheck != 1){
    if (same == "White"){
      b = whitePawnCheck(x,y);
      if ( b == 1){
        return;
      }
    }
    else if (same == "Black"){
      b = blackPawnCheck(x,y);
      if ( b == 1 ){
        return;
      }
    }
    }
    possibleMove = [];
    for (let i = y+1 ; i < 9; i++){//forward
      doc = document.getElementById(array[x]+i);
      b = rook(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1){
          break;
        }
      }
      else if (b == 2){
        if (count == 0){
          mateCoin.push(doc.id);
          return;
        }
        if (count == 1){
          lockForward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    for (let i = y-1 ; i > 0 ; i--){//backward
      doc = document.getElementById(array[x]+i);
      b = rook(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1){
          break;
        }
      }
      else if (b == 2){
        if (count == 0){
          mateCoin.push(doc.id);
          return;
        }
        if (count == 1){
          lockForward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    for (let i = x+1 ; i < 8 ; i++){//rightside
      doc = document.getElementById(array[i]+y);
      b = rook(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if(count > 1){
        break;
        }
      }
      else if (b == 2){
        if (count == 0){
        mateCoin.push(doc.id);
        return;
        }
        if (count == 1){
          lockSideward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    for (let i = x-1 ; i >= 0 ; i--){//leftside
      doc = document.getElementById(array[i]+y);
      b = rook(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1){
          break;
        }
      }
      else if (b == 2){
        if (count == 0){
          mateCoin.push(doc.id);
          return;
        }
        if (count == 1){
          lockSideward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    g = y;
    for (let i = x+1 ; i <= 7 && g != 8 ; i++ ){//right up cross
      g++;
      doc = document.getElementById(array[i]+g);
      b = mandiri(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1)
        break;
      }
      else if (b == 2){
        if (count == 0){
        mateCoin.push(doc.id);
        return;
        }
        if (count == 1){
          lockRightward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    g = y;
    for (let i = x+1 ; i <= 7 && g !=1 ; i++){//right down cross
      g--;
      doc = document.getElementById(array[i]+g);
      b = mandiri(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1)
        break;
      }
      else if (b == 2){
        if (count == 0){
        mateCoin.push(doc.id);
        return;
        }
        if (count == 1){
          lockLeftward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    g = y;
    for (let i = x-1 ; i >= 0 && g != 8 ; i-- ){//left up cross
      g++;
      doc = document.getElementById(array[i]+g);
      b = mandiri(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1)
        break;
      }
      else if (b == 2){
        if (count == 0){
        mateCoin.push(doc.id);
        return;
        }
        if (count == 1){
          lockLeftward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    count = 0;
    g = y;
    for (let i = x-1; i >= 0 && g != 1; i--){//left down cross
      g--;
      doc = document.getElementById(array[i]+g);
      b = mandiri(doc);
      if (b == 1){
        count++;
        h = doc.id;
        if (count > 1)
        break;
      }
      else if (b == 2){
        if (count == 0){
        mateCoin.push(doc.id);
        return;
        }
        if (count == 1){
          lockRightward.push(h);
          break;
        }
      }
      else if (b == 3){
        continue;
      }
      possibleMove.push(doc.id);
    }
    possibleMove = [];
    if (x < 6 && y < 8){//Right Uside 
      doc = document.getElementById(array[x+2]+(y+1));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x < 7 && y < 7){//Right up
      doc = document.getElementById(array[x+1]+(y+2)); 
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x > 1 && y < 8){//Left Uside
      doc = document.getElementById(array[x-2]+(y+1));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x > 0 && y < 7){//Left up
      doc = document.getElementById(array[x-1]+(y+2));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x > 1 && y > 1){//Left Dside
      doc = document.getElementById(array[x-2]+(y-1));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x > 0 && y > 2){//Left down
      doc = document.getElementById(array[x-1]+(y-2));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x < 6 && y > 1){//Right Dside
      doc = document.getElementById(array[x+2]+(y-1));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    if (x < 7 && y > 2){//Right down
      doc = document.getElementById(array[x+1]+(y-2));
      if (doc.className.includes("horse"+different)){
        mateCoin.push(doc.id);
        return;
      }
    }
    doc = document.getElementById(array[x]+y);
    if (doc.className.includes(same)){
      return 28;
    }
    if (doc.className.includes(different)){
      eliminateChances.push(array[x]+y);
      u = 1;
    }
    if (u == 0){
      kingChances.push(array[x]+y);
    }
    possibleMove = [];
    mateCoin = [];
    return 28;
  }

  // check the king is checked by rook

  function rook(doc){
    if (doc.className.includes("king"+same)){
      return 3;
    }
    if (doc.className.includes(same)){
      return 1;
    }
    else if (doc.className.includes("elephant"+different) || doc.className.includes("queen"+different)){
      return 2;
    }
    else if (doc.className.includes(different)){
      return 1;
    }
  }

  // check the king is checked by elephant

  function mandiri(doc){
    if (doc.className.includes("king"+same)){
      return 3;
    }
    if (doc.className.includes(same)){
      return 1;
    }
    else if (doc.className.includes("Bishop"+different) || doc.className.includes("queen"+different)){
      return 2;
    }
    else if (doc.className.includes(different)){
      return 1;
    }
  }


  function whitePawnCheck(x,y){
    if (x != 7 && y != 8){
      let doc = document.getElementById(array[x+1]+(y+1));
      if (doc.className.includes("blackPawn")){
          mateCoin.push(doc.id);
          return 1;
      }
    }
    if (x != 0 && y != 8){
      doc = document.getElementById(array[x-1]+(y+1));
      if (doc.className.includes("blackPawn")){
          mateCoin.push(doc.id);
          return 1;
      }
    }
  }

  function blackPawnCheck(x,y){
    if (x != 7 && y != 1){
      let doc = document.getElementById(array[x+1]+(y-1));
      if (doc.className.includes("whitePawn")){
          mateCoin.push(doc.id);
          return 1;
      }
    }
    if (x != 0 && y != 1){
      doc = document.getElementById(array[x-1]+(y-1));
      if (doc.className.includes("whitePawn")){
          mateCoin.push(doc.id);
          return 1;
      }
    }
  }

  let defend = [];
  let possibleMove = [];
  let mateCoin = [];
  let attack = [];
  let check = 0;

  // finds the king is in check

  function checkMate(){
    let b ;
    let y = same;
    same = different;
    different = y;
    let kingPosition = "";
    if (same == "White"){
        kingPosition = WhitePosition;
    }
    else if (same == "Black"){
        kingPosition = BlackPosition;
    }
    let  n = kingPosition.split("");
    eliminateChances =[];
    b = setKing(array.indexOf(n[0]),Number(n[1]));
    if (b == undefined){
      defend = possibleMove.filter(ID => ID);
      attack = mateCoin.filter(ID => ID);
      check = 1;
    }
    
    if (check == 1){
      indexOne = array.indexOf(n[0]);
      indexTwo = Number(n[1]);
      king(0);
      if (kingChances.length == 0 && eliminateChances.length == 0){
        checkmate = 1;
      }
      eliminateChances = [];
    }
    
    y = same;
    same = different;
    different = y;
    // lockCheck(n);
  }


  let lockForward = [];
  let lockSideward = [];
  let lockRightward = [];
  let lockLeftward = [];
  let checkmate = 0;




  let designWhite = document.getElementById("white");
  let designBlack = document.getElementById("black");
  let turnChance = document.getElementById("turnChance");
  let upCastingWhite = document.getElementById("upcastingWhite");
  let upCastingBlack = document.getElementById("upcastingBlack");

  function tellTurn(){
    if (turn == 0){
        turnChance.innerText = "\u{2655}";
    }
    else{
      turnChance.innerText = "\u{265B}";
    }
  }

  // change the pawn to queen or other elements, it is also called as upcasting

  function upcasting(variable){
    let v = variable.id.split("");
    if ( v[1] == "8" && variable.className.includes("whitePawn")){
        upCastingWhite.style = "display:flex;";
        turn = 2;
    }
    if (v[1] == "1" && variable.className.includes("blackPawn")){
        upCastingBlack.style = "display:flex;";
        turn = 2;
    }
    upCastingPawn = variable;
  }

  let upCastingPawn = "";

  // function related to upcasting 

  function select(id){
    doc = upCastingPawn;
    doc.classList.remove("whitePawn");
    let variable ="";
    let text = "";
    switch(id){
    case "queen":
      variable = "queenWhite";
      text = "\u{2655}"; 
      break;
    case "bishop":
      variable = "BishopWhite";
      text = "\u{2657}"; 
      break;
    case "rook":
      variable  = "elephantWhite";
      text = "\u{2656}"; 
      break;
    case "horse" :
      variable = "horseWhite";
      text = "\u{2658}"; 
      break;
    }
    doc.classList.add(variable);
    doc.innerHTML = "<paragraph id = 'vijay' class ="+variable+" draggable ='true'>"+text+"</paragraph>";
    let donkey = document.getElementById("vijay");
    donkey.addEventListener("dragstart", dragStart);
    donkey.addEventListener("dragend", dragEnd);
    upCastingWhite.style = "display:none;";
    doc.classList.remove("whitePawn");
    turn = 1;
    sigma();
  }

  // function related to upcasting

  function select1(id){
    doc = upCastingPawn;
    doc.classList.remove("BlackPawn");
    let variable ="";
    let text = "";
    switch(id){
    case "queen":
      variable = "queenBlack";
      text = "\u{265B}"; 
      break;
    case "bishop":
      variable = "BishopBlack";
      text = "\u{265D}"; 
      break;
    case "rook":
      variable  = "elephantBlack";
      text = "\u{265C}"; 
      break;
    case "horse" :
      variable = "horseBlack";
      text = "\u{265E}"; 
      break;
    }
    doc.classList.add(variable);
    doc.innerHTML = "<paragraph id = 'vijay' class ="+variable+" draggable ='true'>"+text+"</paragraph>";
    let donkey = document.getElementById("vijay");
    donkey.addEventListener("dragstart", dragStart);
    donkey.addEventListener("dragend", dragEnd);
    upCastingBlack.style = "display:none;";
    doc.classList.remove("blackPawn");
    turn = 0;
    sigma();
  }


  function sigma(){
    checkMate();
    if (check == 1 && checkmate == 1){
      let div = upCastingPawn.id.split("");
      let b = setKing(array.indexOf(div[0]),Number(div[1]));
      if ( b == 28){
        for (let  i of defend){
          div = i.split("");
          b = setKing(array.indexOf(div[0]),Number(div[1]));
          if ( b == 28){
            console.log("winnninsa");
          }
          else{
            break;
          }
      }
      if (same == "White"){
        alert(different + " Won");
      }
      else if (same == "Black"){
        alert(same + " Won");
      }
      }
    }        
  }





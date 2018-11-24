// Rover Object Goes Here
// ======================

var Rover = {
  alias:'',
  direction: "N",
  x: 0,
  y: 0,
  travelLog: null,
}

//Array de Rovers creados
var rovers = [];

// ======================

// ***************GRID************
// O -> "Obstacle"
// R? -> "Rover"

var grid = [
  ['','','','','','','','','',''],
  ['','','O','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','O','','','','',''],
  ['','','','','','','','O','',''],
  ['','','','','','','','','',''],
  ['','O','','','','','','','',''],
  ['','','','','','','','','',''],
  ['','','','','','O','','','',''],
  ['','','','','','','','','','O'],
];

// ======================

function turnLeft(rover){
  
  var direction = null;
  switch (rover.direction){
    case 'N':
      direction = 'W';
      break;
    case 'E':
    direction = 'N';
      break;
    case 'S':
      direction = 'E';
      break;
    case 'W':
      direction = 'S';
      break;
  }
  rover.direction = direction;
  console.log("The Rover is facing: '"+ rover.direction +"'");
}

function turnRight(rover){

  var direction = null;
  switch (rover.direction){
    case 'N':
      direction = 'E';
      break;
    case 'E':
      direction = 'S';
      break;
    case 'S':
      direction = 'W';
      break;
    case 'W':
      direction = 'N';
      break;
  }
  rover.direction = direction;
  console.log("The Rover is facing: '"+ rover.direction +"'");

}

function moveForward(rover){

  var x = rover.x;
  var y = rover.y;

  switch (rover.direction){
    case 'N':
      y--;
      break;
    case 'E':
      x++;
      break;
    case 'S':
      y++;
      break;
    case 'W':
      x--;
      break;
  }

  if ((x<0||x>=grid[rover.y].length) || (y<0||y>=grid.length)) { //compruebo los límites del mapa
    console.error("The new position of the Rover is out of the map!!")
  } else if(grid[y][x]==='O'){ //compruebo si hay un obstaculo
    console.error("There is an obstacle, the Rover can't move this way!");
  } else if(grid[y][x]!==''){ //compruebo si hay un rover
    console.error("There is Rover: "+grid[y][x]+", the Rover can't move this way!");
  } else { //muevo el rover
    if(rover.travelLog === null){ //si es el primer movimiento del rover, creo el log
      rover.travelLog = [];
    }else{ //añado la posicion actual al log
      rover.travelLog.push([rover.x,rover.y]);
    }
    grid[rover.y][rover.x]=''; //dejo la posicion en el mapa vacia
    rover.x=x;
    rover.y=y;
    grid[y][x]=rover.alias; //marco la nueva posicion del rover en el mapa con su alias
    console.log("\nRover's actual position: [" + rover.x + "] [" + rover.y + "]."); 
  }
}

function moveBackward(rover){

  var x = rover.x;
  var y = rover.y;

  switch (rover.direction){
    case 'N':
      y++;
      break;
    case 'E':
      x--;
      break;
    case 'S':
      y--;
      break;
    case 'W':
      x++;
      break;
  }

  if ((x<0||x>=grid[rover.y].length) || (y<0||y>=grid.length)) {
    console.error("The new position of the Rover is out of the map!!")
  } else if(grid[y][x]==='O'){
    console.error("There is an obstacle, the Rover can't move this way!");
  } else if(grid[y][x]!==''){
    console.error("There is Rover: "+grid[y][x]+", the Rover can't move this way!");
  } else {
    if(rover.travelLog === null){
      rover.travelLog = [];
    }else{
      rover.travelLog.push([rover.x,rover.y]);
    }
    grid[rover.y][rover.x]='';
    rover.x=x;
    rover.y=y;
    grid[y][x]=rover.alias;
    console.log("\nRover's actual position: [" + rover.x + "] [" + rover.y + "]."); 
  }
}

//Funcion para ver el recorrido del rover
function travell(rover){
  if(rover.travelLog !== null){
    console.log("Rover's travell: ");
    for (var i = 0; i < rover.travelLog.length; i++) {
      var position = rover.travelLog[i];
      console.log("[" + position[0] + "] [" + position[1] + "]");
    }
  }
}

function command(rover, commands){
  for (var i = 0; i < commands.length; i++) {
    var order = commands[i];
    switch (order) {
      case 'f':
        moveForward(rover);
        break;
      case 'b':
        moveBackward(rover);
        break;  
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      default:
        console.error("Order '"+order+"' not valid!");
    }
  }
  travell(rover);
  seeMap();
}

//Función para ver el mapa con las posiciones de los obstaculos y los rovers
function seeMap(){
  grid.forEach(function(element) {
    console.log(element);
  });
}

function newRover(){

  var nuevo=true;

  //Compruebo si hay rovers en el array y si hay alguno en la posición [0][0]
  if (rovers.length!==0){
    rovers.forEach(
      (r)=>{if(r.x===0 && r.y===0){
              console.error("Can't create the new Rover, you must move the Rover: " + r.alias);
              nuevo=false;
            }},
    );
  }

  //Si no hay ningun rover creado, o no hay ninguno en la posicion [0][0]
  if(nuevo){
    var r = Object.create(Rover);
    r.alias='R'+(rovers.length+1);
    rovers.push(r);
  }

}
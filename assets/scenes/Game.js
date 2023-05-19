// import ENUMS from "../utils.js";
import {
  PLAYER_MOVEMENTS,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  ROMBO,
  CUADRADO,
  CIRCULO,
} from "../../utils.js";


export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    this.shapesRecolected = {
      [TRIANGULO]: { count: 0, score: 10},
      [CUADRADO]: { count: 0, score: 20 },
      [ROMBO]: { count: 0, score: 30 },
      [CIRCULO]: {count:0, score: -15 },
    };


    this.isWinner = false;
    this.isGameOver = false;

    this.timer = 30

  }

  preload() {
    // cargar fondo, plataformas, formas, jugador
    this.load.image("platform", "../assets/images/Platform.png");
    this.load.image("player", "../assets/images/Ninja.png");
    this.load.image(TRIANGULO, "../assets/images/Triangulo.png");
    this.load.image(ROMBO, "../assets/images/Rombo.png");
    this.load.image(CUADRADO, "../assets/images/Cuadrado.png");
    this.load.image(CIRCULO, "../assets/images/Circulo.png");
  }

  create() {
    // create game objects
    // add sky background
    this.add.image(400, 300, "sky").setScale(0.555);

    // agregado con fisicas
    // add sprite player
    this.player = this.physics.add.sprite(400, 500, "player");

    this.player.setCollideWorldBounds(true);

    

    // add platforms static group
    this.platformsGroup = this.physics.add.staticGroup();
    this.platformsGroup.create(400, 568, "platform").setScale(2).refreshBody();
    this.platformsGroup.create(20, 390, "platform").setScale(1.3).refreshBody();
    this.platformsGroup.create(800, 300, "platform").setScale(1.3).refreshBody();

    // add shapes group
    this.shapesGroup = this.physics.add.group();

    // add collider between player and platforms
    this.physics.add.collider(this.player, this.platformsGroup);


    // add collider between platforms and shapes
    this.physics.add.collider(this.shapesGroup, this.platformsGroup);

    // add overlap between player and shapes
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape, // funcion que llama cuando player choca con shape
      null, //dejar fijo por ahora
      this //dejar fijo por ahora
    );

    // create cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // create event to add shapes
    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.score = 0;
    this.scoreText = this.add.text(16, 40, "Puntaje:" + this.score, {
      fontSize: "20px",
      fill: "#FFFFFF",
      fontStyle: "bold",
    });

   //agregar texto de puntaje
     this.shapeText = this.add.text(16, 16, "T: 0 / C: 0 / R: 0", {
       fontSize: "20px",
       fill: "#fff",
       fontStyle: "bold",
   });

    this.TimeText = this.add.text(750,18, this.timer, {
      fontSize: "30px",
      fill: "#E6DE35",
      fontStyle: "bold",
  });


}

  update() {
    //check if game over or win
    if (this.isWinner) {
      this.scene.start("winner");
    }

    if (this.isGameOver) {
      this.scene.start("gameOver");
    }

    // update game objects
    // check if not game over or win

    // update player left right movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_MOVEMENTS.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_MOVEMENTS.x);
    } else {
      this.player.setVelocityX(0);
    }

    // update player jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-PLAYER_MOVEMENTS.y);
    }

    if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }
    this.shapesGroup.children.iterate(function(shape) {
      // Comprobar si el elemento shape está tocando una plataforma
      if (this.physics.overlap(shape, this.platformsGroup)) {
        // Restar % valor del elemento shape
        shape.value -= 0.25;

        const shapeName = shape.texture.key;
        const percentage = shape.value;
        const scoreNow = this.shapesRecolected[shapeName].score * percentage;
        console.log('Valor posible del shape '+shapeName+' '+scoreNow)
        
  
        // Si el valor llega a cero, destruir el elemento shape
        if (shape.value <= 0) {
          shape.disableBody(true, true);
        }
      }
    }, this);
  }

  addShape() {
    // get random shape
    const randomShape = Phaser.Math.RND.pick(SHAPES);

    // get random position x
    const randomX = Phaser.Math.RND.between(0, 800);

    const shape = this.physics.add.sprite(randomX, 0, randomShape);

    // add shape to screen
    this.shapesGroup.add(shape);
    shape.setBounce(0.75);
    shape.value = 1;
    shape.setCircle(32, 0, 0);

    console.log("shape is added", randomX, randomShape);
  }

collectShape(_player, shape) {
  // remove shape from screen 
  shape.disableBody(true, true);
  const shapeName = shape.texture.key;

  const percentage = shape.value;
  const scoreNow = this.shapesRecolected[shapeName].score * percentage;

  
  this.shapesRecolected[shapeName].count++;

  this.score += scoreNow;
  console.log(scoreNow)
  this.scoreText.setText(`Puntaje: ${this.score.toString()}`);
  

  console.log(this.shapesRecolected);


    //update score text
this.shapeText.setText(
      `T: ${this.shapesRecolected[TRIANGULO].count} / C: ${this.shapesRecolected[CUADRADO].count} / R: ${this.shapesRecolected[ROMBO].count}`
      );
  


    //this.scoreText.setText(
     //"T: " + 
    //this.shapesRecolected[TRIANGULO].count +
     //" / C: " +
    //this.shapesRecolected[CUADRADO].count +
     //" / R: " +
    //this.shapesRecolected[ROMBO].count
    //)

    console.log(this.shapesRecolected);

    //check if winner
    //take two of each shape
    if 
    (this.shapesRecolected[ROMBO].count >= 2 &&
    this.shapesRecolected[TRIANGULO].count >= 2 &&
    this.shapesRecolected[CUADRADO].count >= 2 &&
    this.score >= 100) {
    this.isWinner = true;
    }

  }

  updateTimer() {
      this.timer= this.timer -1;
      this.TimeText.setText (`${this.timer}`);
      if (this.timer == 0) {
        this.isGameOver = true;
      }
    }

}


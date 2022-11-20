import * as CANNON from "cannon-es";
import CannonDebugger from 'cannon-es-debugger'
import Game from "@/nazare/Game";

export default class Physic {
  time = 1 / 60
  damping = 0.01;
  world = new CANNON.World({gravity: new CANNON.Vec3(0, -9.81, 0)})
  colliding = false

  cannonDebugger: any;

  ground = new CANNON.Body({
    mass: 0,
    material: new CANNON.Material('groundMaterial'),
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  })



  /* walls */

  /* top left*/
  wall1 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(-9.5, 2, -9.5),
  })
  /* top */
  wall2 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(0, 2, -14),
  })
  /* top right */
  wall3 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(9.5, 2, -9.5),
  })
  /* left */
  wall4 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(14, 2, 0),
  })

  /* right */
  wall5 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(-14, 2, 0),
  })

  /* right bottom*/
  wall6 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(9.5, 2, 9.5),
  })

  /* left bottom*/
  wall7 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(-9.5, 2, 9.5),
  })

  /* rouka */
  wall8 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(-4, 2, 20),
  })
  wall9 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 7)),
    position: new CANNON.Vec3(4, 2, 20),
  })
  wall10 = new CANNON.Body({
    mass: 10,
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(1, 2, 5)),
    position: new CANNON.Vec3(0, 2, 24),
  })



  character = new CANNON.Body({
    mass: 1,
    velocity: new CANNON.Vec3(.1, .1, .1),
    linearDamping: .31,
    angularDamping: 1,
    angularVelocity: new CANNON.Vec3(0, 10, 0),
    shape: new CANNON.Box(new CANNON.Vec3(.5, .5, .5)),
    position: new CANNON.Vec3(0, .5, 21.315925775403738)
  })

  constructor(game: Game) {
    this.ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

    this.wall1.quaternion.setFromEuler(0, -.8, 0)
    this.wall2.quaternion.setFromEuler(0, -Math.PI / 2, 0)
    this.wall3.quaternion.setFromEuler(0, .8, 0)
    this.wall4.quaternion.setFromEuler(0, 0, 0)
    this.wall5.quaternion.setFromEuler(0, 0, 0)
    this.wall6.quaternion.setFromEuler(0, -Math.PI / 3.7, 0)
    this.wall7.quaternion.setFromEuler(0, -Math.PI / -3.7, 0)
    this.wall8.quaternion.setFromEuler(0, 0, 0)
    this.wall9.quaternion.setFromEuler(0, 0, 0)
    this.wall10.quaternion.setFromEuler(0, Math.PI / 2, 0)

    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.addBody(this.ground)
    this.world.addBody(this.wall1)
    this.world.addBody(this.wall2)
    this.world.addBody(this.wall3)
    this.world.addBody(this.wall4)
    this.world.addBody(this.wall5)
    this.world.addBody(this.wall6)
    this.world.addBody(this.wall7)
    this.world.addBody(this.wall8)
    this.world.addBody(this.wall9)
    this.world.addBody(this.wall10)
    this.world.addBody(this.character)

    this.collisions()

    //@ts-ignore
    this.cannonDebugger = new CannonDebugger(game.scene, this.world, {
      color: "#FF0000",
      scale: 1,
    })

    // setTimeout(() => {
    //   this.character.type = CANNON.Body.DYNAMIC
    // }, 3000)

    // const self = this
    // this.character.addEventListener("collide",function(e: any){
    //   console.log("ok")
    //   const relativeVelocity = e.contact.getImpactVelocityAlongNormal();
    //   // self.colliding = Math.abs(relativeVelocity) > 0.07;
    // })
  }

  collisions() {
    const charMat = new CANNON.Material();
    this.character.material = charMat

    const groundMat = new CANNON.Material();
    this.ground.material = groundMat

    const groundAndCharContact = new CANNON.ContactMaterial(groundMat, charMat, {
      // kayma
      friction: .01,
    })

    const wallMat = new CANNON.Material();
    this.wall1.material = wallMat
    this.wall2.material = wallMat
    this.wall3.material = wallMat
    this.wall4.material = wallMat
    this.wall5.material = wallMat
    this.wall6.material = wallMat
    this.wall7.material = wallMat
    this.wall8.material = wallMat
    this.wall9.material = wallMat
    this.wall10.material = wallMat

    const charAndWallContact = new CANNON.ContactMaterial(charMat, wallMat, {
      // sekme
      restitution: .6
    })


    this.world.addContactMaterial(groundAndCharContact)
    this.world.addContactMaterial(charAndWallContact)


    // const brickContactMatOnChar = new CANNON.ContactMaterial(brickMat, charMat, {
    //   friction: 0.2,
    //   // Bounciness (0-1, higher is bouncier). How much energy is conserved
    //   // after a collision
    //   restitution: 0,
    //   contactEquationStiffness: 1e12,
    //   contactEquationRelaxation: 3,
    //   frictionEquationStiffness: 1e8,
    // })
  }

  update(): void {
    this.world.fixedStep()
    // this.cannonDebugger.update()
  }

}
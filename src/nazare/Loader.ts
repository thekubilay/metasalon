import * as THREE from "three"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

export default class Loader {
  mtl(args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      new MTLLoader().load(args.path, (materials) => {
          materials.preload()

          const objLoader = new OBJLoader()
          const material = new THREE.MeshPhongMaterial( { color: "#FFFFFF", side: THREE.BackSide } );
          // objLoader.setMaterials(material)
          objLoader.load(args.obj, (mesh:any) => {
              if ( mesh.isMesh ) mesh.material = material;

              mesh.name = args?.name || ""
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              resolve(mesh)
            },
            (xhr) => {
              console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
              console.log('An error happened')
            })
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.log('An error happened')
        }
      )
    })
  }

  fbx(args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      new FBXLoader().load(args.path, (object) => {
          object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
              // (child as THREE.Mesh).material = material
              if ((child as THREE.Mesh).material) {
                ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
              }
            }
          })
          object.castShadow = true
          object.scale.set(1, 1, 1)
          resolve(object)
        },
        (xhr) => {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          // console.log(error)
        }
      )

    })
  }

}

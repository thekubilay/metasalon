import * as THREE from "three";
import Light from '../nazare/Light';

import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import Stats from 'three/examples/jsm/libs/stats.module';
import {GUI} from 'dat.gui';
import {CameraOption, DevOption, RendererOption, OrbitOption, LightOption, GameSettings} from '@/types/GameSetting';

export default class WebGL {

  public scene = new THREE.Scene();
  public stats = Stats();
  public tag = new CSS2DRenderer();
  public clock = new THREE.Clock();
  public gui = {} as GUI;

  public sizes = {width: window.innerWidth, height: window.innerHeight};
  public renderer = new THREE.WebGLRenderer();
  public camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 1, 5000);
  public light = new Light();
  public delta = 0;
  public elapsedTime = 0;
  public orbit = {} as any
  public tagWrap = {} as HTMLDivElement;
  public canvas = {} as HTMLCanvasElement;
  public settings = {} as GameSettings;

  public init(settings: GameSettings): Promise<boolean> {
    return new Promise((resolve) => {
      this.sizes = Object.assign(
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        settings,
      );

      this.set_dev((settings.dev = {} as DevOption));
      this.set_canvas(settings.canvas);
      this.set_renderer((settings.renderer = {} as RendererOption));
      this.set_camera((settings.camera = {} as CameraOption));
      this.set_orbit((settings.orbit = {} as OrbitOption));
      this.set_nameTag((settings.nameTag = false));
      this.set_lights((settings.lights = {} as LightOption));

      this.scene.background = new THREE.Color(settings.sceneBg || '#70a1ff');

      resolve(true);
    });
  }

  private set_dev(options = {}): void {
    const settings = Object.assign(
      {
        gui: false,
        stats: false,
      },
      options,
    );

    this.settings.dev = settings;

    if (settings.gui) this.gui = new GUI();
    if (settings.stats) document.body.appendChild(this.stats.dom);

    return;
  }

  private set_canvas(id: string): void {
    if (id === undefined) throw new Error('no canvas element id given');

    this.canvas = document.getElementById(id) as HTMLCanvasElement;

    return;
  }

  private set_renderer(options = {}, pixelRatio = 1, shadow = true): void {
    const settings = Object.assign(
      {
        canvas: this.canvas,
        alpha: false,
        antialias: true,
      },
      options,
    );

    // this.settings.renderer = settings

    this.renderer = new THREE.WebGLRenderer(settings);

    if (pixelRatio === 1) this.renderer.setPixelRatio(window.devicePixelRatio);
    else this.renderer.setPixelRatio(window.devicePixelRatio * pixelRatio);

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.shadowMap.enabled = shadow;
    return;
  }

  private set_nameTag(headTag = false): void {
    if (headTag) {
      this.tag.setSize(this.sizes.width, this.sizes.height);
      this.tag.domElement.style.position = 'absolute';
      this.tag.domElement.style.top = '0px';
      this.tagWrap = document.getElementById('world') as HTMLDivElement;
      this.tagWrap.appendChild(this.tag.domElement);
    }
    return;
  }

  private set_camera(options = {}): void {
    const settings = Object.assign(
      {
        fov: 45,
        width: this.sizes.width,
        height: this.sizes.height,
        near: 1,
        far: 5000,
        position: [0, 0, 0],
      },
      options,
    );

    this.camera.fov = settings.fov;
    this.camera.aspect = settings.width / settings.height;
    this.camera.near = settings.near;
    this.camera.far = settings.far;
    this.camera.position.set(settings.position[0], settings.position[1], settings.position[2]);
    this.camera.updateProjectionMatrix();

    return;
  }

  private set_orbit(options = {}): void {
    /* orbit */
    const settings = Object.assign(
      {
        minDistance: 5,
        maxDistance: 100,
        maxPolarAngle: Math.PI / 2 - 0.05,
        enableZoom: true,
        enableRotate: true,
      },
      options,
    );

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.minDistance = settings.minDistance;
    this.orbit.maxDistance = settings.maxDistance;
    this.orbit.maxPolarAngle = settings.maxPolarAngle;
    this.orbit.enableZoom = settings.enableZoom;
    this.orbit.enableRotate = settings.enableRotate;
    this.orbit.update();
    return;
  }

  private set_lights(options = {}): void {
    const settings = Object.assign(
      {
        ambientLight: true,
        pointLight: true,
        pointLightHelper: false,
        dirLight: true,
        dirLightHelper: false,
      },
      options,
    );

    /* lights */
    if (settings.ambientLight) this.scene.add(this.light.ambientLight);
    if (settings.pointLight) this.scene.add(this.light.pointLight);
    if (settings.pointLightHelper) this.scene.add(this.light.pointLightHelper);
    if (settings.dirLight) this.scene.add(this.light.dirLight);
    // console.log(settings.dirLightHelper)
    this.scene.add(this.light.dirLightHelper);

    return;
  }
}

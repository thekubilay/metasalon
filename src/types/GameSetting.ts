export interface WindowSize {
  width: number;
  height: number;
}

export interface OrbitOption {
  orbit: true;
  minDistance: number;
  maxDistance: number;
  maxPolarAngle: number;
  enableZoom: number;
  enableRotate: number;
}

export interface CameraOption {
  fov: number;
  width: number;
  height: number;
  far: number;
  camera: number[];
}

export interface RendererOption {
  shadowMap: boolean;
  pixelRatio: number;
  alpha: boolean;
  antialias: boolean;
}

export interface DevOption {
  stats: boolean;
  gui: boolean;
}

export interface LightOption {
  ambientLight: boolean;
  pointLight: boolean;
  pointLightHelper: boolean;
  dirLight: boolean;
  dirLightHelper: boolean;
}

export interface GameSettings {
  canvas: string;
  raycaster: boolean;
  sceneBg?: string;
  camera?: CameraOption;
  dev?: DevOption;
  nameTag?: boolean;
  windowSize?: WindowSize;
  renderer: RendererOption;
  orbit?: OrbitOption;
  lights?: LightOption;
  multiplayer?: () => void;
}

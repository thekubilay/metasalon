export interface WindowSize {
  width: number,
  height: number,
}

export interface OrbitOption {
  orbit: true,
  minDistance: number,
  maxDistance: number,
  maxPolarAngle: number,
  enableZoom: number,
  enableRotate: number,
}

export interface CameraOption {
  fov: number,
  width: number,
  height: number,
  far: number,
  near:number,
  position: number[],
}

export interface RendererOption {
  shadowMap: boolean,
  pixelRatio: number,
  alpha: boolean,
  antialias: boolean,
}

export interface DevOption {
  stats: boolean,
  gui: boolean,
}

export interface LightOption {
  ambientLight: boolean,
  pointLight: boolean,
  pointLightHelper: boolean,
  dirLight: boolean,
  dirLightHelper: boolean,
}

export interface MultiplayerSetting {
  start: (arg: any) => void,
  updatePlayerData: (arg: any) => void
}

export interface GameSettings {
  canvas?: string,
  raycaster?: boolean,
  rotation: boolean,
  sceneBg?: string,
  camera?: CameraOption,
  dev?: DevOption,
  tags?: boolean,
  windowSize?: WindowSize,
  renderer?: RendererOption,
  orbit?: OrbitOption,
  lights?: LightOption,
  environments?: any[],
  multiplayer?: MultiplayerSetting,
}

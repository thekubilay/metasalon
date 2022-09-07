type LocomotionType = any

interface ModeModel {
  idle: LocomotionType[],
  // jump: LocomotionType[],
  left: LocomotionType[],
  right: LocomotionType[],
  ahead: LocomotionType[],
  [key: string]: LocomotionType[]
}

export interface Mode {
  normal: ModeModel,
  run: ModeModel,
  [key: string]: ModeModel
}

interface Model {
  type: string,
  path: string,
  mesh: any,
}

export interface Models {
  character: Model,
  [key: string]: Model
}

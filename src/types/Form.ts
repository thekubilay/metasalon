export interface FormData {
  [key: string]:{
    required: boolean,
    error: null | string[],
    value: string,
  }
}

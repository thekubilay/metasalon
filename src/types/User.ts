type mixed = null | string

export interface User {
  key: string,
  user: {
    id: number,
    email: string,
    username:string,
    last_name: mixed,
    first_name: mixed,
    last_name_kana: mixed,
    first_name_kana: mixed,
    role: string,
    profile: {
      id:number,
      audio: boolean,
      avatar: mixed,
      user: number
    },
    character_info: {
      id: number,
      name: string,
      model: string,
      position_x: number,
      position_y: number,
      user: number
    }
  }
}

export interface UserError {
  non_field_errors: string[]
}

import ENV from "@/config";
import axios from "axios";
import {User, UserError} from "@/types/User"

type Method = "post" | "put" | "patch" | "get" | "delete"
type Data = {email?:string,password?:string,character?:string,name?:string}

export default class RequestService {
  public data: any;

  getCompany () {
    return new Promise((resolve,reject) => {
      axios.request({
        method: "get",
        baseURL: ENV.API,
        url: "/api/companies/284160752/",
      }).then((response:any) => {
        resolve(response)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }

  getUser () {
    return new Promise((resolve,reject) => {
      axios.request({
        method: "get",
        baseURL: ENV.API,
        url: "/api/users/",
      }).then((response:any) => {
        resolve(response)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }

  signIn ( data:Data): Promise<User | UserError>  {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      if(data.email)fd.append("email", data.email)
      if(data.password)fd.append("password", data.password)
      if(data.character)fd.append("character", data.character)
      if(data.name)fd.append("name", data.name)
      axios.request({
        method: "post",
        baseURL: ENV.API,
        url: "/api/dj-rest-auth/login/",
        data: fd,
      }).then((response:any) => {
        resolve(response)
      }).catch((error: Error) => {
        reject(error)
      })
    })
  }
}

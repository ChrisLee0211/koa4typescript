import * as mongoose from 'mongoose'

export const checkEmpty:<T>(model:mongoose.Schema<T>,param:string)=>void = (model,param) => {
    model.path(`${param}`).validate((val:string) => {
        if(val.length < 0 || val === ' '){
            return false
        }else{
            return true
        }
    },`${param}字段不能为空`)
}
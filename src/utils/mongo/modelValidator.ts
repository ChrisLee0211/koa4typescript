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

export const formatFilter = (filterField:any) => {
    let result = {} as any;
    if(filterField instanceof Array){
        throw `can not recieve a array`
    }
    for(let key in filterField){
        if(filterField[key]!==''&&filterField[key]!==null&&filterField[key]!==undefined){
            result[key] = filterField[key]
        }
    };
    return result
}
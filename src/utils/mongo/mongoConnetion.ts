import * as mongoose from 'mongoose';
import getConfig from '../../config/index';

interface mongoConfig {
    port:number,
    host:string,
    user?:string,
    password?:string
    db:string
}

const clientCreate = (config:mongoConfig,callback_:Function) => {
    let mongoAddress:string;
    if(config.user&&config.password){
        mongoAddress= `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.db}`
    }else{
        mongoAddress = `mongodb://${config.host}:${config.port}/${config.db}`
    }
    try {
        mongoose.set('bufferCommands', false)
        mongoose.connect(mongoAddress, { 
          useNewUrlParser: true,
          bufferMaxEntries: 0,   
          autoReconnect: true,  
          poolSize: 5          
        })
        
        const db:mongoose.Connection = mongoose.connection
        db.on('error', (error) => {
          console.log(`MongoDB connecting failed: ${error}`)
        })
        db.once('open', () => {
          console.log('MongoDB connecting succeeded')
        })
        return db
      } catch (error) {
        console.log(`MongoDB connecting failed: ${error}`)
      }
}
const env = process.env.NODE_ENV;
let mongoDefaultConfig:mongoConfig = {
    port: getConfig(env).port_mongo,
    host: getConfig(env).host_mongo,
    db: getConfig(env).db_mongo,
    
}
const useMongo:boolean = getConfig(env).useMongo
const mongoConnet = (options?:mongoConfig) => {
    let config:mongoConfig;
    if(options){
        config = options
    }else{
        config = mongoDefaultConfig
    };
    return new Promise((resolve,reject) => { //返回API调用方 一个 promise 对象
        clientCreate(config,(err:any,conn:mongoose.Connection) => {
            if(err) {
                reject(err)
            }
            resolve(conn) //返回连接的redis对象
        })
    })
}

const connetToMongodb = async (options?:mongoConfig) => {
    if(!useMongo){
        console.warn(`If you want to operate the mongodb, you need to change the boolean 'useMongo' in the './config'`)
        return
    };
    await mongoConnet(options)
};

export default connetToMongodb
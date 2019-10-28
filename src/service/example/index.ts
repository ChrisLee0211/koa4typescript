import * as koa from 'koa'
import {getContent} from '../../controllers/example/content'

const index = async(ctx:koa.Context,next:Function)=>{
    ctx.body = getContent('koa')
    await next()
}

export default index
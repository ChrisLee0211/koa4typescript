import * as Koa from 'koa'; // koa框架
import getConfig from './config';
import * as http from 'http';
import * as socketIO from 'socket.io'
import globalLogger from './utils/logger/globalLog'
import log from './middleware/log'
import connetToMongodb from './utils/mongo/mongoConnetion';
//路由分发
import routerMount from './router/index';

//中间件
import cors from './middleware/cors';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa(); // 新建一个koa应用
const env = process.env.NODE_ENV
const PORT:number|string = getConfig(env).basePort;
const server = http.createServer(app.callback());
const io = socketIO(server)
connetToMongodb()


app.use(cors)
app.use(log())
app.use(bodyParser())
routerMount(app)

globalLogger()

server.listen(getConfig(env).baseSocketPort) //监听socket端口
app.listen(PORT); // 监听应用端口


console.log(`Server running on port ${PORT}`);
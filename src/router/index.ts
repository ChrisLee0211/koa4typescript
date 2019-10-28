import example from '../service/example'
import * as Router from 'koa-router';
const router = new Router();

router.get('*',example)

export default router
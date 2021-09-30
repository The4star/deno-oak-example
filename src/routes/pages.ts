import { Router } from '../deps.ts';

const router = new Router();

router.get(`/`, ctx => {
    ctx.response.redirect("/index.html")
})

export default router;
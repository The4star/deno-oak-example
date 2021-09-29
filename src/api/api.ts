import { Router } from '../dependencies.ts';
import {log} from '../dependencies.ts'
import { loadPlanetsData} from "../models/planets.ts"
const router = new Router();

router.get("/planets", async ctx => {
  try {
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = await loadPlanetsData();
  } catch (error) {
    log.error(error)
  }
})

export default router;
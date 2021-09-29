import { Router } from '../dependencies.ts';
import { log } from '../dependencies.ts';
import { loadPlanetsData } from "../models/planets.ts";
import { downloadLaunchData, addLaunch } from "../models/launches.ts";

const router = new Router();
const baseEndpoint = "/api"

router.get(`${baseEndpoint}/planets`, async ctx => {
  try {   
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = await loadPlanetsData();
  } catch (error) {
    log.error(error)
  }
})

router.get(`${baseEndpoint}/launches`, async ctx => {
  try {   
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = await downloadLaunchData();
  } catch (error) {
    log.error(error)
  }
})

router.post(`${baseEndpoint}/launches`, async ctx => {
  const body =  await ctx.request.body({type: "json"}).value;
  addLaunch(body)
  ctx.response.body = {success: true}
  ctx.response.status = 201
})

router.post

export default router;
import { Application, send } from "./dependencies.ts";
import api from './api/api.ts'

const app = new Application();
const port = 3000;

app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get("X-Response-Time")
  console.log(ctx.request.method, ctx.request.url.pathname, time);
})

app.use(async(ctx,next) => {
  const start = Date.now()
  await next()
  const end = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${end}ms`)
})

app.use(api.routes())
app.use(api.allowedMethods())

app.use(async ctx => {
  const filePath = ctx.request.url.pathname
  const root = `${Deno.cwd()}/public`
  const whiteList = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images/favicon.png"
  ]

  if (whiteList.includes(filePath)) {
    await send(ctx, filePath, {
      root
    })
  }
})

app.listen({
  port
})
console.log(`Listening on port ${port}`);

import { Application } from "./dependencies.ts";

const app = new Application();
const port = 8000;

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

app.use(ctx => {
  ctx.response.body = "Nasa Mission Control"
})

app.listen({
  port
})
console.log(`Listening on port ${port}`);

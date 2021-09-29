import { Application, send, log } from "./dependencies.ts";
import { setupLogger } from './config/logger.ts'
import api from './api/api.ts'

const app = new Application();
const port = 3000;

await setupLogger()

//Errors
app.addEventListener("error", (evt) => {
  log.error(evt.error.message)
});

app.use(async (_ctx, next) => {
  try {
    await next();
  } catch (err) {
    throw err;
  }
});

// route logging
app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get("X-Response-Time")
  log.info(`${ctx.request.method} - ${ctx.request.url.pathname} - ${time}`);
})


app.use(async(ctx,next) => {
  const start = Date.now()
  await next()
  const end = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${end}ms`)
})

//routes
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
log.info(`Listening on port ${port}`);

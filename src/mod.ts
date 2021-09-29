import { Application, send, log } from "./dependencies.ts";
import { setupLogger } from './config/logger.ts'
import api from './api/api.ts'

const app = new Application();
const port = 3000;

await setupLogger()

//Errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = "Internal server error";
    throw err;
  }
});

app.addEventListener("error", (evt) => {
  const fileHandler = log.getLogger().handlers[1] as any;
  log.error(evt.error.message)
  fileHandler.flush()
});

// rout logging
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

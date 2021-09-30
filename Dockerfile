FROM denoland/deno:alpine

WORKDIR /app 

COPY . .

USER deno

CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]

EXPOSE 3000
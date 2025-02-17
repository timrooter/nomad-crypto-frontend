FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

CMD bun run dev

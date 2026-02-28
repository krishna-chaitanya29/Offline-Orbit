# ── Server Dockerfile (Node.js) ──
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p public/uploads

EXPOSE 5000

CMD ["node", "server.js"]

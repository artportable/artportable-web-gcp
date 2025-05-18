# ---------- Base Stage: Dependencies ----------
FROM node:16.13-alpine AS deps

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Install only deps early for better caching
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Builder Stage ----------
FROM node:16.13-alpine AS builder

WORKDIR /app
ARG ENV

# Copy only necessary files to speed up cache reuse
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the project for the specified environment
RUN npm run build:$ENV

# Install only production deps AFTER build to avoid rebuilding node_modules unnecessarily
RUN npm ci --production --prefer-offline

# ---------- Final Stage: Runtime ----------
FROM node:16.13-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Set up a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy required files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=builder /app/next.config.js ./next.config.js

# Set permissions and user
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]

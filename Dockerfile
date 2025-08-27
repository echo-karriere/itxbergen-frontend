# Use Node 18 alpine (lightweight)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run the dev server
CMD ["yarn", "dev"]

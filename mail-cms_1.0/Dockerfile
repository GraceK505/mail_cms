# Use Node.js base image
FROM node:22-alpine

WORKDIR /app

# Copy dependency files first (to leverage caching)
COPY package*.json ./

# # Optionally build Angular if it's in this same repo
# RUN npm run build --if-present

# Install dependencies
RUN npm install

# If you're using Angular for frontend, install CLI globally
RUN npm install -g @angular/cli

# Copy the full app source
COPY . .

EXPOSE 4200

CMD ["npm", "start"]
# START from a base image that has Python 3 and Node
FROM python:3.10-slim

# Install ffmpeg, node, and curl
RUN apt-get update && \
    apt-get install -y ffmpeg curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip install yt-dlp

# Create app directory
WORKDIR /app

# Copy all backend files
COPY . .

# Install backend dependencies
RUN npm install

# Start server
CMD ["npm", "start"]
# Use Node base image with Debian
FROM node:20-bullseye

# Install yt-dlp dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install --break-system-packages yt-dlp

# Set working directory in container
WORKDIR /app

# Copy everything into the image
COPY . .

# Install backend dependencies (Node.js)
RUN npm install

# Start the app
CMD ["npm", "start"]
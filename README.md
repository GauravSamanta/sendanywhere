# P2P File Transfer

P2P File Transfer is a peer-to-peer (P2P) application that enables users to securely and directly share files between devices without relying on a central server. Built with Next.js and React, it leverages WebRTC and other modern libraries to offer a smooth and efficient file-sharing experience.

## Features

- **Peer-to-Peer File Transfer**: Directly share files between devices using PeerJS to establish WebRTC connections, avoiding any central server.
- **File Compression**: Compress files with JSZip before transfer to reduce size and improve speed.
- **Secure Links**: Generate unique, short-lived links using Nanoid for secure and temporary file sharing.

## Tech Stack

### Frontend
- **Framework**: Next.js (React framework)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **File Compression**: JSZip
- **File Uploads**: React Dropzone for drag-and-drop support
- **P2P Connection**: PeerJS for WebRTC-based peer-to-peer connections
- **Unique Link Generation**: Nanoid for secure, unique IDs

## Getting Started

### Prerequisites
Ensure that you have the following installed:
- **Node.js** (>= 18.x)
- **npm** (>= 10.x)

### Installation

#### Local Development

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Dependencies**: Install project dependencies using `npm ci` to ensure exact package versions.
    ```bash
    npm ci
    ```

3. **Build the Application**: Compile the application for production.
    ```bash
    npm run build
    ```

4. **Run the Application**: Start the application in production mode.
    ```bash
    npm start
    ```

5. **Access the Application**: The application will be accessible at [http://localhost:3000](http://localhost:3000).

#### Dockerized Deployment

1. **Run Docker Compose**: Ensure Docker and Docker Compose are installed, then start the container with:
    ```bash
    docker-compose up
    ```

2. **Access the Application**: Once the container is up and running, the application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **File Selection**: Use the drag-and-drop area to select files for transfer.
- **Share Link Generation**: Generate a unique, secure link that can be shared with the recipient.
- **Peer-to-Peer Transfer**: When the recipient opens the link, a WebRTC connection will be established, and the file transfer will begin.

---

# P2P File Transfer

P2P is a peer-to-peer (P2P) file transfer application that allows users to securely share files directly between devices without the need for a central server. The application is built using Next.js, React, and several modern libraries for an efficient and smooth file-sharing experience.

## Features

- **Peer-to-Peer File Transfer:** Direct file sharing between devices using PeerJS, bypassing the need for a central server.
- **File Compression:** Utilizes JSZip to compress files before transfer, reducing file size and improving transfer speed.
- **Unique Share Links:** Generates unique, short-lived links using Nanoid for secure file sharing.

## Tech Stack

- **Frontend:**
  - Next.js (React framework)
  - TailwindCSS (for styling)
  - Radix UI and Lucide Icons (for UI components)
  - JSZip (for file compression)
  - React Dropzone (for drag-and-drop file uploads)
  - PeerJS (for WebRTC-based peer-to-peer connections)
  - Nanoid (for generating unique IDs)

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- npm (>= 10.x)


# Stream Kit Bun Server Example

This example demonstrates using Stream Kit with a Bun server that can stream web pages using Puppeteer and Chrome extensions.

## Quick Start

### Local Development (without Docker)
```bash
bun install
bun run src/index.ts
```

### Docker Container (with tab capture & WebRTC fixes)
```bash
cd container
docker build -t stream-container .
# Map both HTTP port and UDP port range for WebRTC
docker run -p 8080:8080 -p 40000-40100:40000-40100/udp stream-container
```

## Architecture

The system consists of:

1. **Container Server** (`container/src/server.ts`) - Manages Puppeteer browser instances with Chrome extension
2. **Chrome Extension** (`container/extension/`) - Handles tab capture and WebRTC streaming
3. **Receiver HTML** (`receiver.html`) - Web interface for receiving and displaying streams

## Docker Fixes

### Tab Capture Fix

**Problem**: Chrome headless mode in Docker containers cannot properly capture tab content, resulting in empty video streams.

**Solution**: 
- Use virtual display (Xvfb) instead of headless mode
- Enable proper graphics acceleration flags
- Add window manager (fluxbox) for proper rendering context

### WebRTC Networking Fix

**Problem**: WebRTC peer-to-peer connections fail in Docker containers due to network isolation. Video streams connect but never receive data (readyState stays 0).

**Solution**:
- Configure TURN servers in PeerJS for both sender and receiver
- Expose UDP port range (40000-40100) for WebRTC media traffic
- Use proper Chrome flags for media capture in containerized environment

### What was changed:

1. **Dockerfile**: Added Xvfb, X11VNC, and fluxbox packages
2. **Startup script**: Initializes virtual display before starting Chrome
3. **Chrome flags**: Use `headless: false` with virtual display, enable GPU acceleration
4. **Environment**: Set `DISPLAY=:0` for virtual X11 session

### Testing the fix:

1. Build and run the Docker container:
```bash
cd container
docker build -t stream-container .
# Include UDP port mapping for WebRTC media connections
docker run -p 8080:8080 -p 40000-40100:40000-40100/udp stream-container
```

2. Open `receiver.html` in your browser

3. Enter a URL (e.g., `https://www.nytimes.com`) and click "Start Stream & Listen"

4. You should now see actual video content instead of a spinning/waiting state

### Debugging:

If you still have issues, check the container logs for:
- `[TAB_CAPTURE]` messages showing stream details
- Video track settings (width, height, frameRate)
- Chrome launch success with virtual display

Expected log output:
```
🔍 Starting basic browser launch mode: virtual display
✅ Test 1 PASSED: Basic browser launch works
[TAB_CAPTURE] Video track details: {width: 1920, height: 1080, frameRate: 30}
```

## Usage

1. Start the container server
2. Open `receiver.html` in a web browser  
3. Enter the URL you want to stream
4. Click "Start Stream & Listen"
5. The receiver will automatically connect and display the live stream

## Files

- `src/index.ts` - Main Bun server
- `container/` - Docker container setup
- `receiver.html` - Stream receiver interface
- `test-*.js` - Test scripts for development

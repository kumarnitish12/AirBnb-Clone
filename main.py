import os
import subprocess
import sys
import signal
import time
from threading import Thread
from flask import Flask, request, Response

# Create a Flask app
app = Flask(__name__)
node_process = None

def run_node_app():
    """Run the Node.js app in a separate process."""
    global node_process
    # Run Node.js on a different port (3000)
    os.environ['PORT'] = '3000'
    node_process = subprocess.Popen(["node", "app.js"])
    # Wait a bit for the Node.js server to start
    time.sleep(2)
    return node_process

# Start the Node.js app in a separate thread when this module is imported
node_thread = Thread(target=run_node_app)
node_thread.daemon = True
node_thread.start()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    """Proxy all traffic to the Node.js server."""
    import requests
    
    # Forward the request to the Node.js server
    url = f'http://localhost:3000/{path}'
    
    # Forward query params if any
    if request.query_string:
        url += f'?{request.query_string.decode("utf-8")}'
    
    # Forward the request with appropriate method
    method = request.method
    headers = {key: value for key, value in request.headers if key != 'Host'}
    data = request.get_data()
    
    # Make the request to the Node.js server
    try:
        resp = requests.request(
            method=method,
            url=url,
            headers=headers,
            data=data,
            cookies=request.cookies,
            allow_redirects=False,
            stream=True
        )
        
        # Create a Flask response from the Node.js response
        response = Response(
            resp.iter_content(chunk_size=10*1024),
            status=resp.status_code,
            content_type=resp.headers.get('Content-Type', 'text/html')
        )
        
        # Forward all headers from the Node.js response
        for key, value in resp.headers.items():
            if key.lower() not in ('content-length', 'transfer-encoding', 'content-encoding'):
                response.headers[key] = value
                
        return response
    except requests.RequestException as e:
        return f"Error proxying request: {str(e)}", 500

if __name__ == '__main__':
    # Register a signal handler to cleanly shut down the Node.js process
    def signal_handler(sig, frame):
        if node_process:
            node_process.terminate()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000)
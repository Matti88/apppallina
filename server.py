from http.server import HTTPServer, SimpleHTTPRequestHandler
import socket

def get_local_ip():
    try:
        # Get the local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

# Set the port
PORT = 8000

# Create the server
Handler = SimpleHTTPRequestHandler
ip = get_local_ip()

with HTTPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Server started at:")
    print(f"Local: http://localhost:{PORT}")
    print(f"Network: http://{ip}:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()
import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Portal Mojolaban berjalan di  http://localhost:{PORT}")
    print("Tekan Ctrl+C untuk berhenti.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer dihentikan.")

import socket

def orlando_security_scan(target_host):
    """
    Proprietary BowdenNGN logic to identify exposed local ports.
    """
    critical_ports = [22, 80, 443, 3389, 445]
    report = []
    
    for port in critical_ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target_host, port))
        if result == 0:
            report.append(f"Port {port}: OPEN (High Risk)")
        sock.close()
    return report

# Usage: print(orlando_security_scan('your-business-ip.com'))

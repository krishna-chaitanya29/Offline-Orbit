#!/usr/bin/env bash
# ─────────────────────────────────────────────────
# start.sh — Launch OfflineOrbit via Docker Compose
#             and display the access URL for the LAN
# ─────────────────────────────────────────────────
set -e

# ── Detect host LAN IP ──
get_lan_ip() {
  # macOS
  if command -v ipconfig &>/dev/null && [[ "$(uname)" == "Darwin" ]]; then
    ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo ""
    return
  fi
  # Linux
  if command -v hostname &>/dev/null; then
    hostname -I 2>/dev/null | awk '{print $1}'
    return
  fi
  # Fallback
  ip route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if ($i=="src") print $(i+1)}' || echo ""
}

LAN_IP=$(get_lan_ip)

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║         🚀 Starting OfflineOrbit (Docker)           ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Building & starting containers...                   ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Build and start
docker compose up --build -d

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║         ✅ OfflineOrbit is RUNNING!                  ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║                                                      ║"
echo "║  This machine:  http://localhost                      ║"
if [ -n "$LAN_IP" ]; then
  URL="http://$LAN_IP"
  PAD=$(printf '%*s' $((39 - ${#URL})) '')
  echo "║  LAN access:    ${URL}${PAD}║"
  echo "║                                                      ║"
  echo "╠══════════════════════════════════════════════════════╣"
  echo "║                                                      ║"
  echo "║  📱 Tell others on the same WiFi to open:            ║"
  echo "║                                                      ║"
  echo "║     👉  ${URL}                                       "
  echo "║                                                      ║"
else
  echo "║  ⚠️  Could not detect LAN IP.                        ║"
  echo "║  Run: ifconfig / ipconfig to find it manually.       ║"
fi
echo "╠══════════════════════════════════════════════════════╣"
echo "║  Logs:   docker compose logs -f                      ║"
echo "║  Stop:   docker compose down                         ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

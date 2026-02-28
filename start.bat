@echo off
REM ─────────────────────────────────────────────────
REM start.bat — Launch OfflineOrbit via Docker Compose
REM              and display the access URL for the LAN
REM ─────────────────────────────────────────────────

echo.
echo ======================================================
echo          Starting OfflineOrbit (Docker)
echo ======================================================
echo   Building and starting containers...
echo.

docker compose up --build -d

REM ── Detect LAN IP on Windows ──
set LAN_IP=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R "IPv4.*192\. IPv4.*10\."') do (
    for /f "tokens=1" %%b in ("%%a") do (
        if not defined LAN_IP set "LAN_IP=%%b"
    )
)

echo.
echo ======================================================
echo          OfflineOrbit is RUNNING!
echo ======================================================
echo.
echo   This machine:  http://localhost
if defined LAN_IP (
    echo   LAN access:    http://%LAN_IP%
    echo.
    echo   -----------------------------------------------
    echo   Tell others on the same WiFi to open:
    echo.
    echo       http://%LAN_IP%
    echo.
) else (
    echo   Could not detect LAN IP.
    echo   Run: ipconfig   to find it manually.
)
echo   Logs:   docker compose logs -f
echo   Stop:   docker compose down
echo ======================================================
echo.
pause

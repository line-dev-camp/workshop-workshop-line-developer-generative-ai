node --version // แนะนำว่าควรเป็น v20 หรือใหม่กว่า

npm --version

npm install -g @line/liff-cli

liff-cli channel add xxxx

liff-cli channel use xxxx

liff-cli app create \
   --name "LIFF CLI Demo" \
   --endpoint-url https://mokmoon.com/ \
   --view-type full
# --channel-id Channel ID ของ LINE Login Channel [optional]
# --name ชื่อของ LIFF app (ห้ามมีคำว่า LINE) [Required]
# --endpoint-url URL ขึ้นต้นด้วย HTTPS [Required]
# --view-type ขนาดในการแสดงผล LIFF app ซึ่งมี 3 ขนาดได้แก่ full, tall และ compact [Required]

liff-cli app update \
   --liff-id 1234567890-Jv5mrQdE \
   --view-type tall
# Successfully updated LIFF app: 1234567890-Jv5mrQdE
# --liff-id LIFF ID ของ LIFF app ที่ต้องการอัพเดท [Required]
# --channel-id Channel ID ของ LINE Login Channel [optional]
# --name ชื่อของ LIFF app (ห้ามมีคำว่า LINE) [optional]
# --endpoint-url URL ขึ้นต้นด้วย HTTPS [optional]
# --view-type ขนาดในการแสดงผล LIFF app ซึ่งมี 3 ขนาดได้แก่ full, tall และ compact [optional]

liff-cli app list
# LIFF apps:
# 1234567890-Jv5mrQdE: LIFF CLI Demo


liff-cli app delete \
   --liff-id 1234567890-Jv5mrQdE \
   --channel-id 1234567890
# Deleting LIFF app...
# Successfully deleted LIFF app: 1234567890-Jv5mrQdE


# For macOS (using Homebrew)
brew install mkcert

# For Windows (using Chocolatey)
choco install mkcert


mkcert -install
# The local CA is now installed in the system trust store! ⚡️


mkcert localhost

# Created a new certificate valid for the following names 📜
# - "localhost"

# The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅
# It will expire on 24 December 2026 🗓

liff-cli serve \
   --liff-id 1234567890-R0BoYE9W \
   --url http://localhost:5173
   # --port 

# Successfully updated endpoint url for LIFF ID: 1234567890-Jv5mrQdE.
# →  LIFF URL:     https://liff.line.me/1234567890-Jv5mrQdE
# →  Proxy server: https://localhost:9000/

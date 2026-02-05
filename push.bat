@echo off
cd /d "c:\Users\mrsai\OneDrive\Desktop\bmw\BMW-Redesign"
git add .
git commit -m "Fix: Import all assets to fix 404 errors on Vercel - Use proper imports for videos, images, and GLB files"
git push origin main

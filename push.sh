#!/usr/bin/env bash
# Run from the repo root. You must be logged in to GitHub (gh auth login, or an SSH key / token).
git remote add origin https://github.com/Pempixel-Web/Stripe-Dashboard-UI.git 2>/dev/null || true
git push -u origin main
git push origin v1.0.0 v2.0.0 v3.0.0

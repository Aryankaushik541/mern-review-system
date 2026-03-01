#!/bin/bash

# Script to remove the client (frontend) folder
# Frontend has been moved to: https://github.com/Aryankaushik541/mern-review-system-frontend

echo "🗑️  Removing frontend folder..."
echo ""
echo "⚠️  WARNING: This will delete the 'client' folder from this repository."
echo "Frontend has been moved to a separate repository:"
echo "https://github.com/Aryankaushik541/mern-review-system-frontend"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Operation cancelled."
    exit 0
fi

# Check if client folder exists
if [ ! -d "client" ]; then
    echo "✅ Client folder already removed or doesn't exist."
    exit 0
fi

# Remove client folder from git
echo "📦 Removing client folder from git..."
git rm -r client

# Commit the change
echo "💾 Committing changes..."
git commit -m "Remove frontend - moved to separate repository

Frontend has been moved to:
https://github.com/Aryankaushik541/mern-review-system-frontend

This repository now contains only the backend code."

echo ""
echo "✅ Frontend folder removed successfully!"
echo ""
echo "Next steps:"
echo "1. Push changes: git push origin main"
echo "2. Clone frontend separately:"
echo "   git clone https://github.com/Aryankaushik541/mern-review-system-frontend.git"
echo ""
echo "See MIGRATION_GUIDE.md for more details."

#!/bin/bash

# ========================================
# Vercel Environment Variables Setup Script
# ========================================
# This script automatically adds all required environment variables to Vercel
# Run this once to configure your Vercel deployment

echo "🚀 Setting up Vercel Environment Variables..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI is not installed!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI found!"
echo ""

# Login to Vercel (if not already logged in)
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "📝 Adding environment variables..."
echo ""

# Add EMAIL_USER
echo "Adding EMAIL_USER..."
vercel env add EMAIL_USER production <<< "aryankaushik541@gmail.com"
vercel env add EMAIL_USER preview <<< "aryankaushik541@gmail.com"
vercel env add EMAIL_USER development <<< "aryankaushik541@gmail.com"

# Add EMAIL_APP_PASSWORD
echo "Adding EMAIL_APP_PASSWORD..."
vercel env add EMAIL_APP_PASSWORD production <<< "yjjhugimwdpmakrh"
vercel env add EMAIL_APP_PASSWORD preview <<< "yjjhugimwdpmakrh"
vercel env add EMAIL_APP_PASSWORD development <<< "yjjhugimwdpmakrh"

# Add FRONTEND_URL
echo "Adding FRONTEND_URL..."
vercel env add FRONTEND_URL production <<< "https://booking-review-system.vercel.app"
vercel env add FRONTEND_URL preview <<< "https://booking-review-system.vercel.app"
vercel env add FRONTEND_URL development <<< "http://localhost:3000"

# Add MONGODB_URI
echo "Adding MONGODB_URI..."
vercel env add MONGODB_URI production <<< "mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority"
vercel env add MONGODB_URI preview <<< "mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority"
vercel env add MONGODB_URI development <<< "mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority"

# Add JWT_SECRET
echo "Adding JWT_SECRET..."
vercel env add JWT_SECRET production <<< "4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5"
vercel env add JWT_SECRET preview <<< "4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5"
vercel env add JWT_SECRET development <<< "4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5"

# Add NODE_ENV
echo "Adding NODE_ENV..."
vercel env add NODE_ENV production <<< "production"
vercel env add NODE_ENV preview <<< "production"
vercel env add NODE_ENV development <<< "development"

echo ""
echo "✅ All environment variables added successfully!"
echo ""
echo "🔄 Now redeploying your project..."
vercel --prod

echo ""
echo "🎉 Done! Your Vercel deployment is now configured with email support!"
echo "📧 Test password reset at: https://booking-review-system.vercel.app/forgot-password"
echo ""

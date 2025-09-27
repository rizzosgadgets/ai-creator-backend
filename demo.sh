#!/bin/bash

# AI Creator Backend - Demo Script
# This script demonstrates the "post my first blog" functionality

echo "🚀 AI Creator Backend Demo"
echo "=========================="
echo ""

# Check if server is running
echo "📡 Checking if server is running..."
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ Server is running!"
else
    echo "❌ Server is not running. Please start it with: npm start"
    exit 1
fi

echo ""
echo "📝 Creating your first blog post..."

# Create the first blog post
BLOG_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" \
    -d '{"title": "My First Blog Post", "topic": "AI and Technology", "author": "Demo User"}' \
    http://localhost:3000/create-blog)

BLOG_ID=$(echo $BLOG_RESPONSE | jq -r '.blog.id')
echo "✅ Created blog post with ID: $BLOG_ID"

echo ""
echo "📋 Listing all blog posts..."
curl -s http://localhost:3000/blogs | jq '.blogs[] | {id, title, author, published}'

echo ""
echo "📤 Publishing your first blog post..."
curl -s -X POST -H "Content-Type: application/json" \
    -d "{\"id\": $BLOG_ID}" \
    http://localhost:3000/publish-blog | jq

echo ""
echo "📖 Viewing your published blog post..."
curl -s http://localhost:3000/blogs/$BLOG_ID | jq '.blog | {id, title, topic, author, published, publishedAt, excerpt: (.content[:200] + "...")}'

echo ""
echo "🎉 Success! You have successfully posted your first blog!"
echo ""
echo "🔗 Available endpoints:"
echo "   GET  http://localhost:3000/           - API overview"
echo "   POST http://localhost:3000/create-blog - Create new blog"
echo "   GET  http://localhost:3000/blogs      - List all blogs"
echo "   GET  http://localhost:3000/blogs/:id  - Get specific blog"
echo "   POST http://localhost:3000/publish-blog - Publish blog"
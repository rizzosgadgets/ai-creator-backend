# ai-creator-backend

An AI-powered backend service for creating and managing blog posts. This service allows you to create, publish, and manage blog posts with AI-generated content.

## Features

- **Create Blog Posts**: Generate comprehensive blog posts with AI-generated content
- **Publish Blogs**: Publish your blog posts when ready
- **List & Retrieve**: View all blogs or get specific blog posts
- **AI Content Generation**: Intelligent content generation based on topics
- **In-Memory Storage**: Fast, lightweight blog storage (for development)

## API Endpoints

### Blog Management
- `POST /create-blog` - Create a new blog post
- `GET /blogs` - List all blog posts (add `?published=true` for published only)
- `GET /blogs/:id` - Get a specific blog post by ID
- `POST /publish-blog` - Publish a blog post

### Legacy Endpoints (maintained for compatibility)
- `POST /generate-blog` - Generate blog content only
- `POST /push-to-github` - Placeholder for GitHub integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server runs on `http://localhost:3000`

4. Run the demo script to see the complete workflow:
   ```bash
   ./demo.sh
   ```

## Quick Demo

To quickly test the "post my first blog" functionality, use the included demo script:

```bash
# Make sure server is running first
npm start

# In another terminal, run the demo
./demo.sh
```

This will demonstrate the complete workflow: create → list → publish → view your first blog post!

## Usage Examples

### Create Your First Blog Post
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"title": "My First Blog Post", "topic": "AI and Technology", "author": "Your Name"}' \
  http://localhost:3000/create-blog
```

### List All Blog Posts
```bash
curl http://localhost:3000/blogs
```

### Publish a Blog Post
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"id": 1}' \
  http://localhost:3000/publish-blog
```

### View a Specific Blog Post
```bash
curl http://localhost:3000/blogs/1
```

## API Request/Response Examples

### Creating a Blog Post
**Request:**
```json
{
  "title": "My First Blog Post",
  "topic": "AI and Technology", 
  "author": "Your Name"
}
```

**Response:**
```json
{
  "message": "Blog post created successfully!",
  "blog": {
    "id": 1,
    "title": "My First Blog Post",
    "topic": "AI and Technology",
    "author": "Your Name",
    "content": "AI-generated comprehensive blog content...",
    "createdAt": "2025-09-27T09:56:48.267Z",
    "published": false
  }
}
```

### Publishing a Blog Post
**Request:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "message": "Blog post published successfully!",
  "blog": {
    "id": 1,
    "title": "My First Blog Post",
    "topic": "AI and Technology",
    "author": "Your Name",
    "published": true,
    "publishedAt": "2025-09-27T09:57:03.458Z"
  }
}
```

## Required Fields

### Create Blog Post
- `title` (required) - The title of your blog post
- `topic` (required) - The topic/subject for content generation
- `author` (optional) - Author name (defaults to "AI Creator")
- `content` (optional) - Custom content (if not provided, AI generates it)

### Publish Blog Post
- `id` (required) - The ID of the blog post to publish

## Features in Development

- GitHub integration for automatic posting
- Persistent storage options
- Blog post editing capabilities
- Multiple content templates
- SEO optimization features
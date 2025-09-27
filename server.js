const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory blog storage
let blogs = [];
let blogIdCounter = 1;

// Helper function to generate blog content
function generateBlogContent(topic, author = "AI Creator") {
  const introTemplates = [
    `Welcome to this comprehensive exploration of ${topic}. In today's digital landscape, understanding ${topic} has become increasingly important.`,
    `${topic} has emerged as a fascinating subject that deserves our attention. Let's dive deep into what makes ${topic} so significant.`,
    `Ever wondered about ${topic}? This post will guide you through everything you need to know about this important topic.`
  ];

  const bodyTemplates = [
    `What makes ${topic} particularly interesting is its wide-ranging applications and implications. From technical aspects to practical implementations, ${topic} offers numerous opportunities for exploration and innovation.

Key points to consider:
• Understanding the fundamentals is crucial for success
• Real-world applications demonstrate the practical value
• Future developments promise even more exciting possibilities

The impact of ${topic} extends far beyond what we might initially expect, influencing various aspects of our daily lives and professional endeavors.`,
    
    `When exploring ${topic}, it's essential to consider both the current state and future potential. The field has evolved significantly, and there are several important aspects worth highlighting.

Core concepts include:
• Foundational principles that guide best practices
• Emerging trends that shape the future direction
• Practical considerations for implementation

As we continue to advance our understanding of ${topic}, new opportunities and challenges emerge that require thoughtful consideration.`,

    `${topic} represents a dynamic field with numerous facets worth exploring. Whether you're just starting your journey or looking to deepen your understanding, there's always something new to discover.

Essential elements:
• Building a solid foundation of knowledge
• Staying current with latest developments
• Applying insights to real-world scenarios

The beauty of ${topic} lies in its ability to adapt and evolve, making it a continuously engaging subject for study and application.`
  ];

  const conclusionTemplates = [
    `As we conclude our exploration of ${topic}, it's clear that this field offers tremendous opportunities for growth and innovation. By staying informed and engaged, we can make the most of what ${topic} has to offer.`,
    `In summary, ${topic} presents both exciting possibilities and important considerations. The key is to approach it with curiosity, critical thinking, and a commitment to continuous learning.`,
    `Thank you for joining me on this journey through ${topic}. I hope this exploration has provided valuable insights and inspired further investigation into this fascinating subject.`
  ];

  const intro = introTemplates[Math.floor(Math.random() * introTemplates.length)];
  const body = bodyTemplates[Math.floor(Math.random() * bodyTemplates.length)];
  const conclusion = conclusionTemplates[Math.floor(Math.random() * conclusionTemplates.length)];

  return `${intro}\n\n${body}\n\n${conclusion}`;
}

app.get("/", (req, res) => {
  res.json({
    message: "AI Creator Backend is online!",
    endpoints: {
      "POST /create-blog": "Create a new blog post",
      "GET /blogs": "List all blog posts",
      "GET /blogs/:id": "Get a specific blog post",
      "POST /generate-blog": "Generate blog content (legacy)",
      "POST /publish-blog": "Publish a blog post"
    }
  });
});

// Enhanced blog creation endpoint
app.post("/create-blog", (req, res) => {
  try {
    const { title, topic, author, content } = req.body;

    if (!title || !topic) {
      return res.status(400).json({
        error: "Title and topic are required fields"
      });
    }

    const blogPost = {
      id: blogIdCounter++,
      title: title,
      topic: topic,
      author: author || "AI Creator",
      content: content || generateBlogContent(topic, author),
      createdAt: new Date().toISOString(),
      published: false
    };

    blogs.push(blogPost);

    res.status(201).json({
      message: "Blog post created successfully!",
      blog: blogPost
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create blog post",
      details: error.message
    });
  }
});

// Get all blogs
app.get("/blogs", (req, res) => {
  try {
    const publishedOnly = req.query.published === 'true';
    const filteredBlogs = publishedOnly 
      ? blogs.filter(blog => blog.published)
      : blogs;

    res.json({
      message: `Found ${filteredBlogs.length} blog post(s)`,
      blogs: filteredBlogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        topic: blog.topic,
        author: blog.author,
        createdAt: blog.createdAt,
        published: blog.published,
        excerpt: blog.content.substring(0, 150) + "..."
      }))
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve blog posts",
      details: error.message
    });
  }
});

// Get specific blog
app.get("/blogs/:id", (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const blog = blogs.find(b => b.id === blogId);

    if (!blog) {
      return res.status(404).json({
        error: "Blog post not found"
      });
    }

    res.json({
      message: "Blog post retrieved successfully",
      blog: blog
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve blog post",
      details: error.message
    });
  }
});

// Publish blog endpoint
app.post("/publish-blog", (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Blog ID is required"
      });
    }

    const blog = blogs.find(b => b.id === parseInt(id));

    if (!blog) {
      return res.status(404).json({
        error: "Blog post not found"
      });
    }

    blog.published = true;
    blog.publishedAt = new Date().toISOString();

    res.json({
      message: "Blog post published successfully!",
      blog: {
        id: blog.id,
        title: blog.title,
        topic: blog.topic,
        author: blog.author,
        published: blog.published,
        publishedAt: blog.publishedAt
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to publish blog post",
      details: error.message
    });
  }
});

// Legacy endpoint (maintained for backward compatibility)
app.post("/generate-blog", (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({
      error: "Topic is required"
    });
  }
  
  const content = generateBlogContent(topic);
  res.json({
    message: "Blog content generated successfully",
    topic: topic,
    content: content
  });
});

// Legacy endpoint (maintained for backward compatibility)
app.post("/push-to-github", (req, res) => {
  // Placeholder for GitHub API integration
  res.json({
    message: "GitHub integration coming soon! Your blog posts are currently stored locally."
  });
});

app.listen(port, () => {
  console.log(`AI Creator Backend running on port ${port}`);
  console.log(`Visit http://localhost:${port} to see available endpoints`);
});
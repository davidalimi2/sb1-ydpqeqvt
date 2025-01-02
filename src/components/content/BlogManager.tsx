import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  tags: string[];
  status: 'draft' | 'published';
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Getting Started with Legal Tech',
      excerpt: 'An introduction to legal technology and its benefits.',
      content: 'Full blog content here...',
      author: 'John Doe',
      publishDate: new Date(),
      tags: ['legal-tech', 'introduction'],
      status: 'published'
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Blog Posts</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your blog posts and articles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setSelectedPost(null);
              setShowEditor(true);
            }}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </button>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">{post.excerpt}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishDate.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {post.tags.join(', ')}
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowEditor(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setPosts(posts.filter(p => p.id !== post.id));
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
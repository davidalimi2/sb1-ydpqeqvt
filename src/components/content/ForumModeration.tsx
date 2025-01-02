import React, { useState } from 'react';
import { MessageSquare, Flag, Shield, UserX } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reports: number;
  reportReason?: string;
}

export default function ForumModeration() {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Question about contract law',
      content: 'I have a question regarding...',
      author: 'user123',
      createdAt: new Date(),
      status: 'pending',
      reports: 2,
      reportReason: 'Inappropriate content'
    }
  ]);

  const handleModerate = (postId: string, action: 'approve' | 'reject') => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, status: action } : post
    ));
  };

  const handleBanUser = (username: string) => {
    console.log('Ban user:', username);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Forum Moderation</h3>
          <p className="mt-1 text-sm text-gray-500">
            Review and moderate forum posts and user reports
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <h4 className="text-lg font-medium text-gray-900">
                    {post.title}
                  </h4>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.status === 'approved' ? 'bg-green-100 text-green-800' :
                    post.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {post.reports > 0 && (
                    <span className="inline-flex items-center text-red-600">
                      <Flag className="h-4 w-4 mr-1" />
                      {post.reports} reports
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {post.content}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span>By: {post.author}</span>
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleModerate(post.id, 'approve')}
                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 hover:bg-green-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleModerate(post.id, 'reject')}
                    className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-100"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleBanUser(post.author)}
                    className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Ban User
                  </button>
                </div>
              </div>

              {post.reportReason && (
                <div className="mt-2 text-sm text-red-600">
                  <Shield className="inline h-4 w-4 mr-1" />
                  Report reason: {post.reportReason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
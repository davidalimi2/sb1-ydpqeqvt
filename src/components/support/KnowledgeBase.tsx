import React from 'react';
import { Book, Search, ExternalLink } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  url: string;
}

interface KnowledgeBaseProps {
  articles: Article[];
  onSearch: (query: string) => void;
}

export default function KnowledgeBase({ articles, onSearch }: KnowledgeBaseProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Book className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Knowledge Base</h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              onChange={(e) => onSearch(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {articles.map((article) => (
          <article key={article.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-medium text-gray-900">
                  {article.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500">{article.excerpt}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                  {article.category}
                </span>
              </div>
              <a
                href={article.url}
                className="ml-4 flex-shrink-0 text-indigo-600 hover:text-indigo-500"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
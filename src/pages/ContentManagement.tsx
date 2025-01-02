import React, { useState } from 'react';
import { Globe, FileText, MessageCircle, Settings, Image } from 'lucide-react';
import PageEditor from '../components/content/PageEditor';
import BlogManager from '../components/content/BlogManager';
import FAQManager from '../components/content/FAQManager';
import SEOSettings from '../components/content/SEOSettings';
import MediaLibrary from '../components/content/MediaLibrary';
import SocialMediaSettings from '../components/content/SocialMediaSettings';
import ContactSettings from '../components/content/ContactSettings';
import LegalDocsManager from '../components/content/LegalDocsManager';
import ChatSettings from '../components/content/ChatSettings';

type ContentSection = 'pages' | 'blog' | 'faq' | 'seo' | 'media' | 'social' | 'contact' | 'legal' | 'chat';

export default function ContentManagement() {
  const [activeSection, setActiveSection] = useState<ContentSection>('pages');

  const renderSection = () => {
    switch (activeSection) {
      case 'pages':
        return <PageEditor />;
      case 'blog':
        return <BlogManager />;
      case 'faq':
        return <FAQManager />;
      case 'seo':
        return <SEOSettings />;
      case 'media':
        return <MediaLibrary />;
      case 'social':
        return <SocialMediaSettings />;
      case 'contact':
        return <ContactSettings />;
      case 'legal':
        return <LegalDocsManager />;
      case 'chat':
        return <ChatSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Content Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your website content, blog posts, and other public-facing information
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveSection('pages')}
            className={`${
              activeSection === 'pages'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Globe className="h-5 w-5 mr-2" />
            Pages
          </button>
          <button
            onClick={() => setActiveSection('blog')}
            className={`${
              activeSection === 'blog'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <FileText className="h-5 w-5 mr-2" />
            Blog
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`${
              activeSection === 'faq'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            FAQ
          </button>
          <button
            onClick={() => setActiveSection('seo')}
            className={`${
              activeSection === 'seo'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Settings className="h-5 w-5 mr-2" />
            SEO
          </button>
          <button
            onClick={() => setActiveSection('media')}
            className={`${
              activeSection === 'media'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Image className="h-5 w-5 mr-2" />
            Media
          </button>
        </nav>
      </div>

      <div>{renderSection()}</div>
    </div>
  );
}
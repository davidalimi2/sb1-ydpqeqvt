import React, { useState } from 'react';
import { Image, Upload, Trash2, FolderOpen } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  uploadedAt: Date;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  const handleUpload = (files: FileList) => {
    const newMedia = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: file.size,
      uploadedAt: new Date()
    }));
    setMedia([...media, ...newMedia]);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your images, documents, and other media files
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <label className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Folders</h4>
            <ul className="space-y-2">
              {['all', 'images', 'documents', 'videos'].map((folder) => (
                <li key={folder}>
                  <button
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                      selectedFolder === folder
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    {folder.charAt(0).toUpperCase() + folder.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {media.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setMedia(media.filter(m => m.id !== item.id))}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
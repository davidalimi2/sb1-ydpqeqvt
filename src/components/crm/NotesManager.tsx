import React, { useState } from 'react';
import { MessageSquare, Paperclip, Lock, Plus, Edit2, Trash2 } from 'lucide-react';
import { Note } from '../../types/crm';

interface NotesManagerProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

export default function NotesManager({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}: NotesManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    type: 'general' as Note['type'],
    isPrivate: false,
    attachments: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNote) {
      onUpdateNote({
        ...selectedNote,
        content: formData.content,
        type: formData.type,
        isPrivate: formData.isPrivate
      });
    } else {
      onAddNote({
        content: formData.content,
        type: formData.type,
        isPrivate: formData.isPrivate,
        createdBy: 'current-user', // Replace with actual user ID
        attachments: []
      });
    }
    setShowForm(false);
    setSelectedNote(null);
    setFormData({
      content: '',
      type: 'general',
      isPrivate: false,
      attachments: []
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedNote ? 'Edit Note' : 'New Note'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Note['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="general">General</option>
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Private note</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files) {
                              setFormData({
                                ...formData,
                                attachments: Array.from(e.target.files)
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedNote(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedNote ? 'Update Note' : 'Add Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`bg-white shadow overflow-hidden sm:rounded-lg ${
              note.isPrivate ? 'border-l-4 border-yellow-400' : ''
            }`}
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-900">
                    {note.type.charAt(0).toUpperCase() + note.type.slice(1)} Note
                  </span>
                  {note.isPrivate && (
                    <Lock className="ml-2 h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedNote(note);
                      setFormData({
                        content: note.content,
                        type: note.type,
                        isPrivate: note.isPrivate,
                        attachments: []
                      });
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">{note.content}</p>
              {note.attachments && note.attachments.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {note.attachments.length} attachment(s)
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {note.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        className="block text-sm text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-2 text-xs text-gray-500">
                By {note.createdBy} on {note.createdAt.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
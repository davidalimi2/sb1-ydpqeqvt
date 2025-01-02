import React, { useState } from 'react';
import { MessageSquare, Star, User, Image } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
  featured: boolean;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = () => {
    const newTestimonial: Testimonial = {
      id: crypto.randomUUID(),
      author: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      featured: false
    };
    setTestimonials([...testimonials, newTestimonial]);
    setEditingId(newTestimonial.id);
  };

  const handleSave = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(testimonials.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer testimonials and reviews
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleAdd}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Testimonial
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white shadow rounded-lg p-6">
            {editingId === testimonial.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={testimonial.author}
                    onChange={(e) => handleSave(testimonial.id, { author: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => handleSave(testimonial.id, { role: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      value={testimonial.company}
                      onChange={(e) => handleSave(testimonial.id, { company: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    value={testimonial.content}
                    onChange={(e) => handleSave(testimonial.id, { content: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <div className="mt-1 flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleSave(testimonial.id, { rating })}
                        className={`p-1 ${
                          rating <= testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image URL
                  </label>
                  <input
                    type="text"
                    value={testimonial.imageUrl}
                    onChange={(e) => handleSave(testimonial.id, { imageUrl: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={testimonial.featured}
                    onChange={(e) => handleSave(testimonial.id, { featured: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Featured testimonial
                  </label>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {testimonial.imageUrl ? (
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.author}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(testimonial.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">{testimonial.content}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  {testimonial.featured && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Featured
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
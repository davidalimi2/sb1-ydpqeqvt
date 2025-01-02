import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoveUp, MoveDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What is legal tech?',
      answer: 'Legal tech refers to software and technology used to provide legal services...',
      category: 'General',
      order: 1
    }
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  const moveFAQ = (id: string, direction: 'up' | 'down') => {
    const index = faqs.findIndex(faq => faq.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === faqs.length - 1)
    ) {
      return;
    }

    const newFaqs = [...faqs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFaqs[index], newFaqs[targetIndex]] = [newFaqs[targetIndex], newFaqs[index]];
    
    // Update order numbers
    newFaqs.forEach((faq, i) => {
      faq.order = i + 1;
    });
    
    setFaqs(newFaqs);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">FAQ Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage frequently asked questions and answers
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setSelectedFAQ(null);
              setShowEditor(true);
            }}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </button>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {faqs.map((faq) => (
            <li key={faq.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">{faq.answer}</p>
                  <span className="mt-2 inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    {faq.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <button
                    onClick={() => moveFAQ(faq.id, 'up')}
                    disabled={faq.order === 1}
                    className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  >
                    <MoveUp className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => moveFAQ(faq.id, 'down')}
                    disabled={faq.order === faqs.length}
                    className="text-gray-400 hover:text-gray-500 disabled:opacity-50"
                  >
                    <MoveDown className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFAQ(faq);
                      setShowEditor(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setFaqs(faqs.filter(f => f.id !== faq.id));
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
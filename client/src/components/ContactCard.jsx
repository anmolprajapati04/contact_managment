import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(contact._id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <FiMail className="mr-2 flex-shrink-0" />
          <a href={`mailto:${contact.email}`} className="hover:text-blue-600 truncate">
            {contact.email}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <FiPhone className="mr-2 flex-shrink-0" />
          <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
            {contact.phone}
          </a>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          Added: {new Date(contact.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
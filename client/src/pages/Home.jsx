import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setContacts(response.data.data);
      setFilteredContacts(response.data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const response = await contactAPI.create(contactData);
      setContacts([response.data.data, ...contacts]);
      setFilteredContacts([response.data.data, ...filteredContacts]);
      toast.success('Contact added successfully!');
      setShowForm(false);
    } catch (error) {
      toast.error(error.message || 'Failed to add contact');
      throw error;
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      const response = await contactAPI.update(id, contactData);
      const updatedContacts = contacts.map(contact =>
        contact._id === id ? response.data.data : contact
      );
      setContacts(updatedContacts);
      setFilteredContacts(
        filteredContacts.map(contact =>
          contact._id === id ? response.data.data : contact
        )
      );
      toast.success('Contact updated successfully!');
      setEditingContact(null);
      setShowForm(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update contact');
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id);
        const updatedContacts = contacts.filter(contact => contact._id !== id);
        setContacts(updatedContacts);
        setFilteredContacts(
          filteredContacts.filter(contact => contact._id !== id)
        );
        toast.success('Contact deleted successfully!');
      } catch (error) {
        toast.error(error.message || 'Failed to delete contact');
      }
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  };

  const handleCancelForm = () => {
    setEditingContact(null);
    setShowForm(false);
  };

  if (loading && contacts.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Manager</h1>
        <p className="text-gray-600">Manage your contacts efficiently</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <SearchBar onSearch={handleSearch} />
        {!showForm && (
          <button
            onClick={() => {
              setEditingContact(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Contact
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <ContactForm
            onSubmit={editingContact ? 
              (data) => handleUpdateContact(editingContact._id, data) : 
              handleAddContact
            }
            initialData={editingContact}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />

      {filteredContacts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No contacts found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
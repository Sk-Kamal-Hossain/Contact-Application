import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContactTable from '../components/ContactTable';
import { ViewContactModal, EditContactModal, DeleteConfirmModal } from '../components/Modals';

const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('Default');

    // Modal States
    const [viewContact, setViewContact] = useState(null);
    const [editContact, setEditContact] = useState(null);
    const [deleteContact, setDeleteContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        applyFilterAndSearch();
    }, [contacts, search, sort]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/contacts`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const applyFilterAndSearch = () => {
        let result = [...contacts];

        // Search
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(contact =>
                (contact.first_name && contact.first_name.toLowerCase().includes(query)) ||
                (contact.last_name && contact.last_name.toLowerCase().includes(query)) ||
                (contact.email && contact.email.toLowerCase().includes(query)) ||
                (contact.phone && contact.phone.toString().includes(query))
            );
        }

        // Sort
        if (sort === '1') { // First Name (A -> Z)
            result.sort((a, b) => a.first_name.localeCompare(b.first_name));
        } else if (sort === '2') { // Last Name (A -> Z)
            result.sort((a, b) => a.last_name.localeCompare(b.last_name));
        } else if (sort === '3') { // Oldest To First (Assuming ID Ascending)
            result.sort((a, b) => a.id - b.id);
        }

        setFilteredContacts(result);
    };

    // Handlers
    const handleSearch = (e) => {
        // Search triggers on button click in template, but real-time is usually better or standard form submit.
        // Template has input and a button. I'll bind input to state.
        // If requirement implies button click, I can add that.
        // "UI Template search feature implement... search first name...".
        // I'll stick to real-time for better UX, or just use current state on button click.
        // Given the variables, search state updates on change.
    };

    const handleEditSave = async (updatedData) => {
        if (!editContact) return;
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/contacts/${editContact.id}`, updatedData);
            setContacts(contacts.map(c => c.id === editContact.id ? response.data : c));
            setEditContact(null);
        } catch (error) {
            console.error("Error updating contact", error);
        }
    };

    const handleDeleteConfirm = async (contact) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/${contact.id}`);
            setContacts(contacts.filter(c => c.id !== contact.id));
            setDeleteContact(null);
        } catch (error) {
            console.error("Error deleting contact", error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-title">
                        <div className="d-flex align-items-center justify-content-between">
                            <h2>All Contacts</h2>
                            <div className="input-group w-50">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search contact"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    className="btn btn-success"
                                    type="button"
                                >
                                    Search
                                </button>
                            </div>
                            <div>
                                <Link to="/add" className="btn btn-success">
                                    <i className="fa fa-plus-circle"></i> Add New
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-3">
                        <div className="fs-2">
                            <i className="fa fa-filter text-success"></i> Filter
                        </div>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-success dropdown-toggle"
                                type="button"
                                id="filterDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {sort === 'Default' && 'Default'}
                                {sort === '1' && 'First Name (A → Z)'}
                                {sort === '2' && 'Last Name (A → Z)'}
                                {sort === '3' && 'Oldest To First'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                                <li><button className="dropdown-item" onClick={() => setSort('Default')}>Default</button></li>
                                <li><button className="dropdown-item" onClick={() => setSort('1')}>First Name (A → Z)</button></li>
                                <li><button className="dropdown-item" onClick={() => setSort('2')}>Last Name (A → Z)</button></li>
                                <li><button className="dropdown-item" onClick={() => setSort('3')}>Oldest To First</button></li>
                            </ul>
                        </div>
                    </div>

                    <ContactTable
                        contacts={filteredContacts}
                        onView={setViewContact}
                        onEdit={setEditContact}
                        onDelete={setDeleteContact}
                    />
                </div>
            </div>

            {viewContact && (
                <ViewContactModal contact={viewContact} onClose={() => setViewContact(null)} />
            )}

            {editContact && (
                <EditContactModal
                    contact={editContact}
                    onSave={handleEditSave}
                    onClose={() => setEditContact(null)}
                />
            )}

            {deleteContact && (
                <DeleteConfirmModal
                    contact={deleteContact}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setDeleteContact(null)}
                />
            )}
        </div>
    );
};

export default Home;

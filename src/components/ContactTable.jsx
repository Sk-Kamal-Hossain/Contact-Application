import React from 'react';

const ContactTable = ({ contacts, onView, onEdit, onDelete }) => {
    return (
        <div className="card-body">
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <tr key={contact.id}>
                                <td>{index + 1}</td>
                                <td>{contact.first_name}</td>
                                <td>{contact.last_name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-circle btn-outline-info me-1"
                                        title="Show"
                                        onClick={() => onView(contact)}
                                    >
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-circle btn-outline-secondary me-1"
                                        title="Edit"
                                        onClick={() => onEdit(contact)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-circle btn-outline-danger"
                                        title="Delete"
                                        onClick={() => onDelete(contact)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No Contact Information</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ContactTable;

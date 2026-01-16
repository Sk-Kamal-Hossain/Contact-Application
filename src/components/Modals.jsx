import React from 'react';
import ContactForm from './ContactForm';

const ModalWrapper = ({ title, children, onClose }) => {
    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export const ViewContactModal = ({ contact, onClose }) => {
    return (
        <ModalWrapper title="Contact Details" onClose={onClose}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group row mb-3">
                        <label className="col-md-3 col-form-label">First Name</label>
                        <div className="col-md-9">
                            <p className="form-control-plaintext text-muted">{contact.first_name}</p>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-md-3 col-form-label">Last Name</label>
                        <div className="col-md-9">
                            <p className="form-control-plaintext text-muted">{contact.last_name}</p>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-md-3 col-form-label">Email</label>
                        <div className="col-md-9">
                            <p className="form-control-plaintext text-muted">{contact.email}</p>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-md-3 col-form-label">Phone</label>
                        <div className="col-md-9">
                            <p className="form-control-plaintext text-muted">{contact.phone}</p>
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="col-md-3 col-form-label">Address</label>
                        <div className="col-md-9">
                            <p className="form-control-plaintext text-muted">{contact.address}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="text-end">
                        <button className="btn btn-outline-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export const EditContactModal = ({ contact, onSave, onClose }) => {
    return (
        <ModalWrapper title="Edit Contact" onClose={onClose}>
            <ContactForm initialData={contact} onSubmit={onSave} onCancel={onClose} isEdit={true} />
        </ModalWrapper>
    );
};

export const DeleteConfirmModal = ({ contact, onConfirm, onClose }) => {
    return (
        <ModalWrapper title="Delete Contact" onClose={onClose}>
            <div className="alert alert-danger">
                Are you sure you want to delete this contact?
            </div>
            <div className="text-end">
                <button className="btn btn-danger me-2" onClick={() => onConfirm(contact)}>Delete</button>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
        </ModalWrapper>
    );
};

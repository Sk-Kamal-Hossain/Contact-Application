import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ContactForm = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group row mb-3">
                <label htmlFor="first_name" className="col-md-3 col-form-label">First Name</label>
                <div className="col-md-9">
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="last_name" className="col-md-3 col-form-label">Last Name</label>
                <div className="col-md-9">
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="email" className="col-md-3 col-form-label">Email</label>
                <div className="col-md-9">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="phone" className="col-md-3 col-form-label">Phone</label>
                <div className="col-md-9">
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="address" className="col-md-3 col-form-label">Address</label>
                <div className="col-md-9">
                    <textarea
                        name="address"
                        id="address"
                        rows="3"
                        className="form-control"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
            <hr />
            <div className="form-group row mb-0">
                <div className="col-md-9 offset-md-3">
                    <button type="submit" className="btn btn-primary me-2">Save</button>
                    {onCancel ? (
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                    ) : (
                        <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ContactForm;

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const AddContact = () => {
    const navigate = useNavigate();

    const handleSave = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/contacts`, data);
            navigate('/');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div className="row justify-content-md-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header card-title">
                        <strong>Add New Contact</strong>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <ContactForm onSubmit={handleSave} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContact;

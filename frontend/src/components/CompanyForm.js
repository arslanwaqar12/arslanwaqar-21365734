import React, { useState } from 'react';

const CompanyForm = ({ setCompanies, companies }) => {
    const [company_name, setCompanyName] = useState('');
    const [company_address, setCompanyAddress] = useState('');
    const [contact_id, setContactId] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const companyData = {
            company_name,
            company_address,
            contact_id
        };

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:5000/api/companies/${editingId}`
            : 'http://localhost:5000/api/companies';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(companyData)
        })
            .then(response => response.json())
            .then(data => {
                if (editingId) {
                    setCompanies(companies.map(c => (c.company_id === editingId ? data : c)));
                } else {
                    setCompanies([...companies, data]);
                }
                clearForm();
            })
            .catch(error => console.error('Error adding/updating company:', error));
    };

    const clearForm = () => {
        setCompanyName('');
        setCompanyAddress('');
        setContactId('');
        setEditingId(null);
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '20px',
        width: '300px'
    };

    const buttonStyle = {
        backgroundColor: editingId ? 'green' : 'green',
        color: 'white',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px',
    };

    const clearButtonStyle = {
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '10px',
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Company Name"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company Address"
                value={company_address}
                onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <input
                type="number"
                placeholder="Contact ID"
                value={contact_id}
                onChange={(e) => setContactId(e.target.value)}
            />
            <button type="submit" style={buttonStyle}>{editingId ? 'Update Company' : 'Add Company'}</button>
            <button type="button" style={clearButtonStyle} onClick={clearForm}>Clear Form</button>
        </form>
    );
};

export default CompanyForm;

import React, { useEffect, useState } from 'react';
import CompanyForm from './CompanyForm';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    const deleteCompany = (company_id) => {
        fetch(`http://localhost:5000/api/companies/${company_id}`, {
            method: 'DELETE'
        })
            .then(() => setCompanies(companies.filter(company => company.company_id !== company_id)))
            .catch(error => console.error('Error deleting company:', error));
    };

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
    };

    const itemStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    };

    const deleteButtonStyle = {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        borderRadius: '5px',
    };

    return (
        <div>
            <h2>Companies</h2>
            <CompanyForm setCompanies={setCompanies} companies={companies} />
            <ul style={listStyle}>
                {companies.map(company => (
                    <li key={company.company_id} style={itemStyle}>
                        <div>
                            <strong>{company.company_name}</strong> - {company.company_address}
                        </div>
                        <button
                            onClick={() => deleteCompany(company.company_id)}
                            style={deleteButtonStyle}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;

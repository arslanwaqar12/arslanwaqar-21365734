import { useState, useEffect } from 'react';
import Contact from './Contact.js';
import NewContact from './NewContact.js';

function ContactList(props) {
    // Initialize contacts as an empty array
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => {
                // Ensure we are working with an array
                setContacts(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
                // In case of an error, we can set contacts to an empty array
                setContacts([]);
            });
    }, []);  

    return (
        <div className='contact-list'>
            <h2>Contacts</h2>

            {/* Pass down the contacts and setContacts function */}
            <NewContact contacts={contacts} setContacts={setContacts} />

            <hr />

            {/* Check if contacts is an array and has length, otherwise show a message */}
            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <Contact key={contact.id} contact={contact} contacts={contacts} setContacts={setContacts} />
                ))
            ) : (
                <p>No contacts available.</p>
            )}
        </div>
    );
}

export default ContactList;

import { useState } from 'react';

function NewPhone(props) {
    const { contact, phones, setPhones } = props;
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setName('');
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* Replacing input with a drop down selction */}
            <select 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            >
                <option value="" disabled>Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
            </select>

            <input 
                type='text' 
                placeholder='Phone Number' 
                onChange={(e) => setNumber(e.target.value)} 
                value={number}
            />
            {/* Replacing add button with person add name button */}
            <button className='button green' type='submit'>
                Add {contact.name}'s Phone
            </button>
        </form>
    );
}

export default NewPhone;

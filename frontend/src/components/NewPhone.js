import { useState } from 'react';

function NewPhone(props) {
    const { contact, phones, setPhones } = props;
    const [phone_number, setPhoneNumber] = useState('');  // Use phone_number
    const [phone_type, setPhoneType] = useState('');  // Use phone_type

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_number,  // Use phone_number instead of number
                phone_type  // Use phone_type instead of name
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setPhoneNumber('');
        setPhoneType('');
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            {/* Dropdown for phone type (Work, Personal, etc.) */}
            <select 
                value={phone_type} 
                onChange={(e) => setPhoneType(e.target.value)}
            >
                <option value="" disabled>Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
            </select>

            {/* Input for phone number */}
            <input 
                type='text' 
                placeholder='Phone Number' 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                value={phone_number}
            />
            {/* Button label updated to include contact's name */}
            <button className='button green' type='submit'>
                Add {contact.name}'s Phone
            </button>
        </form>
    );
}

export default NewPhone;

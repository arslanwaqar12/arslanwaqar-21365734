function Phone(props) {
    const { contact, phone, phones, setPhones } = props;

    async function deletePhone() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones/' + phone.id, {
            method: 'DELETE',
        });

        let newPhones = phones.filter((p) => {
            return p.id !== phone.id;
        });

        setPhones(newPhones);
    }

    return (
        <tr>
            <td>{ phone.phone_type }</td> {/* Use phone_type */}
            <td>{ phone.phone_number }</td> {/* Use phone_number */}
            <td style={{ width: '14px' }}>
                <button className="button red" onClick={deletePhone}>Delete</button>
            </td>
        </tr>
    );
}

export default Phone;

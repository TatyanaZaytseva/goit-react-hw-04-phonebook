import { useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactsList } from '../ContactsList/ContactsList';
import { Filter } from '../Filter/Filter';
import css from 'components/App/App.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts) {
    //   setContacts({ contacts: parsedContacts });
    // }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    console.log(data);
    const { name } = data;
    const nameToLowerCase = name.toLowerCase();
    const nameDuplication = contacts.find(
      contact => contact.name.toLowerCase() === nameToLowerCase
    );
    nameDuplication
      ? alert(`${data.name} is already in contacts`)
      : setContacts([data, ...contacts]);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    const contactToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactToLowerCase)
    );
  };

  const onDeleteContact = contactID => {
    setContacts(prevState =>
      prevState.contacts.filter(contact => contact.id !== contactID)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2 className={css.title}>Contacts</h2>
      <Filter contacts={filter} onFilter={handleFilter} />
      <ContactsList
        contacts={filterContacts}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactsList } from '../ContactsList/ContactsList';
import { getContactsFtomStorage } from 'utils/localStorage';
import { saveContactsToStorage } from 'utils/localStorage';
import { Filter } from '../Filter/Filter';
import { nanoid } from 'nanoid';
import css from 'components/App/App.module.css';

export function App() {
  const STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState(
    getContactsFtomStorage(STORAGE_KEY) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveContactsToStorage(contacts);
  }, [contacts]);

  const formSubmitHandler = data => {
    const { name } = data;
    const nameToLowerCase = name.toLowerCase();
    const nameDuplication = contacts.find(
      contact => contact.name.toLowerCase() === nameToLowerCase
    );
    nameDuplication
      ? alert(`${data.name} is already in contacts`)
      : setContacts([...contacts, { ...data, id: nanoid() }]);
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
    setContacts(contacts.filter(contact => contact.id !== contactID));
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

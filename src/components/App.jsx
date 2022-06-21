import React, { Component } from "react"
import s from './App.module.css'
import ContactsList from './ContactList/ContactList';
import Form from './Form/Form';
import Filter from './Filter/Filter';


export  class App extends Component{

  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount(){
    const saveContacts = localStorage.getItem('contacts');
    const parsedSaveContacts = JSON.parse(saveContacts);
    if (parsedSaveContacts){
      this.setState({contacts: parsedSaveContacts})
    }

  };
  componentDidUpdate(prevProps, prevState){

    if(this.state.contacts !== prevState){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  saveContact = newContact => {
    this.state.contacts.find(contact => contact.name === newContact.name)
      ? this.showAlert(newContact.name)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };
  showAlert = name => {
    const message = `${name} is already in contacts`;
    alert(message);
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 18,
        }}
      >
        <h2 className={s.title}>Phonebook</h2>
        <div className={s.wrapper__phonebook}>
          <Form saveContact={this.saveContact} />
        </div>

        <h2 className={s.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <div className={s.wrapper__contacts}>
          {contacts.length !== 0 ? (
            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}



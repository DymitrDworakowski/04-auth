const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

console.log(contactsPath);

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' }); // # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find(contact => contact.id === contactId) || null;

  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const newContact = [...data.slice(0, index), ...data.slice(index + 1)];
  await write(newContact);

  return data[index] ;

  //  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {id: crypto.randomUUID(),...data} ;

  contacts.push(newContact);
  await write(contacts);

  return newContact;
}

//  Повертає об'єкт доданого контакту.

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

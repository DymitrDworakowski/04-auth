const fs = require('node:fs/promises');
const path = require('node:path');  
const crypto = require('node:crypto');


const contactsPath = path.join(__dirname,"db", "contacts.json");
    
console.log(contactsPath);

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}
    
async function listContacts() {
 const data = await fs.readFile(contactsPath, { encoding: "utf-8" }); // Повертає масив контактів.
return JSON.parse(data);
}

async function getContactById(contactId) {
    const data = await listContacts();
    return data.find((contact) => contact.id === contactId);
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return undefined;
    }
    const newContact = [
        ...data.slice(0, index),
        ...data.slice(index + 1),
    ];
    await write(newContact);

    return data[index];

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID()};

    data.push(newContact);
    await write(data);
    
    return newContact;

}


  // ...твій код. Повертає об'єкт доданого контакту. 


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
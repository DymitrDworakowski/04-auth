const contacts = require("./contacts.js");

// contacts.listContacts().then((data) => console.log(data)).catch((err) => console.error(err));

// contacts.getContactById('drsAJ4SHPYqZeG-83QTVW').then((data) => console.log(data)).catch((err) => console.error(err));
contacts.removeContact('6e7a3222-4ba3-48e1-bc36-65771ddfd7d4').then((data) => console.log(data)).catch((err) => console.error(err));

// contacts.addContact({name:"LOX", email:"lo@p", phone: "243434"}).then((data) => console.log(data)).catch((err) => console.error(err));
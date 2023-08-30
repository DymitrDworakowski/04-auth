const Contacts = require('./contacts.js'); 

const { Command } = require('commander');
const program = new Command();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      return Contacts.listContacts();

    case 'get':
      return Contacts.getContactById(id);

    case 'add':
      return Contacts.addContact({ name, email, phone });

    case 'remove':
      return Contacts.removeContact(id);

    default:
      console.warn('\x1B[31m Unknown action type!');
      return Promise.reject('Unknown action type');
  }
}

program
  .option('-a, --action <list>', 'choose action')
  .option('-i, --id <get>', 'user id')
  .option('-n, --name <add>', 'user name')
  .option('-e, --email <add>', 'user email')
  .option('-p, --phone <add>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

invokeAction(argv)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
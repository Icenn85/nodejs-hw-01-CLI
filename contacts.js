const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readContacts() {
    try {
        const dataContacts = await fs.readFile(contactsPath);
        const contacts = JSON.parse(dataContacts);
        return contacts;
    } catch (error) {
        console.log(error);
    }
}

async function writeContacts(contacts) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.log(error);
    }
}

async function listContacts() {
    try {
        const contacts = await readContacts();
        console.table(contacts);
        return contacts;
    } catch (error) {
    console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await readContacts();
        const resultContact = await contacts.find(({ id }) => id === contactId);
        console.table(resultContact);
        return resultContact;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await readContacts();
        const updatedContacts = contacts.filter(
            (contact) => contact.id !== contactId
        );
        await writeContacts(updatedContacts);
        console.table(updatedContacts);
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const id = nanoid();
        const contacts = await readContacts();
        const newContact = { id, name, email, phone };
        contacts.push(newContact);
        await writeContacts(contacts);
        console.table(contacts);

    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
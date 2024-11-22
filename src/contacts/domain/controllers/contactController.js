import Contact from '../../data/models/contact.js'
import * as contactRepository from '../../data/repositories/contactRepository.js'
import { contactErrors } from '../errors/contactErrors.js';

export const postContact = async (userId, name, lastName, phone, address) => {
    const contactId = `${name.toLowerCase()}-${lastName.toLowerCase()}`;
    const newContact = new Contact(name, lastName, phone, address);
    const contactExists = await contactRepository.contactExists(userId, contactId);

    if (contactExists) {
        const error = new Error('Contact already exists');
        error.code = contactErrors.CONTACT_ALREADY_EXISTS;
        throw error;
    } else {
        await contactRepository.saveContact(userId, contactId, newContact);
        return contactId;
    }
};

export const putContact = async (userId, contactId, phone, address) => {
    await contactRepository.updateContact(userId, contactId, phone, address);
};

export const deleteContact = async (userId, contactId) => {
    await contactRepository.deleteContact(userId, contactId);
};
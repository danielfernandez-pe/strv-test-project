import { getFirestore } from 'firebase-admin/firestore';
import { contactErrors } from '../../domain/errors/contactErrors.js';

export const contactExists = async (userId, contactId) => {
    const db = getFirestore();
    const docRef = db
        .collection('users')
        .doc(userId)
        .collection('contacts')
        .doc(contactId);

    const doc = await docRef.get();
    return doc.exists;
};

export const saveContact = async (userId, contactId, contact) => {
    const db = getFirestore();
    const docRef = db
        .collection('users')
        .doc(userId)
        .collection('contacts')
        .doc(contactId);
    
    await docRef.set(contact.toObject());
};

export const updateContact = async (userId, contactId, phone, address) => {
    const db = getFirestore();
    const updatedContact = {
        phone: phone,
        address: address
    }
    const docRef = db
        .collection('users')
        .doc(userId)
        .collection('contacts')
        .doc(contactId);

    await docRef.update(updatedContact);
};

export const deleteContact = async (userId, contactId) => {
    const docExists = await contactExists(userId, contactId);

    if (docExists) {
        const db = getFirestore();
        const docRef = db
            .collection('users')
            .doc(userId)
            .collection('contacts')
            .doc(contactId);

        await docRef.delete();
    } else {
        const error = new Error('Contact missing');
        error.code = contactErrors.CONTACT_NOT_FOUND;
        throw error;
    }
};
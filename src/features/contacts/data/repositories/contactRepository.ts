import { getFirestore } from 'firebase-admin/firestore';
import { contactErrors } from '../../domain/errors/contactErrors';
import Contact from '../models/contact';
import CustomError from '../../../../utils/customError';

export default class ContactRepository {
    async contactExists(userId: string, contactId: string): Promise<boolean> {
        const db = getFirestore();
        const docRef = db
            .collection('users')
            .doc(userId)
            .collection('contacts')
            .doc(contactId);

        const doc = await docRef.get();
        return doc.exists;    
    }

    async saveContact(userId: string, contactId: string, contact: Contact) {
        const db = getFirestore();
        const docRef = db
            .collection('users')
            .doc(userId)
            .collection('contacts')
            .doc(contactId);
        
        await docRef.set(contact.toObject());
    }

    async updateContact(userId: string, contactId: string, phone: string, address: string) {
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
    }

    async deleteContact(userId: string, contactId: string) {
        const docExists = await this.contactExists(userId, contactId);

        if (docExists) {
            const db = getFirestore();
            const docRef = db
                .collection('users')
                .doc(userId)
                .collection('contacts')
                .doc(contactId);
    
            await docRef.delete();
        } else {
            const error = new CustomError(contactErrors.CONTACT_NOT_FOUND);
            throw error;
        }
    }
}
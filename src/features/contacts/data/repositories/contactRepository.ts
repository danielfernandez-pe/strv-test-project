import { getFirestore, DocumentReference } from 'firebase-admin/firestore';
import Contact from '../../domain/models/contact';
import CustomError from '../../../../utils/customError';
import ContactRepositoryType from '../../domain/repositories/contactRepositoryType';
import { contactErrors } from '../../domain/errors/contactErrors';

export default class ContactRepository implements ContactRepositoryType {
    private userCollection = 'users';
    private contactCollection = 'contacts';

    async contactExists(userId: string, contactId: string): Promise<boolean> {
        const doc = await this.getDocRef(userId, contactId).get();
        return doc.exists;    
    }

    async saveContact(userId: string, contactId: string, contact: Contact) {
        const docRef = this.getDocRef(userId, contactId)
        await docRef.set(contact.toObject());
    }

    async updateContact(userId: string, contactId: string, phone: string, address: string) {
        const updatedContact = {
            phone: phone,
            address: address
        }
        const docRef = this.getDocRef(userId, contactId)
        await docRef.update(updatedContact);
    }

    async deleteContact(userId: string, contactId: string) {
        const docExists = await this.contactExists(userId, contactId);

        if (docExists) {
            const docRef = this.getDocRef(userId, contactId)
            await docRef.delete();
        } else {
            const error = new CustomError(contactErrors.CONTACT_NOT_FOUND);
            throw error;
        }
    }

    private getDocRef(userId: string, contactId: string): DocumentReference {
        const db = getFirestore();
        const docRef = db
            .collection(this.userCollection)
            .doc(userId)
            .collection(this.contactCollection)
            .doc(contactId);
        return docRef;
    }
}
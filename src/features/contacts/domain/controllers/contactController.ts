import Contact from '../models/contact'
import ContactRepositoryType from '../repositories/contactRepositoryType';
import CustomError from '../../../../utils/customError';
import { contactErrors } from '../errors/contactErrors';

export interface ContactControllerType {
    postContact(userId: string, name: string, lastName: string, phone: string, address: string): Promise<string>
    putContact(userId: string, contactId: string, phone: string, address: string): void
    deleteContact(userId: string, contactId: string): void
}

export class ContactController implements ContactControllerType {
    contactRepository: ContactRepositoryType;

    constructor(contactRepository: ContactRepositoryType) {
        this.contactRepository = contactRepository;
    }

    async postContact(userId: string, name: string, lastName: string, phone: string, address: string): Promise<string> {
        const contactId = `${name.toLowerCase()}-${lastName.toLowerCase()}`;
        const newContact = new Contact(name, lastName, phone, address);
        const contactExists = await this.contactRepository.contactExists(userId, contactId);
        if (contactExists) {
            const error = new CustomError(contactErrors.CONTACT_ALREADY_EXISTS);
            throw error;
        } else {
            await this.contactRepository.saveContact(userId, contactId, newContact);
            return contactId;
        }
    }

    async putContact(userId: string, contactId: string, phone: string, address: string) {
        await this.contactRepository.updateContact(userId, contactId, phone, address);
    }

    async deleteContact(userId: string, contactId: string) {
        await this.contactRepository.deleteContact(userId, contactId);
    }
}
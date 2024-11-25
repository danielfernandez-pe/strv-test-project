import Contact from '../models/contact';

export default interface ContactRepositoryType {
    contactExists(userId: string, contactId: string): Promise<boolean>
    saveContact(userId: string, contactId: string, contact: Contact): void
    updateContact(userId: string, contactId: string, phone: string, address: string): void
    deleteContact(userId: string, contactId: string): void
}
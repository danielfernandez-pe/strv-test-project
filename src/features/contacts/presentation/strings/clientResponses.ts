export const clientResponses: Record<string, string> = {
    CONTACT_CREATE_SUCCESS: 'Contact added!',
    CONTACT_CREATE_ERROR_ALREADY_EXISTS: 'Contact already exists. Use PUT Http method to update contact',
    CONTACT_CREATE_ERROR_GENERIC: 'Failed to add contact',
    CONTACT_UPDATE_SUCCESS: 'Contact updated!',
    CONTACT_UPDATE_ERROR_GENERIC: 'Failed to update contact',
    CONTACT_NOT_FOUND: 'Contact not found',
    CONTACT_DELETE_SUCCESS: 'Contact deleted!',
    CONTACT_DELETE_ERROR_GENERIC: 'Failed to delete contact'
}
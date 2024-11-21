
import logger from '../../../../utils/logger.js';
import Contact from '../../data/models/contact.js'
import * as contactRepository from '../../data/repositories/contactRepository.js'

export const postContact = async (req, res, next) => {
    const { name, lastName, phone, address } = req.body;
    const contactId = `${name.toLowerCase()}-${lastName.toLowerCase()}`;
    const newContact = new Contact(name, lastName, phone, address);

    try {
        const contactExists = await contactRepository.contactExists(req.userId, contactId);

        if (contactExists) {
            res.status(400).json({ 
                message: 'Contact already exists. Use PUT Http method to update contact' 
            });
        } else {
            console.log(newContact);
            await contactRepository.saveContact(req.userId, contactId, newContact);
        
            res.status(201).json({
                message: 'Contact added!',
                contactId: contactId
            });
        }
    } catch(error) {
        logger.error(error);
        res.status(500).json({ 
            message: 'Failed to add contact' 
        });
    }
};

export const putContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { phone, address } = req.body;

    try {
        await contactRepository.updateContact(req.userId, contactId, phone, address);
        
        res.status(200).json({
            message: 'Contact updated!',
            contactId: contactId
        });
    } catch(error) {
        logger.error(error);
        res.status(500).json({ 
            message: 'Failed to update contact' 
        });
    }
};

export const deleteContact = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        await contactRepository.deleteContact(req.userId, contactId);

        res.status(200).json({
            message: 'Contact deleted!',
            contactId: contactId
        });
    } catch(error) {
        logger.error(error);
        res.status(500).json({ 
            message: 'Failed to delete contact' 
        });
    }
};
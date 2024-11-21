import { getFirestore } from 'firebase-admin/firestore';
import logger from '../utils/logger.js';

export const postContact = async (req, res, next) => {
    const { name, lastName, phone, address } = req.body;
    const id = `${name.toLowerCase()}-${lastName.toLowerCase()}`;

    const newContact = {
        name: name,
        lastName: lastName,
        phone: phone,
        address: address
    }

    const db = getFirestore();
    const docRef = db
        .collection('users')
        .doc(req.userId)
        .collection('contacts')
        .doc(id);

    try {
        const doc = await docRef.get();

        if (doc.exists) {
            res.status(400).json({ 
                message: 'Contact already exists. Use PUT Http method to update contact' 
            });
        } else {
            await docRef.set(newContact);
        
            res.status(201).json({
                message: 'Contact added!',
                id: id
            });
        }
    } catch {
        res.status(500).json({ 
            message: 'Failed to add contact' 
        });
    }
};

export const putContact = async (req, res, next) => {
    const { id } = req.params;
    const { phone, address } = req.body;

    const updatedContact = {
        phone: phone,
        address: address
    }

    const db = getFirestore();
    const docRef = db
        .collection('users')
        .doc(req.userId)
        .collection('contacts')
        .doc(id);

    try {
        await docRef.update(updatedContact);
        res.status(200).json({
            message: 'Contact updated!',
            id: id
        });
    } catch {
        res.status(500).json({ 
            message: 'Failed to update contact' 
        });
    }
};

export const deleteContact = async (req, res, next) => {
    const { id } = req.params;

    const db = getFirestore();
    const docRef = db
        .collection('users')
        .doc(req.userId)
        .collection('contacts')
        .doc(id);

    try {
        await docRef.delete();
        res.status(200).json({
            message: 'Contact deleted!',
            id: id
        });
    } catch {
        res.status(500).json({ 
            message: 'Failed to delete contact' 
        });
    }
};
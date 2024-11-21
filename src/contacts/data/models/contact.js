export default class Contact {
    constructor(name, lastName, phone, address) {
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
    }

    toObject() {
        return {
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            address: this.address
        };
    }
}
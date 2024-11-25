export default class Contact {
    name: string;
    lastName: string;
    phone: string;
    address: string;

    constructor(name: string, lastName: string, phone: string, address: string) {
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
    }

    toObject(): Record<string, string> {
        return {
            name: this.name,
            lastName: this.lastName,
            phone: this.phone,
            address: this.address
        };
    }
}
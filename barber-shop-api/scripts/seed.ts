import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import Treatment from '../models/treatment';

const parseCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser({mapHeaders: ({header}) => header.trim()}))
            .on("data", (data) => {
                console.log("Parsed data:", data);
                results.push(data);
            })
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
};

const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
};

const seedData = async () => {
    try {
        console.log("Checking if database needs seeding...");

        const userCount = await User.countDocuments();
        const treatmentsCount = await Treatment.countDocuments();

        if (userCount > 0 && treatmentsCount > 0) {
            console.log("Database already has users and treatments. Skipping seeding.");
            return;
        }

        console.log("Seeding data...");

        if (userCount === 0) {
            const admins = await parseCSV(path.join(__dirname, '../../bootstrap/csv/admins.csv'));
            const hashedAdmins = await Promise.all(admins.map(async (admin) => { 
                admin.password = await hashPassword(admin.password);
                return admin;
            }));
            await User.insertMany(hashedAdmins);
            console.log(`Seeded ${hashedAdmins.length} admin.`);

            const barbers = await parseCSV(path.join(__dirname, '../../bootstrap/csv/barbers.csv'));
            const hashedBarbers = await Promise.all(barbers.map(async (barber) => { 
                barber.password = await hashPassword(barber.password);
                return barber;
            }));
            await User.insertMany(hashedBarbers);
            console.log(`Seeded ${hashedBarbers.length} barbers.`);

            const customers = await parseCSV(path.join(__dirname, '../../bootstrap/csv/customers.csv'));
            const hashedCustomers = await Promise.all(customers.map(async (customer) => { 
                customer.password = await hashPassword(customer.password);
                return customer;
            }));
            await User.insertMany(hashedCustomers);
            console.log(`Seeded ${hashedCustomers.length} customers.`);
        }

        if (treatmentsCount === 0) {
            const treatments = await parseCSV(path.join(__dirname, '../../bootstrap/csv/treatments.csv'));
            await Treatment.insertMany(treatments);
            console.log(`Seeded ${treatments.length} treatments.`);
        }

        console.log("Seeding complete");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

export default seedData;
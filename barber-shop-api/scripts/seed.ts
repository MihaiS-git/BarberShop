import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import User from '../models/user';
import Treatment from '../models/treatment';

const parseCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser({ mapHeaders: ({ header }) => header.trim() }))
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

        const barberDocs: mongoose.Document[] = await User.find({ role: 'barber' });
        const treatmentDocs: mongoose.Document[] = await Treatment.find({});

        if (barberDocs.length > 0 && treatmentDocs.length > 0) {
            console.log("Assigning treatments to barbers...");

            let barberIndex = 0;
            const barberMap = new Map();

            for (const treatment of treatmentDocs) {
                const barber = barberDocs[barberIndex] as mongoose.Document & { _id: mongoose.Types.ObjectId };

                if (!barberMap.has(barber._id.toString())) {
                    barberMap.set(barber._id.toString(), []);
                }

                barberMap.get(barber._id.toString()).push(treatment._id);

                barberIndex = (barberIndex + 1) % barberDocs.length;
            }

            console.log(barberMap);

            for (const [barberId, treatmentIds] of barberMap.entries()) {
                await User.findByIdAndUpdate(barberId, { $set: { treatmentIds } })
            }

            for (const treatment of treatmentDocs) {
                const assignedBarbers = (barberDocs as (mongoose.Document & { _id: mongoose.Types.ObjectId })[])
                    .filter((barber) => barberMap.get(barber._id.toString())?.includes(treatment._id));

                await Treatment.findByIdAndUpdate(treatment._id, {
                    $set: { barberIds: assignedBarbers.map(barber => barber._id) }
                });
            }

            console.log("Barbers and treatments updated successfully.");
        }

        console.log("Seeding complete");
    } catch (error) {
        console.error("Seeding error:", error);
    }
}

export default seedData;
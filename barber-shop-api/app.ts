import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import seedData from './scripts/seed';
import authRoutes from './routes/auth';
import treatmentsRoutes from './routes/treatments';
import usersRoutes from './routes/users';
import appointmentsRoutes from './routes/appointments';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
const PORT = process.env.PORT;

const app = express();

const allowedOrigins = ['http://localhost:5173']; // Add production domains later

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies or authentication headers
}));

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */

app.use('/auth', authRoutes);
app.use(treatmentsRoutes);
app.use(usersRoutes);
app.use(appointmentsRoutes);

app.use((error: any, req: any, res: any, next: any) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB...");
        try {
            await seedData();
            console.log("Database seeded successfully.");
        } catch (error) {
            console.error("Seeding failed: ", error);
        }
        app.listen(PORT || 8080, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch((error) => {
        console.error("Database connection failed: ", error);
    });

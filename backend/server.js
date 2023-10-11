import express from 'express';
import colors from 'colors';
import sendMedicationReminders from './helper/sendMedicationReminders.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import reminderRoutes from './routes/reminderRoute.js';
import cors from 'cors';
import mongoose from 'mongoose';
import schedule from  'node-schedule'
dotenv.config();


const app = express()
// databus.connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected".bgGreen.yellow);
    } catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white)
    }
}
connectDB();

// middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reminder', reminderRoutes);

sendMedicationReminders();
schedule.scheduleJob('0 0 * * *', sendMedicationReminders);

// rest api
app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`.bgRed.white))
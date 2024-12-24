import mongoose from 'mongoose';  // ES Module import syntax

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // Reduce connection time
            socketTimeoutMS: 45000          // Increase socket timeout
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

export default connectDB;

import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        console.log(process.env.MONGO_URI, 'ui')
        const connection = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Connected to MongoDB');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectToDatabase;

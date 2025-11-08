// import mongoose from 'mongoose';

// const connectDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;

//     if (!mongoURI) {
//       throw new Error('MONGODB_URI is not defined in environment variables');
//     }

//     console.log('🔄 Connecting to MongoDB...');
    
//     const conn = await mongoose.connect(mongoURI, {
//       bufferCommands: false,
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     console.log(`📊 Database: ${conn.connection.name}`);
//   } catch (error: any) {
//     console.error('❌ MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from 'mongoose';

let isConnected = false; // Track connection status

const connectDB = async (): Promise<void> => {
  // If already connected, return immediately
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    isConnected = false;
    // Don't exit in serverless - just throw error
    throw error;
  }
};

export default connectDB;
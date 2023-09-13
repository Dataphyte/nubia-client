import _mongoose, { connect } from 'mongoose';

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const DATABASE_URL: string = process.env.DATABASE_URL as string;

if (!DATABASE_URL || DATABASE_URL.length === 0) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('🚀 Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(DATABASE_URL!, opts)
      .then((mongoose) => {
        console.log('✅ New connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ Connection to database failed');
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.promise;
}

export default connectDB;

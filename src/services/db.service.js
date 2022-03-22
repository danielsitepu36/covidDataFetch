import mongoose from 'mongoose';
import 'dotenv/config';

function connectDB() {
  const url = process.env.DBurl;

  mongoose.connect(url, { useNewUrlParser: true });
  const con = mongoose.connection;

  con.on('open', () => {
    console.log('Connected...');
  });
}

export default connectDB;

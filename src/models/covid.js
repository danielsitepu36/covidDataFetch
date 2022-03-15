import mongoose from 'mongoose';

const covidSchema = new mongoose.Schema({
  penambahan: {
    jumlah_positif: {
      type: Number,
      required: true,
    },
    jumlah_meninggal: {
      type: Number,
      required: true,
    },
    jumlah_sembuh: {
      type: Number,
      required: true,
    },
    jumlah_dirawat: {
      type: Number,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
  },
  total: {
    jumlah_positif: {
      type: Number,
      required: true,
    },
    jumlah_meninggal: {
      type: Number,
      required: true,
    },
    jumlah_sembuh: {
      type: Number,
      required: true,
    },
    jumlah_dirawat: {
      type: Number,
      required: true,
    },
  },
});

// module.exports = mongoose.model('Additional', covidSchema);
export default mongoose.model('Covid', covidSchema);

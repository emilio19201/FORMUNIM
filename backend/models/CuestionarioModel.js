// models/CuestionarioModel.js
import mongoose from 'mongoose';

const CuestionarioSchema = new mongoose.Schema({
  pregunta1: { type: Number, required: true },
  pregunta2: { type: Number, required: true },
  pregunta3: { type: Number, required: true },
  pregunta4: { type: Number, required: true },
  pregunta5: { type: Number, required: true },
  pregunta6: { type: Number, required: true },
  pregunta7: { type: Number, required: true },
  pregunta8: { type: Number, required: true },
  pregunta9: { type: Number, required: true },
  pregunta10: { type: Number, required: true },
}, { timestamps: true });

export const CuestionarioModel = mongoose.model('Cuestionario', CuestionarioSchema);

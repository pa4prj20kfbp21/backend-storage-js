import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const plantPartSchema = new Schema({
    EasyId: { type: Number, required: true },
    Name: { type: String, required: true },
}, { // In production, the createdDate field can be used to estimate age of plant part.
    timestamps: {}
});

const PlantPart = mongoose.model('plant_part', plantPartSchema);

export { PlantPart };
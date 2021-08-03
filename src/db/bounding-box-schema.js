import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const boundingBoxSchema = new Schema({
    X: { type: Number , required: true },
    Y: { type: Number , required: true },
    Height: { type: Number , required: true },
    Width: { type: Number , required: true },
    Color: { type: String, required: true },
    ObjectID: { type: Schema.Types.ObjectId, ref: 'object_data' }
}, {
    timestamps: {}
});

const BoundingBoxData = mongoose.model('bounding_box', boundingBoxSchema);

export { BoundingBoxData };
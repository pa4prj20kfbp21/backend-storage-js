import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const model2DSchema = new Schema({
    ImageURL: { type: String, required: true }, // Will refer to working directory as relative.
    BoundingBoxes: [{ type: Schema.Types.ObjectId, ref: 'bounding_box' }]
}, {
    timestamps: {}
});

const Model2D = mongoose.model('rgb_image', model2DSchema);

export { Model2D };
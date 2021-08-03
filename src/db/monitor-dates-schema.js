import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const monitorDatesSchema = new Schema({
    Name: { type: String },
    MonitorDate: { type: Date, required: true },
    RGBImages: [{ type: Schema.Types.ObjectId, ref: 'rgb_image' }],
    EnvironmentConditions: { type: Schema.Types.ObjectId, ref: 'object_data' }
}, {
    timestamps: {}
});

const MonitorDates = mongoose.model('monitor_date', monitorDatesSchema);

export { MonitorDates };
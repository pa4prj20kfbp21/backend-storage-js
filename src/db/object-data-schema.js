import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/*
    Flexible way to note down results of target object in the data field.

    For example:
    Tomato has volume but leaf does not so eager fetch methods can yield:
    {
        Data: {
            Volume: "55ml",
            Taken: "2021-06-09"
        },
        Object: {
            Name: "Tomato",
            EasyId: 1,
        }

    },{
        Data: {
            Length: "10cm",
            Area: "24cm^2",
            Taken: "2021-06-09"
        },
        Object: {
            Name: "Leaf",
            EasyId: 2,
        }

    }

    Can also be used to display generic information of snapshot such as temperature, humidity.
*/
const objectDataSchema = new Schema({
    Data: { type: Schema.Types.Mixed, required: true }, // Flexible data storage field.
    Object: { type: Schema.Types.ObjectId, ref: 'plant_data' }
}, {
    timestamps: {}
});

const ObjectData = mongoose.model('object_data', objectDataSchema);

export { ObjectData };
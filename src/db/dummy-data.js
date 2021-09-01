import { BoundingBoxData } from "./bounding-box-schema"
import { Model2D } from "./model-2d-schema"
import { MonitorDates } from "./monitor-dates-schema"
import { ObjectData } from "./object-data-schema"
import { PlantPart } from "./plant-part-schema"

/*
    Mainly for development/testing purposes.
*/

// IDs 0 to 3 for 20210506, rest for 20210507
const plantPart = [
    new PlantPart({
        EasyId: 0,
        Name: "Red Tomato",
        createdAt: 1620302400000
    }),
    new PlantPart({
        EasyId: 1,
        Name: "Red Tomato",
        createdAt: 1620302400000
    }),
    new PlantPart({
        EasyId: 2,
        Name: "Leaf",
        createdAt: 1620302400000
    }),
    new PlantPart({
        EasyId: 3,
        Name: "Leaf",
        createdAt: 1620302400000
    }),
    new PlantPart({
        EasyId: 4,
        Name: "Leaf",
        createdAt: 1620388800000
    })
]

// Many object data can refer to the same plant part but can have different data depending on time taken.
const objectData = [
    new ObjectData({
        Data: {
            Volume: "65ml"
        },
        Object: plantPart[0]._id,
        createdAt: 1620302400000
    }),
    new ObjectData({
        Data: {
            Volume: "55ml"
        },
        Object: plantPart[1]._id,
        createdAt: 1620302400000
    }),
    new ObjectData({
        Data: {
            Length: "2.4cm"
        },
        Object: plantPart[2]._id,
        createdAt: 1620302400000
    }),
    new ObjectData({
        Data: {
            Length: "2.2cm"
        },
        Object: plantPart[3]._id,
        createdAt: 1620302400000
    }),
    new ObjectData({
        Data: {
            Volume: "65ml"
        },
        Object: plantPart[0]._id,
        createdAt: 1620388800000
    }),
    new ObjectData({
        Data: {
            Volume: "55ml"
        },
        Object: plantPart[1]._id,
        createdAt: 1620388800000
    }),
    new ObjectData({
        Data: {
            Length: "4.7cm"
        },
        Object: plantPart[4]._id,
        createdAt: 1620388800000
    }),
    new ObjectData({
        Data: {
            Temperature: "20*C",
            "Relative Humidity": "29%"
        }
    }),
    new ObjectData({
        Data: {
            Length: "19*C",
            "Relative Humidity": "28%"
        }
    }),
]

// Highlighting boxes information 
const boundingBoxData = [
    new BoundingBoxData({ // 20210506/1.png
        X: 80,
        Y: 204,
        Height: 135,
        Width: 132,
        Color: "yellow",
        ObjectID: objectData[0]._id
    }),
    new BoundingBoxData({ // 20210506/1.png
        X: 196,
        Y: 177,
        Height: 120,
        Width: 128,
        Color: "yellow",
        ObjectID: objectData[1]._id
    }),
    new BoundingBoxData({ // 20210506/1.png
        X: 85,
        Y: 19,
        Height: 60,
        Width: 75,
        Color: "red",
        ObjectID: objectData[2]._id
    }),
    new BoundingBoxData({ // 20210506/1.png
        X: 179,
        Y: 50,
        Height: 67,
        Width: 50,
        Color: "red",
        ObjectID: objectData[3]._id
    }),
    new BoundingBoxData({ // 20210507/1.png
        X: 51,
        Y: 106,
        Height: 98,
        Width: 126,
        Color: "yellow",
        ObjectID: objectData[0]._id
    }),
    new BoundingBoxData({ // 20210507/1.png
        X: 29,
        Y: 147,
        Height: 130,
        Width: 141,
        Color: "yellow",
        ObjectID: objectData[1]._id
    }),
    new BoundingBoxData({ // 20210507/1.png
        X: 302,
        Y: 0,
        Height: 138,
        Width: 93,
        Color: "red",
        ObjectID: objectData[4]._id
    }),
    new BoundingBoxData({ // 20210507/2.png
        X: 110,
        Y: 39,
        Height: 96,
        Width: 112,
        Color: "yellow",
        ObjectID: objectData[0]._id
    }),
    new BoundingBoxData({ // 20210507/2.png
        X: 135,
        Y: 70,
        Height: 120,
        Width: 132,
        Color: "yellow",
        ObjectID: objectData[1]._id
    })
]

// Information on a snapshot of plant.
const model2D = [
    new Model2D({
        ImageURL: "20210506/1.png",
        BoundingBoxes: [
            boundingBoxData[0]._id,
            boundingBoxData[1]._id,
            boundingBoxData[2]._id,
            boundingBoxData[3]._id,
        ]
    }),
    new Model2D({
        ImageURL: "20210507/1.png",
        BoundingBoxes: [
            boundingBoxData[4]._id,
            boundingBoxData[5]._id,
            boundingBoxData[6]._id
        ]
    }),
    new Model2D({
        ImageURL: "20210507/2.png",
        BoundingBoxes: [
            boundingBoxData[7]._id,
            boundingBoxData[8]._id
        ]
    })
]

const monitorDates = [
    new MonitorDates({
        MonitorDate: 1620302400000,
        Name: "6th May 2021",
        RGBImages: [
            model2D[0]._id
        ],
        EnvironmentConditions: objectData[7]._id
    }),
    new MonitorDates({
        MonitorDate: 1620388800000,
        Name: "7th May 2021",
        RGBImages: [
            model2D[1]._id,
            model2D[2]._id
        ],
        EnvironmentConditions: objectData[8]._id
    })
]

export { plantPart, objectData, boundingBoxData, model2D, monitorDates }
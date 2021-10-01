import { MonitorDates } from "./monitor-dates-schema";

export async function lazyRetrieveAllMonitorDates(){
    const listMonitorDates = await MonitorDates.find().sort({MonitorDate: "asc"});
    listMonitorDates.forEach((o,i,a) => {a[i] = convertToLazyDto(o)});
    return listMonitorDates;
}

export async function retrieveByEnvironmentReference(id){
    const listMonitorDates = await MonitorDates.find({EnvironmentConditions: id});
    listMonitorDates.forEach((o,i,a) => {a[i] = convertToDto(o)});
    return listMonitorDates;
}

export async function retrieveById(id){
    return await MonitorDates.findById(id);
}

export async function trimmedRetrieveById(id){
    const data = await retrieveById(id);
    return convertToDto(data);
}

function convertToDto(date){
    return {
        Name: date.Name,
        Date: date.MonitorDate,
        RGBImages: date.RGBImages,
        EnvironmentConditions: date.EnvironmentConditions
    }
}

function convertToLazyDto(date){
    return {
        ID: date._id,
        Name: date.Name,
        Date: date.MonitorDate
    }
}
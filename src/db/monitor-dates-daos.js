import { MonitorDates } from "./monitor-dates-schema";

export async function lazyRetrieveAllMonitorDates(){
    const listMonitorDates = await MonitorDates.find();
    listMonitorDates.forEach((o,i,a) => {a[i] = convertToLazyDto(o)});
    return listMonitorDates;
}

export async function retrieveById(object_id){
    return await MonitorDates.findById(object_id);
}

function convertToLazyDto(date){
    return {
        ID: date._id,
        Name: date.Name,
        Date: date.MonitorDate
    }
}
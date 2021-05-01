import moment from "moment";

export const getMinDate = () =>
{
    return moment().format("yyyy-MM-DD")+"T"+moment().format("HH:mm")
}
export const getFormatDate = (val) =>
{
    return moment(val).format("yyyy-MM-DDTHH:mm")
}
export const parseDate =(val) =>
{
   return moment(val,"yyyy-MM-DDTHH:mm").toDate()
}

export const getDiff = (startDate,endDate) =>
{
  var m1 = moment(startDate); 
var m2 = moment(endDate); 
return m2.diff(m1,'minutes'); 
}
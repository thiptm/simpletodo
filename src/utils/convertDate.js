export default function convertDate(date) {
    let month = date.$M + 1;
    if(month < 10) {
        month = "0" + month;
    }
    const strDate = `${date.$D}-${month}-${date.$y}`;
    return strDate;

}
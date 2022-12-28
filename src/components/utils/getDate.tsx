export function getDate(){
    let today = new Date()
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    return `${month}/${day}/${year}`
    
}
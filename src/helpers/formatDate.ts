export function formatDate(date: string){
    const fecha = new Date(date)
    const day = fecha.getDate()
    const month = fecha.getMonth() +1
    const year = fecha.getFullYear()

    const completeDate = `${day}/${month}/${year}`
    return completeDate
}

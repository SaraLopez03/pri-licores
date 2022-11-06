export const getUserData = () => {
    const user = localStorage.getItem("prilicores-user");
    return JSON.parse(user);
}

export const getToken = () => {
    const token = getUserData().token;
    const extraOptions = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    }
    return extraOptions
}

export const getRangeDates = (start, end) => {
    return [
        new Date(`${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()} 00:00:00`),
        new Date(`${end.getMonth() + 1}/${end.getDate()}/${end.getFullYear()} 23:59:59`)
    ]
}
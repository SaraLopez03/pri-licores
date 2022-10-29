
export const getToken = () => {
    const token = localStorage.getItem("userToken");
    const extraOptions = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    }
    return extraOptions
}
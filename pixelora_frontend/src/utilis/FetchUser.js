export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return userInfo;
}
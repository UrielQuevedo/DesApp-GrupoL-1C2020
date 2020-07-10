export const verifyTokenIfNotLoginOrRegister = (path) => {
    if(path === '/api/auth/login' || path === '/api/auth/register') {
        return {};
    }
    const token = localStorage.getItem("authorization");
    return { authorization: `Bearer ${token}` };
}
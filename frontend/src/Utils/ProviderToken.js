export const verifyTokenIfNotLoginOrRegister = (path) => {
    if(path === '/api/auth/login' || path === '/api/auth/register' 
        || path === '/api/auth/login/social' || path === '/api/auth/register/social') {
        return {};
    }
    const token = localStorage.getItem("authorization");
    return { authorization: `Bearer ${token}` };
}
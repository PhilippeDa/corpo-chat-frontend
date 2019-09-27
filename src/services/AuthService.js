export const AuthService = {
    signup,
    login,
    logout,
    currentSession
};


async function currentSession(){
     return true;
}

async function logout(){
    return true;
}

async function signup(firstName, lastName, role, username, password) {
    const data = {firstName, lastName, role, username, password};

    const requestOptions = fetch('https://localhost:3001/signup', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    await requestOptions;

    return
}

async function login(email, password) {
    const data = {email,password};
    const call  = fetch('http://localhost:3001/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    let response = await call;
    if(response){
        const {user, token} = await response.json();
        localStorage.setItem(user, token);
        console.log(localStorage.getItem(user))
    }
    return;

}
import * as _ from 'lodash'


export const AuthService = {
    loggedInUser : [],
    signup,
    login
};


async function signup(email, password) {
    const data = {email,password};

    const call  = fetch('http://localhost:3001/signup', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    await call;
    return;
}

async function logout(email){
   const currentUser =  this.loggedInUser.find((user) => {
        user === email;
   })

   if(currentUser){
       currentUser['']
   }
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
        localStorage.setItem('corpoChat', token);
        console.log(localStorage.getItem(user))
    }
    return;

}
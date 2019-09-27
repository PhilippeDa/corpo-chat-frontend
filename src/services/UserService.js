export const UserService = {
    getAllUsers
}

async function getAllUsers() {

    const bearer = localStorage.getItem('philippe.dagenais@secretCorp.com');
    const requestOptions = fetch('http://localhost:3001/users', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'omit',
        headers: {
            'Accept': 'application/json',
            'Authorization': bearer
        }
    })

     const allUsersStream = await requestOptions;
     const allUsers = await allUsersStream.json();
     return allUsers;
    
}
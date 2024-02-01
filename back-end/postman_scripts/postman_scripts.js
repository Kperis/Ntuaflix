// General 200 OK Test
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


// Registration Endpoint Test
apiUrl = 'http://localhost:9876/ntuaflix_api/auth/register'; // Replace with your actual API URL

pm.test('Register User', function () {
    const requestBody = {
        "firstname": "SimpleUserFN",
        "lastname": "SimpleUserLN",
        "birthDate": "1990-05-15",
        "username": "SimpleUser",
        "email": "SimpleUser@example.com",
        "password": "1234"
    };

    pm.sendRequest({
        url: apiUrl,
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestBody)
        }
    }, function (err, response) {
        pm.response.to.have.status(200);
        pm.response.to.have.jsonBody({
            message: 'Registration Completed. Please login'
        });
    });
});

// Login Endpoint Test
apiUrl = 'http://localhost:9876/ntuaflix_api/auth/login'; // Replace with your actual API URL

pm.test('Login User', function () {
    const requestBody = {
        username: 'SimpleUser',
        password: '1234'
    };

    pm.sendRequest({
        url: apiUrl,
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestBody)
        }
    }, function (err, response) {
        pm.response.to.have.status(200);
        pm.response.to.have.jsonBody({
            success: true,
            message: 'Login successful'
        });
        pm.response.to.have.jsonBody('token');
    });
});



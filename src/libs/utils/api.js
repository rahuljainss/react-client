const axios = require('axios');

const callApi = async (Email, Password) => {
try {
const response = await axios({
method: 'post',
url: 'https://express-training.herokuapp.com/api/user/login',
data: {
email: Email,
password: Password,
}
});
localStorage.setItem('token',response.data.data);
return response;
} catch (error) {
return error.message;
}
};

export default callApi;

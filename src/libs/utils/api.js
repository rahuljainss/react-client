const axios = require('axios');
const Url = 'https://express-training.herokuapp.com/api/user';
const callApi = async (methodName,url, Email, Password) => {
try {
const response = await axios({
method: methodName,
url: `${Url}${url}`,
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

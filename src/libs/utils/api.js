const axios = require('axios');
const Url = 'https://express-training.herokuapp.com/api';
const callApi = async (methodName,url,trainees) => {
try {
const response = await axios({
method: methodName,
url: `${Url}${url}`,
data: trainees,
headers: {Authorization: localStorage.getItem('token')}
});
return response;
} catch (error) {
return error.message;
}
};

export default callApi;

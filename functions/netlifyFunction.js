require('dotenv').config();
const axios = require('axios');

exports.handler = async function (event) {
  const params = JSON.parse(event.body);

  const { data } = await axios({
    url: `${process.env.API_END_POINT}${params}`,
    method: 'GET'
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

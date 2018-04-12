var config = {};
config.apibaseurl = process.env.BASE_URL||"http://localhost:3000/api/";
console.log('config.apibaseurl',config.apibaseurl);
module.exports =  config;
var config = {};
config.apibaseurl = process.env.CV_API_BASE ||"http://localhost:3001/api/";
console.log('config.apibaseurl',config.apibaseurl);
module.exports =  config;
var config = {};
config.username = process.env.CV_USERNAME || null;
config.token = process.env.CV_GITHUB_TOKEN ||null;
config.key = process.env.CV_WAKA_KEY ||null;
config.apibaseurl = process.env.CV_API_BASE ||"http://localhost:3001/api/";
if(!config.username || !config.token || !config.key){
    console.error('Revisar ENVS');
    process.exit(1);
}
module.exports = config;
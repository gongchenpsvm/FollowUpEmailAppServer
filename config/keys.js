//client id 949739476603-haitless67hkflfp0nf1c6d3h0tsauts.apps.googleusercontent.com
//client secret qvlbrCShGX4IwD2z-Yjow0GS
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}

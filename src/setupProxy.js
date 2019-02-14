const proxy = require('http-proxy-middleware')
var cors = require('cors')
module.exports = function (app) {
  app.use(cors())
  app.use(proxy('/baidu', {target: 'https://zhidao.baidu.com/'}))
  app.use(proxy('/distribute-web', {target: 'https://boss.icarbonx.com/distribute-web/'}))
  app.use(proxy('/bossweb', {target: 'https://boss.icarbonx.com/bossweb/'}))
}
// app.use(proxy('/distribute-web', {target: 'https://boss.icarbonx.com/distribute-web/'}))
// app.use(proxy('/bossweb', {target: 'https://boss.icarbonx.com/bossweb/'}))

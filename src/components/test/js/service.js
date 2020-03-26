const fs = require('fs')
const os = require('os')

var svcModule = {}

svcModule.test = function (event, trId, reqData, fn_successCallback, fn_errorCallback) {
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"test\" started')
  fn_successCallback(event, trId, '성공')
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"test\" ended')
}

svcModule.readFile = function (event, trId, reqData, fn_successCallback, fn_errorCallback) {
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"readFile\" started')
  let fileName = reqData.fileName
  let encode = reqData.encode
  if (!encode) {
    encode = 'utf8'
  }
  let text = fs.readFileSync(fileName, encode)
  if (text) {
    fn_successCallback(event, trId, text)
  } else {
    fn_errorCallback(event, trId, new Error('파일이 없거나 내용이 없음'))
  }
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"readFile\" ended')
}

svcModule.writeFile = function (event, trId, reqData, fn_successCallback, fn_errorCallback) {
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"writeFile\" started')
  let fileName = reqData.fileName
  let data = reqData.data
  try {
    fs.writeFileSync(fileName, data, 'utf8')
    fn_successCallback(event, trId, '파일생성 성공')
  } catch (e) {
    fn_errorCallback(event, trId, e)
  }
  
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"writeFile\" ended')
}

svcModule.getOsInfo = function (event, trId, reqData, fn_successCallback, fn_errorCallback) {
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"getOsInfo\" started')
  let info = {
    hostname: os.hostname(),
    type: os.type(),
    arch: os.arch(),
    platform: os.platform(),
    cpus: os.cpus(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    network: os.networkInterfaces()
  }
  console.log(JSON.stringify(info))
  fn_successCallback(event, trId, info)
  console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] \"test\" \"getOsInfo\" ended')
}

module.exports.svcModule = svcModule

// ipcMain - ipc통신관련 이벤트 처리
const { ipcMain } = require('electron')
const { serviceCtrl } = require('./service.js')

const fn_successCallback = function (event, trId, resData) {
  let output = {
    trId: trId,
    type: 'S',
    resData: resData
  }
  event.sender.send('frontReciever', output)
}

const fn_errorCallback = function (event, trId, errData) {
  let output = {
    trId: trId,
    type: 'F',
    resData: errData
  }
  event.sender.send('frontReciever', output)
}

/**
 * @namespace ipcBackCtrl
 */
var ipcBackCtrl = {}

ipcBackCtrl.init = function () {
  ipcMain.on('backReciever', (event, args) => {
    let trId = args.trId
    let service = args.service
    let funcName = args.funcName
    let reqData = args.reqData
    console.log('[' + new Date().format('yyyy-MM-dd HH:mm:ss.ls') + '] Call \"' + service + '\" \"' + funcName + '\" - ' + trId)
    // 서비스 가져오기
    let svcModule = serviceCtrl.getSvcModule(service)
    if (svcModule && svcModule[funcName] && typeof svcModule[funcName] === 'function') {
      try {
        svcModule[funcName](event, trId, reqData, fn_successCallback, fn_errorCallback)
      } catch (e) {
        fn_errorCallback(event, trId, e)
      }
    }
    // fn_successCallback(event, trId, '성공')
  })
}

module.exports.ipcBackCtrl = ipcBackCtrl

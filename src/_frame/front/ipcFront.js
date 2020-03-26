const { ipcRenderer } = require('electron')

/**
 * @namespace ipcFrontCtrl
 */
var ipcFrontCtrl = {}

ipcFrontCtrl.addQueue = function (key, func) {
  this.queue[key] = func
}

ipcFrontCtrl.delQueue = function (key) {
  if (this.queue[key]) {
    this.queue[key] = null
    delete this.queue[key]
  }
}

ipcFrontCtrl.request = function (service, funcName, reqData, callback) {
  let min = 111111111
  let max = 999999999
  let trId = new Date().getTime() + '' + (Math.floor(Math.random() * (max - min + 1)) + min)
  this.addQueue(trId, callback)
  let args = {
    trId: trId,
    service: service,
    funcName: funcName,
    reqData: reqData
  }
  ipcRenderer.send('backReciever', args)
}

ipcFrontCtrl.response = function (key, type, resData) {
  let successCallback
  let errorCallback
  if (this.queue[key]) {
    if (this.queue[key].success && typeof this.queue[key].success === 'function') {
      successCallback = this.queue[key].success
    }
    if (this.queue[key].error && typeof this.queue[key].error === 'function') {
      errorCallback = this.queue[key].error
    }
  }
  if (type === 'S' && successCallback) {
    successCallback(resData)
  } else if (type === 'F' && errorCallback) {
    errorCallback(resData)
  }
  this.delQueue(key)
}

ipcFrontCtrl.init = function () {
  let vm = this
  vm.queue = Object.create(null)
  ipcRenderer.on('frontReciever', (event, args) => {
    vm.response(args.trId, args.type, args.resData)
  })
}

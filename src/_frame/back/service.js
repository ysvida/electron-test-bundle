const { svcConfig } = require('../../config/cfg_service.js')

const prePath = '../../components/'

var serviceCtrl = {
  modules: Object.create(null)
}

serviceCtrl.getSvcModule = function (name) {
  if (!this.modules[name]) {
    let idx = svcConfig.findIndex(data => data.name === name)
    if (idx > -1) {
      let jsPath = prePath + svcConfig[idx].path
      const { svcModule } = require(jsPath)
      this.modules[name] = svcModule
    }
  }
  if (!this.modules[name]) {
    throw new Error('Service module is not defined')
  }
  return this.modules[name]
}

module.exports.serviceCtrl = serviceCtrl

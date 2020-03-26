// electron 라이브러리 포함
const electron = require('electron')
// app - 일렉트론 프로그램의 생명주기를 관리
// BrowserWindow - 프로그램창을 관리
const { app, BrowserWindow } = electron
// Data Type 초기화
const { dataType } = require('./src/_frame/back/init.js')
// 백엔드 컨트롤러
const { ipcBackCtrl } = require('./src/_frame/back/ipcBack.js')

function createWindow () {
  dataType.init()
  ipcBackCtrl.init()
  // 브라우저 창을 생성
  // nodeIntegration - 프론트코드에서 js파일 및 node의 기능을 사용
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // 브라우저 창에 index.html을 로드
  win.loadFile('./src/index.html')
  // 개발자 도구를 엽니다.
  win.webContents.openDevTools()
}

// app이 준비되었다면 createWindow를 실행
app.whenReady().then(createWindow)

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { app, BrowserWindow } = require('electron')
let win

function createWindow () {
  win = new BrowserWindow({
    width: 1800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  })

  win.loadFile('index.html')

  const webview = document.createElement('webview')
  webview.src = '<https://menhu.pt.ouchn.cn/site/ouchnPc/index>'
  webview.addEventListener('dom-ready', () => {
    webview.executeJavaScript(`alert(document.title)`)
  })

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      const webview = document.querySelector('webview')
      webview.addEventListener('dom-ready', () => {
        webview.executeJavaScript(\\`
          const body = document.querySelector('body')
          const p = document.createElement('p')
          p.innerText = 'Hello from Electron'
          body.appendChild(p)
        \\`)
      })
    `)
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

/**
 * Electron main file.
 */

const { app, BrowserWindow } = require('electron');

const path = require('path');

/**
 * For more information about Squirrel events handling check:
 * https://github.com/electron/windows-installer#handling-squirrel-events
 */

if (require('electron-squirrel-startup')) {
  app.quit(); // required for Squirrel events handling
}

/**
 * Handle Squirrel events.
 */
function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process'),
    path = require('path');

  const appFolder = path.resolve(process.execPath, '..'),
    rootAtomFolder = path.resolve(appFolder, '..'),
    updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe')),
    exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess = void 0;
    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (e) {
      // eslint-disable-next-line no-console -- needed here for debugging
      console.log(`error spawning process ${e}`);
    }
    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      /**
       * Optionally do things such as:
       * - Add your .exe to the PATH
       * - Write to the registry for things like file associations and explorer context menus
       */
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-uninstall':
      /**
       * Undo anything you did in the --squirrel-install and --squirrel-updated handlers
       */
      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcuts', exeName]);
      setTimeout(app.quit, 1000);
      return true;
    case '--squirrel-obsolete':
      /**
       * This is called on the outgoing version of your app before an
       * update to the new version - it's the opposite of --squirrel-updated
       */
      app.quit();
      return true;
    case '--squirrel-firstrun':
      /**
       * This is the first time the application is launched.
       * User can be shown a splashscreen, settings, or something else.
       */
      return true;
  }
}

if (handleSquirrelEvent()) {
  app.quit();
}

/**
 * Instantiate Express App
 */
app.server = require(__dirname + '/electron.server.js');

/**
 * Catch uncaught exceptions
 */
process.on('uncaughtException', error => {
  // eslint-disable-next-line no-console -- needed here for debugging
  console.log('UNCAUGHT EXCEPTION', error);
});

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the JavaScript object is garbage collected.
 */
let win;

function createWindow() {
  /**
   * Create the browser window.
   * Check all options here: https://www.npmjs.com/package/electron-browser-window-options
   */
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    resizable: true,
    webPreferences: {
      nodeIntegration: false, // if set to true, breaks client: d3, nv, nvd3
      preload: path.join(app.getAppPath() + '/electron.preload.js'), // restores node globals
      webSecurity: true,
    },
  });

  // win.maximize();

  // and load the index.html of the app.
  win.loadURL('http://localhost:8080');

  /**
   * Open the DevTools.
   */
  // win.webContents.openDevTools();

  win.focus();

  // Emitted when the window is closed.
  win.on('closed', () => {
    /**
     * Dereference the window object, usually you would store windows
     * in an array if your app supports multi windows, this is the time
     * when you should delete the corresponding element.
     */
    win = null;
  });
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', createWindow);

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', () => {
  /**
   * On macOS it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  /**
   * On macOS it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (win === null) {
    createWindow();
  }
});

/**
 * In this file you can include the rest of your app's specific main process
 * code. You can also put them in separate files and require them here.
 */

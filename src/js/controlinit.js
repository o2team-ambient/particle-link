/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

const loadData = {
  "默认": {
    "0": {...window[O2_AMBIENT_CONFIG]}
  }
}
const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor() {
      this.backgroundColor = '#bddaf7'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor() {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      // this.initTextureGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI() {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          "remembered": { ...allLoadData.remembered }
        }
      })
      gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      // gui.add(otherConfig, 'play').name('播放 / 暂停')
      config.particleNumber && gui.add(config, 'particleNumber', 3, 100, 1).name('粒子数量').onFinishChange(val => {
        // window[O2_AMBIENT_INIT]()
        this.resetCanvas()
      })
      config.color && gui.addColor(config, 'color').name('粒子颜色').onFinishChange(val => {
        this.resetCanvas()
      })
      config.maxSize && gui.add(config, 'maxSize', 3, 20, 1).name('粒子最大半径').onFinishChange(val => {
        this.resetCanvas()
      })
      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI() {
      // demo code
      const gui = this.gui
      const config = this.config
      const texturesFolder = gui.addFolder('纹理')
      ttexturesFolder.addGroup(config, 'textures').name(`纹理列表`).onFinishChange(val => {
        this.resetCanvas()
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit

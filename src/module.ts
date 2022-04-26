import path from 'path'
import { Module } from '@nuxt/types'
import { KeyboardState } from '../type'

export interface ModuleOptions {}

const CONFIG_KEY = 'on-screen-keyboard-detector'

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const options = {
    ...this.options[CONFIG_KEY],
    ...moduleOptions
  }

  const runtimeDir = path.resolve(__dirname, 'runtime')
  this.nuxt.options.alias['~on-screen-keyboard-detector-nuxt'] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir)

  this.addPlugin({
    src: path.resolve(runtimeDir, 'plugin.mjs'),
    fileName: 'on-screen-keyboard-detector.mjs',
    mode: 'client',
    options
  })
}

;(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.9 - 2.13
  interface Context {
    ['$keyboard']: KeyboardState
  }
}

export default nuxtModule

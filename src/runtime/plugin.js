import Vue from 'vue'
import { subscribe, isSupported } from 'on-screen-keyboard-detector'

const extend = (app, mixin) => {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}

const KeyboardDetecter = (ctx, inject) => {
  const state = Vue.observable({ show: false })
  let unsubscribe
  if (isSupported()) {
    unsubscribe = subscribe((visibility) => {
      state.show = visibility !== 'hidden'
    })
  }
  extend(ctx.app, {
    beforeDestroy () {
      unsubscribe?.()
    }
  })

  ctx.$keyboard = state
  inject('keyboard', state)
}

export default KeyboardDetecter

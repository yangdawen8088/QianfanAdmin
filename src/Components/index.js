const components = import.meta.glob('@/components/*.vue')
export default {
  install (app) {
    for (const path in components) {
      const componentName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      components[path]().then((module) => {
        app.component(componentName, module.default || module)
      })
    }
  },
};
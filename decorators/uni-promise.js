/**
 * uni promise不会reject，而是resolve的数组，第一个项为错误对象，第二项为数据，这里做一个统一处理
 * 由于uni不支持装饰器，因此目前使用的都是函数装饰的方式
 * @param {*} options
 * @returns
 */
export default function(target, key, descriptor) {
  // 函数装饰
  if (target && !key && !descriptor) {
    const fn = target

    return function(...params) {
      const result = fn.apply(this, params)
      // promise
      if (result && result.then && typeof result.then === 'function') {
        return result.then(([err, res]) => {
          if (err) {
            return Promise.reject(err)
          }

          return Promise.resolve(res)
        })
      }
      return result
    }
  }

  // 类的方法装饰
  const fn = descriptor.value
  descriptor.value = function(...params) {
    const result = fn.apply(this, params)
    // promise
    if (result && result.then && typeof result.then === 'function') {
      return result.then(([err, res]) => {
        if (err) {
          return Promise.reject(err)
        }

        return Promise.resolve(res)
      })
    }
    return result
  }
}

export function uniPromise(options = {}) {
  /**
   * 此处 target 为 C.prototype;
   * key 为 method;
   * 原 descriptor 为：{ value: f, enumarable: false, writable: true, configurable: true }
   */
  return function(target, key, descriptor) {
    // 函数装饰
    if (target && !key && !descriptor) {
      const fn = target

      return function(...params) {
        const result = fn.apply(this, params)
        // promise
        if (result && result.then && typeof result.then === 'function') {
          return result.then(([err, res]) => {
            if (err) {
              return Promise.reject(err)
            }

            return Promise.resolve(res)
          })
        }
        return result
      }
    }

    // 类的方法装饰
    const fn = descriptor.value
    descriptor.value = function(...params) {
      const result = fn.apply(this, params)
      // promise
      if (result && result.then && typeof result.then === 'function') {
        return result.then(([err, res]) => {
          if (err) {
            return Promise.reject(err)
          }

          return Promise.resolve(res)
        })
      }
      return result
    }
  }
}

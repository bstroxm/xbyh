// import user from '../store/modules/user'

const DEFAULT_OPTIONS = {
  returnOriginData: false,
  resolveFalseWhenCatch: true
}

class UserCenter {
  _invoke = (action, params, options) => {
    return uniCloud
      .callFunction({
        name: 'user-center',
        data: { action, params }
      })
      .then(res => this._commonThen(res, options))
      .catch(err => this._commonCatch(err, options))
  }

  _commonThen = (res, options) => {
    if (res && res.result && (typeof res.result.code === 'undefined' || res.result.code === 0)) {
      return Promise.resolve(options.returnOriginData ? res : res.result)
    }
    return options.resolveFalseWhenCatch ? Promise.resolve(false) : Promise.reject()
  }

  _commonCatch = (err, options) => {
    return options.resolveFalseWhenCatch ? Promise.resolve(false) : Promise.reject(err)
  }

  /**
   * 微信登录
   */
  loginByWeixin = (params, options = DEFAULT_OPTIONS) => {
    return this._invoke('loginByWeixin', params, options)
  }

  /**
   * 获取用户信息
   */
  getUserInfo = (params, options = DEFAULT_OPTIONS) => {
    return this._invoke('getUserInfo', params, options)
  }

  /**
   * 通过有token获取用户信息
   */
  getUserInfoByToken = async (params, options = DEFAULT_OPTIONS) => {
    const userInfo = await this._invoke('getUserInfoByToken', params, options)

    if (userInfo && userInfo.uid) {
      return this.getUserInfo(
        {
          uid: userInfo.uid
        },
        options
      )
    }

    return options.resolveFalseWhenCatch ? Promise.resolve(false) : Promise.reject()
  }

  /**
   * 设置头像
   */
  setAvatar = (params, options = DEFAULT_OPTIONS) => {
    return this._invoke('setAvatar', params, options)
  }

  /**
   * 更新用户信息
   */
  updateUser = (params, options = DEFAULT_OPTIONS) => {
    return this._invoke('updateUser', params, options)
  }

  /**
   * 登出
   */
  logout = (options = DEFAULT_OPTIONS) => {
    return this._invoke('logout', null, options)
  }
}

export default new UserCenter()

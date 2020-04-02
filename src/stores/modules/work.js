import Element from '../../comps/core/models/element'
import Page from '../../comps/core/models/page'
import myhttp from '../../myutil/httputil.js'
import { takeScreenshot } from '../../myutil/canvasutil.js'

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  createWork ({ commit }, payload) {
  },
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  },
  /**
   * isSaveCover {Boolean} 保存作品时，是否保存封面图
   * loadingName {String} saveWork_loading, previewWork_loading
   * 预览作品之前需要先保存，但希望 用户点击保存按钮 和 点击预览按钮 loading_name 能够不同（虽然都调用了 saveWork）
   * 因为 loading 效果要放在不同的按钮上
   */
  saveWork ({ commit, dispatch, state }, { isSaveCover = false, loadingName = 'saveWork_loading' } = {}) {
    let workStr = JSON.stringify(state.work)

    const fn = (workId, callback) => {
      takeScreenshot().then((dataUrl) => {
        this.uploadCover(workId, dataUrl)
      }) // takeScreenshot
    }

    return new Promise((resolve, reject) => {
      // let that = this
      // let workId= state.work.id
      let workId = '482177293489'
      let params = {
        programid: workId,
        pcontent: workStr
      }
      myhttp.post('/IShower/postProgramInfo', params, function (data) {
        if (data != null && data !== '') {
          console.log(data)
          if (data === 'true' && isSaveCover) {
            fn(workId, resolve)
          }
        }
      }, function (err) {
        console.log(err)
      })
    })
  },
  fetchWork ({ commit, state }, workId) {
    // let that = this
    // let workId= state.work.id
    let params = {
      id: workId
    }
    myhttp.post('/IShower/getProgramInfoById', params, function (data) {
      if (data != null && data !== '') {
        console.log(data)
        if (data !== '') {
          // commit('setWork', entry)
          // commit('setEditingPage')
        }
      }
    }, function (err) {
      console.log(err)
    })
  },
  fetchWorks ({ commit, dispatch, state }, workId) {
    // let that = this
    // let workId= state.work.id
    let params = {
      id: workId
    }
    myhttp.post('/IShower/getProgramInfoById', params, function (data) {
      if (data != null && data !== '') {
        console.log(data)
        if (data !== '') {
          // commit('setWork', entry)
          // commit('setEditingPage')
        }
      }
    }, function (err) {
      console.log(err)
    })
  },
  fetchWorkTemplates ({ commit, dispatch, state }, workId) {
    // let that = this
    // let workId= state.work.id
    let params = {
      id: workId
    }
    myhttp.post('/IShower/getProgramByTempId', params, function (data) {
      if (data != null && data !== '') {
        console.log(data)
        if (data !== '') {
          // commit('setWork', entry)
          // commit('setEditingPage')
        }
      }
    }, function (err) {
      console.log(err)
    })
  },
  fetchFormsOfWork ({ commit, state, dispatch }, workId) {     
  },
  setWorkAsTemplate ({ commit, state, dispatch }, workId) {
    let workStr = JSON.stringify(state.work)

    const fn = (workId, callback) => {
      takeScreenshot().then((dataUrl) => {
        this.uploadCover(workId, dataUrl)
      }) // takeScreenshot
    }

    return new Promise((resolve, reject) => {
      // let that = this
      // let workId= state.work.id
      let workId = '482177293489'
      let params = {
        programid: workId,
        pcontent: workStr
      }
      myhttp.post('/IShower/postProgramInfo', params, function (data) {
        if (data != null && data !== '') {
          console.log(data)
          if (data === 'true') {
            fn(workId, resolve)
          }
        }
      }, function (err) {
        console.log(err)
      })
    })
  },
  useTemplate ({ commit, state, dispatch }, workId) {
    // let that = this
    // let workId= state.work.id
    let params = {
      id: workId
    }
    myhttp.post('/IShower/getProgramByTempId', params, function (data) {
      if (data != null && data !== '') {
        console.log(data)
        if (data !== '') {
          // commit('setWork', entry)
          // commit('setEditingPage')
        }
      }
    }, function (err) {
      console.log(err)
    })
  },
  uploadCover ({ commit, state, dispatch }, { workId, dataUrl } = {}) {
    // let that = this
    let params = {
      programid: workId,
      posterSrc: dataUrl
    }
    myhttp.post('/IShower/postProgramPoster', params, function (data) {
      if (data != null && data !== '') {
        console.log(data)
      }
    }, function (err) {
      console.log(err)
    })
  }
}

// mutations
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {Object} payload
   *
    value example: [
      {
        "id": 1,
        "name": "1567769149231.png",
        "hash": "1660b11229e7473b90f99a9f9afe7675",
        "sha256": "lKl7f_csUAgOjf0VRYkBZ64EcTjvt4Dt4beNIhELpTU",
        "ext": ".png",
        "mime": "image/png",
        "size": "6.57",
        "url": "/uploads/1660b11229e7473b90f99a9f9afe7675.png",
        "provider": "local",
        "public_id": null,
        "created_at": "2019-09-06T11:25:49.255Z",
        "updated_at": "2019-09-06T11:25:49.261Z",
        "related": []
      }
    ]
   */
  setWorkCover (state, { type, value }) {
    const [cover] = value
    state.work.cover_image_url = cover.url
  },
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorks (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.works = value
  },
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorkTemplates (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.workTemplates = value
  },
  setWork (state, work) {
    window.__work = work
    work.pages = work.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      return new Page(page)
    })
    state.work = work
  },
  previewWork (state, { type, value }) { },
  deployWork (state, { type, value }) { },
  formDetailOfWork (state, { type, value }) {
    state.formDetailOfWork = value
  }
}

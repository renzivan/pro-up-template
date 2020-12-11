
const state = {
  projectName: '',
  versionDate: '',
  projectLogo: '',
  projectImage: '',
  page: 1
}

const mutations = {
  setProjectName: (state, data) => state.projectName = data,
  setVersionDate: (state, data) => state.versionDate = data,
  setProjectLogo: (state, data) => state.projectLogo = data,
  setProjectImage: (state, data) => state.projectImage = data,
  setPage: (state, data) => state.page = data,
}

const actions = {
  handleProjectName: ({commit}, data) => {
    commit('setProjectName', data)
  },
  handleVersionDate: ({commit}, data) => {
    commit('setVersionDate', data)
  },
  handleProjectLogo: ({commit}, data) => {
    commit('setProjectLogo', data)
  },
  handleProjectImage: ({commit}, data) => {
    commit('setProjectImage', data)
  },
  handlePage: ({commit}, data) => {
    commit('setPage', data)
  },
}

const getters = {
  getProjectName: (state) => state.projectName,
  getVersionDate: (state) => state.versionDate,
  getProjectLogo: (state) => state.projectLogo,
  getProjectImage: (state) => state.projectImage,
  getPage: (state) => state.page,
}

export default {
  state,
  mutations,
  actions,
  getters
}
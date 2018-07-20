const fetch = require('node-fetch')

const GOT_ALL_FRAMEWORKS_INFO = 'GOT_ALL_FRAMEWORKS_INFO'
const UPDATED_SORT_ORDER = 'UPDATED_SORT_ORDER'

const gotAllFrameworksInfo = (info) => {
  return {
    type: GOT_ALL_FRAMEWORKS_INFO,
    info
  }
}

export const updatedSortOrder = (order, orderBy) => {
  return {
    type: UPDATED_SORT_ORDER,
    order,
    orderBy
  }
}

export const getFrameworksInfo = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://api.github.com/search/repositories?q=repo:angular/angular.js%20repo:facebook/react%20repo:emberjs/ember.js%20repo:vuejs/vue')
      const data = await response.json()
      dispatch(gotAllFrameworksInfo(data.items))
    } catch (err) { console.log(err) }
  }
}

const initialState = {
  frameworksDevInfo: [],
  order: 'asc',
  orderBy: 'fullName'
}

export default function( state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_FRAMEWORKS_INFO: {
      const activeDevInfo = action.info.map((fw) => {
        return {
          id: fw.id,
          fullName: fw.full_name,
          watchersCount: fw.watchers_count,
          forksCount: fw.forks_count,
          openIssues: fw.open_issues
      }
      })
      return {...state, frameworksDevInfo: activeDevInfo}
    }
    case UPDATED_SORT_ORDER:
      return {...state, order: action.order, orderBy: action.orderBy}
    default:
      return state
  }
}

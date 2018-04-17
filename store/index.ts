import {Actions, Getters, Mutations, State} from "~/types"
import axios from "~/plugins/axios/api"

export const state = () => ({
  houses: []
} as State)

export const mutations: Mutations = {
  getHouses(state: State, data: any[] = []) {
    state.houses = data
  },
  addRootNum(state: State, val: number = 1) {
    console.log("val:", val)
    state.rootNum += val
  }
}

export const actions: Actions = {
  /*async nuxtServerInit({commit}) {
    console.log('nuxtServerInit')
    let data = (await axios.get("/houses")).data
    commit("getHouses", data)
  },*/
  async getHouses({commit}) {
    let data = (await axios.get("/houses")).data
    commit("getHouses", data)
  },

  addRootNum({commit}) {
    console.log("addRootNum")
    commit("addRootNum", 3)
  }
}

export const getters: Getters = {
  isFree: state => state.todos.todos.filter(t => t.complete).length === state.todos.todos.length,
  house: (state, id) => {
    console.log("Getter id:", id)
    return state.houses.filter(h => h._id === id)[0]
  }

}

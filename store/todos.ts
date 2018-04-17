import {State, ITodo, TodoActions, TodoGetters, TodoMutations} from "~/types/todos.d"
import axios from '~/plugins/axios/api'

export const state = () => ({
    todos: [],
    numClicked: 0
} as State);

export const getters:TodoGetters = {
    complete: (state, getters, rootState, rootGetters) => {
        return state.todos.filter(t => t.complete)
    },
    active: (state) => {
        return state.todos.filter(t => !t.complete)
    }
};

export const mutations:TodoMutations = {
    getData(state, todos:ITodo[]=[]){
        state.todos = todos;
    },
    add(state, todo:ITodo) {
        state.todos.push(todo)
    },
    remove(state, todo:ITodo) {
        state.todos = state.todos.filter(t => t.id !== todo.id)
    },
    toggle(state, todo:ITodo) {
        state.todos.forEach(t => {if(t.id === todo.id) t.complete = todo.complete})
    },
    addClicked(state:State, val:number=1) {
        state.numClicked+=val
    }
};

export const actions:TodoActions = {
    async getData({commit}, {error, redirect}){
        try{
            commit('getData', (await axios.get('/todos')).data);
        } catch (err) {
            redirect('/error');
            error({statusCode: err.response.status, message: err.response.statusText})
        }
    },
    async add({commit}, task:string) {
        const {data} = await axios.post('/todos', {task, complete: false} as ITodo)
        commit('add', data as ITodo)
    },
    async remove({commit}, todo:ITodo) {
        await axios.delete(`/todos/${todo.id}`)
        commit('remove', todo as ITodo)
    },
    async toggle({commit, dispatch, getters, rootGetters, rootState, state}, todo:ITodo) {
        console.log("getters:", getters);
        console.log("rootGetters:", rootGetters);
        console.log("rootState:", rootState);

        const {data} = await axios.patch(`/todos/${todo.id}`, {complete: !todo.complete})
        commit('toggle', data as ITodo)
        dispatch('addRootNum', null, {root:true})
    }
};

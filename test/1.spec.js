// import Vue from 'vue'
// import {createRenderer} from 'vue-server-renderer'

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const vm = new Vue({
  data(){
    return {
      a:"印书讯"
    }
  },
  template:"<div>{{a}}</div>"
})

renderer.renderToString(vm, (err, html) => {
  console.log(html)
})
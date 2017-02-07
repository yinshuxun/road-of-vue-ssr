// import Vue from 'vue'
// import {createRenderer} from 'vue-server-renderer'

const Vue = require('vue')
const renderer = require('vue-server-renderer').createBundleRenderer()

const vm = new Vue({
  data(){
    return {
      a:"印书讯"
    }
  },
  template:"<div>{{a}}</div>"
})

renderer.renderToString({url:"123"}, (err, html) => {
  console.log(html)
})
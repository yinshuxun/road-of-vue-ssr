<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        这是ssr主页
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="stylus">
  .inner
    background red
</style>

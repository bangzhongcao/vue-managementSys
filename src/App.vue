<template>
  <div id="app">
    <m-header></m-header>
    <!-- <Table :columns="columns1" :data="data1"></Table> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Mheader from 'components/Header/header';

export default {
  name: 'app',
  components:{'m-header':Mheader}
}
</script>

<style lang='less'>
@import '~common/less/variable.less';
    #app {
        height:100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        // text-align: center;
        color: #2c3e50;
        padding-top: 60px;
    }
</style>

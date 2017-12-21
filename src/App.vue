<template>
  <div id="app">
    <!-- <Table :columns="columns1" :data="data1"></Table> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    if(sessionStorage.getItem('loginSession')){
      this.$router.push('/table');
    }else{
      this.$router.push('/login');
    }
  }
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

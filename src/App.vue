<template>
  <div id="app">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-menu-item index="/overlays">布局设计</el-menu-item>
          <el-menu-item index="/forms">表单设计</el-menu-item>
        </el-menu>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    activeIndex: "/overlays",
  }),
  methods: {
    handleHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fm-header {
  height: 50px;
  box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right, #1278f6, #00b4aa);
  position: relative;

  .fm-logo {
    height: 26px;
    vertical-align: middle;
  }
  .fm-title {
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
  .fm-sub-title {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 14px;
    opacity: 0.6;
    margin-left: 10px;
    font-weight: 500;
    padding-top: 5px;
  }
  .fm-link {
    height: 50px;
    float: right;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      line-height: 50px;
      font-weight: 500;
      margin-left: 15px;

      &:hover {
        opacity: 0.8;
      }

      &.ad {
        color: #f5dab1;
      }
    }
  }
}
.fm-container {
  height: calc(100% - 50px);
}
</style>

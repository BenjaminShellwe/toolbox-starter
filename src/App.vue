<script lang="ts">

</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />

    <div class="flex main-container">
      <BaseSide />
      <div class="vertical-container">
        <el-page-header class="vertical-item">
          <template #breadcrumb>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: './' }">
                面包屑导航栏仍在设计中
              </el-breadcrumb-item>
              <el-breadcrumb-item
              ><a href="./">route 1</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>route 2</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <template #content>
            <span class="text-large font-600 mr-3"> Title </span>
          </template>
        </el-page-header>
        <router-view />
      </div>

    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
.vertical-container {
  display: flex;
  flex-direction: column; /* 竖向排列 */
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  overflow-y: auto;
}
.vertical-item {
  margin: 10px; /* 可以添加间距 */
}
body {
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import logo from "../components/Logos.vue";
defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref("");

</script>

<template>
  <div>
    <logo />
    这是一个由vite + vue3 + element plus构建的项目
    <h3>首页建设中</h3>
    主要包括以下内容

    这个站点用于部署工具箱，包括但不限于以下内容：<br>

    根本没时间更新好吧<br>
    <br>
    但整个页面内容都还在构建中，很多链接不可达，请按照指示使用<br>
    <br>
    页面可访问时间 正常上班时间且不定时更新<br>
    <br>
    整个页面UI来自element plus 内容构建为shellwe手动编码，技术有限，请多见谅

  </div>
</template>

<style>

</style>
<!--
    <ul>
      <li>1. 我本人的JavaSE学习代码可视化</li>
      <li>2. 我本人的vue3学习代码可视化</li>
      <li>3. 不缺钱的时候赚钱，不需要考试的时候学习，不需要技术的时候精进</li>

    </ul>
-->

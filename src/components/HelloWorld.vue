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
    <ul>
      <li>1. 我本人的JavaSE学习代码可视化</li>
      <li>2. 我本人的vue3学习代码可视化</li>
      <li>3. 不缺钱的时候赚钱，不需要考试的时候学习，不需要技术的时候精进</li>

    </ul>
  </div>
</template>

<style>

</style>

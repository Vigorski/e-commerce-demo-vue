<template>
  <MasterLayout>
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{
            opacity: 1,
            transition: { easing: 'easeOut' },
          }"
          :leave="{
            opacity: 0,
            transition: { easing: 'easeIn' },
          }"
          :duration="300"
          :key="$route.fullPath"
        >
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </MasterLayout>
</template>

<script setup lang="ts">
  import MasterLayout from '@/components/layout/MasterLayout.vue';
</script>

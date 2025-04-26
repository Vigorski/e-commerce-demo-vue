<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <section>
    <div class="text-center">
      <p class="text-base text-3xl sm:text-4xl font-semibold text-indigo-600">
        404
      </p>
      <h1
        class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl"
      >
        Page not found
      </h1>
      <p class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-lg">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </section>
</template>

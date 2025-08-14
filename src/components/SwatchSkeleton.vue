<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  count: {
    type: Number,
    default: 12
  }
})

const skeletons = computed(() => Array.from({ length: props.count }))
</script>

<template>
  <div
    v-for="(_, index) in skeletons"
    :key="index"
    class="bg-zinc-100 border border-zinc-300 p-4 rounded text-center"
  >
    <div class="size-36 mb-2 bg-zinc-500"></div>

    <div class="h-4 w-full bg-zinc-500 rounded-2xl"></div>
  </div>
</template>
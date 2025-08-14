<script setup lang="ts">
import type { PropType } from 'vue'
import type { ColorSwatch } from '../types'

defineProps({
  swatch: {
    type: Object as PropType<ColorSwatch>
  }
})
</script>

<template>
  <!-- Color Swatch Card -->
  <div class="bg-zinc-100 border border-zinc-300 p-4 rounded text-center">
    <div class="size-36 mb-2" :style="`background-color: ${swatch?.hex.value}`"></div>

    <label class="text-sm">{{ swatch?.name.value }}</label>
  </div>
</template>
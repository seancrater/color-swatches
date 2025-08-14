<script setup lang="ts">
defineProps({
  minimum: {
    type: Number,
    default: 0
  },
  maximum: {
    type: Number,
    default: 100
  },
  units: {
    type: String,
    default: ''
  },
  value: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['change'])
</script>

<template>
  <div class="flex items-center p-2 border border-zinc-400 gap-1 rounded">
    <input
      class="p-0 border-none"
      :min="minimum"
      :max="maximum"
      type="number"
      @change="emit('change', ($event.target as HTMLInputElement).value)"
      :value="value"
    />
    <span v-if="units">{{ units }}</span>
  </div>
</template>
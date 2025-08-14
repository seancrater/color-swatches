<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { ColorSwatch } from '../types'
import { fetchSwatches } from '../utils/fetch'
import NumberInput from './NumberInput.vue'
import Swatch from './Swatch.vue'
import SwatchSkeleton from './SwatchSkeleton.vue'

const saturation = ref(100)
const lightness = ref(50)

const isLoading: Ref<boolean> = ref(true)
const swatches: Ref<ColorSwatch[]> = ref([])

onMounted(async () => {
  swatches.value = await fetchSwatches(saturation.value, lightness.value)
  isLoading.value = false
})

watch([saturation, lightness], async () => {
  isLoading.value = true
  swatches.value = await fetchSwatches(saturation.value, lightness.value)
  isLoading.value = false
})
</script>

<template>
  <section class="flex gap-4 items-center mb-4">
    <div>
      <label>Saturation</label>
      <NumberInput
        units="%"
        :value="saturation"
        @change="value => saturation = value"
      />
    </div>

    <div>
      <label>Lightness</label>
      <NumberInput
        units="%"
        :value="lightness"
        @change="value => lightness = value"
      />
    </div>
  </section>

  <section class="flex gap-4 flex-wrap">
    <SwatchSkeleton v-if="isLoading" />

    <Swatch
      v-else
      v-for="swatch in swatches"
      :key="swatch.name.value"
      :swatch="swatch"
    />
  </section>
</template>
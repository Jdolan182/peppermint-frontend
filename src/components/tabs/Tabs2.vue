<template>
  <div>
    <nav class="ml-4 -mb-px flex space-x-8" aria-label="Tabs">
      <span  v-for="(slot, index) in slots" :key="slot.props?.title" @click="active = index" :class="[active == index ? [$theme.secondBgTextColour] : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700', 'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="active == index ? 'page' : undefined">
        {{ slot.props?.title }}
      </span>
      
    </nav>
    <div
        class="flex transition-transform [&>*]:w-full [&>*]:shrink-0"
        :style="{ transform }"
      >
        <slot />
      </div>
  </div>
</template>
  
<script setup>

  import { ref, useSlots, computed } from 'vue'

  const active = ref(0)
  const slots = useSlots().default?.()
  const transform = computed(() =>
    `translate3d(-${active.value * 100}%, 0px, 0px)`,
  )

</script>
<template>
    <div class="pr-6 h-20 flex md:items-center md:justify-between" :class="[$theme.secondBgColour]">
      <div class="px-4 py-6 sm:px-6" :class="[$theme.secondBgColour]">
          <HeaderThree
            :header="props.title"
            :style=2
          />
          <p v-if="props.subtitle" class="mt-1 max-w-2xl text-sm leading-6" :class="[$theme.secondBgColour, $theme.thirdTextColour]">{{ props.subtitle }}</p>

        </div>
        <div v-if="props.button" class="mt-4 flex md:ml-4 md:mt-0">
            <button v-for="button in props.buttons" :key="button.buttonText"  v-on:click="$emit(button.emitFunction)" type="button" class="inline-flex items-center rounded-md px-3 py-2 ml-3 text-sm font-semibold text-black shadow-xs" 
              :class="[$theme.mainButtonColour, $theme.mainButtonHoverColour]">
              {{ button.buttonText }}
          </button>
        </div>
    </div>
</template>

<script setup>

  import HeaderThree from '@/components/labels/HeaderThree.vue'

  const props = defineProps({
    title: {
      type: [String, Number],
      default: 'Table',
    },
    subtitle: {
      type: [String, Number],
      required: false
    },
    buttons: {
      type:  Array,
      required: false
    },
    button: {
      type: Boolean,
      default: true
    },
  });

  console.log(props.buttons)
</script>

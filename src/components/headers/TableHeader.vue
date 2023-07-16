<template>
    <div class="bg-gray-900 pr-6 h-20 flex md:items-center md:justify-between">
      <div class="px-4 py-6 sm:px-6 bg-gray-900">
          <h2 class="text-2xl leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight"> {{ props.title }}</h2>
          <p v-if="props.subtitle" class="mt-1 max-w-2xl text-sm leading-6 text-gray-300">{{ props.subtitle }}</p>

        </div>
        <div v-if="props.button" class="mt-4 flex md:ml-4 md:mt-0">
            <button v-on:click="$emit(props.emitFunction)" type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/70">{{ props.buttonText }}</button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
      title: {
        type: [String, Number],
        default: 'Table',
      },
      subtitle: {
        type: [String, Number],
        required: false
      },
      buttonText: {
        type: [String, Number],
        default: 'Add',
      },
      button: {
        type: Boolean,
        default: true
      },
      emitFunction : {
        type: String,
      }
    });


</script>

<template>
    <div class="bg-gray-900 p-4 h-12 flex md:items-center md:justify-between">
        <div class=" min-w-0 flex-1">
            <h2 class="text-xl leading-7 text-white sm:truncate sm:text-xl sm:tracking-tight"> {{ props.title }}</h2>
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

<template>
    <TransitionRoot as="template" :show="props.show">
        <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto" @click="hideModal">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel :class="[props.wider ? 'w-1/2 left-24' : 'w-1/2 sm:my-8 sm:w-full sm:max-w-lg', 'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all']">
                <div class="bg-white px-4 pb-6 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div v-if="warning" class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle as="h3" class="text-base font-semibold leading-6" :class="[this.$secondTextColour]">{{ props.title }}</DialogTitle>
                            <slot name="content"></slot>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <slot name="button"></slot>
                    <Close 
                        @click="hideModal" 
                        class="mr-4"
                    />
                
                </div>
                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import Close from "@/components/buttons/Close.vue";
    import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'


    const props = defineProps({
        show: {
            type: Boolean,
            required: false,
        },
        title: {
            type: [String, Number],
            default: ''
        },
        warning: {
            type: Boolean,
            default: false
        },
        wider: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['hideModal'])

    const hideModal = () => {
        emit('hideModal')
    }


</script>
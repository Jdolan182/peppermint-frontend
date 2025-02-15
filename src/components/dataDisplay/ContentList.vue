<template>
    <div v-if="dataCount > 0" class="bg-white py-8 sm:py-8">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ props.title }}</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">{{ props.subtitle }}</p>
            </div>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <div class="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-3 sm:mt-3 sm:pt-3 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <article v-for="blog in props.blogs" :key="blog.slug" class="flex max-w-xl flex-col items-start justify-between">
                <div class="flex items-center gap-x-4 text-xs">
                    <p class="text-gray-500">{{ formatDate(blog.created_at, 'MMM Do, YYYY') }}</p>
                    <a v-if="blog.category" class="relative text-z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium hover:bg-gray-200" :class="[$theme.secondBgTextColour]">{{ blog.category.category }}</a>
                </div>
                <div class="mt-3">
                    <router-link :to="{ name: 'Blog View', params: {slug: blog.slug } }">
                        <img v-if="blog.image_filename" :src="assetUrl + blog.image_filename" class="w-48 h-48">
                        <img v-else :src="defaultImage" class="w-48 h-48">
                    </router-link>
                </div>
                <div v-if="blog.author" class="relative mt-1 flex items-center gap-x-4">
                    <h3 class="mt-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <router-link :to="{ name: 'Blog View', params: {slug: blog.slug } }" :class="[$theme.secondBgTextColour]">{{ blog.title }}</router-link>
                    </h3>
                </div>
                </article>
            </div>

            <Pagination 
                v-if="props.data.meta.total > 1"
                :data="props.data"
                @getData="getData"
                class="my-8 "
            />      
        </div>
    </div>
</template>

<script setup>
 
    import { formatDate } from "@/composables/date";

    import Pagination from "@/components/navigation/Pagination.vue";
    import { ref } from "@vue/reactivity";


    const assetUrl = import.meta.env.VITE_API_ASSET_URL
    const defaultImage = import.meta.env.VITE_API_DEFAULT_IMAGE

    const props = defineProps({
        dataCount: {
            type: Number,
            required: true,
            default: 0
        },
        blogs: {
            type: Object,
            default: [],
        },
        data: {
            type: Object,
            required: false,
        },
        title: {
            type: [String, Number],
            default: "Blog"
        },
        subtitle: {
            type: [String, Number],
            default: "What's been going on"
        },
    });

    const keyword = ref({})
    const limit = ref({})
    limit.value = props.pageLimit

    const emit = defineEmits(['getData', 'search', 'updatePageLength'])

    const getData = (page) => {
        emit('getData', page, keyword.value, limit.value);
    }

</script>
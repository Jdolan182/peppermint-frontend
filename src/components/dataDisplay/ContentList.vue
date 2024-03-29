<template>
    <div class="bg-white py-8 sm:py-8">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ props.title }}</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">{{ props.subtitle }}</p>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article v-for="blog in props.blogs" :key="blog.slug" class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
                <p class="text-gray-500">{{ formatDate(blog.created_at, 'MMM Do, YYYY') }}</p>
                <a v-if="blog.category" class="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">{{ blog.category.category }}</a>
            </div>
            <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <router-link :to="{ name: 'Blog View', params: {slug: blog.slug } }">{{ blog.title }}</router-link>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ blog.subtitle }}</p>
            </div>
            <div v-if="blog.author" class="relative mt-8 flex items-center gap-x-4">
                <img v-if="blog.author.imageUrl" :src="blog.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
                <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                    <span class="absolute inset-0" />
                    {{ blog.author.name }}
                </p>
                <p class="text-gray-600">{{ blog.author.role }}</p>
                </div>
            </div>
            </article>
        </div>
        </div>
    </div>
</template>

<script setup>

    import { formatDate } from "@/composables/date";

    const props = defineProps({
        blogs: {
            type: Array,
            default: [],
        },
        data: {
            type: Object,
            required: false,
        },
        title: {
            type: [String, Number],
            default: 'Blog'
        },
        subtitle: {
            type: [String, Number],
            default: "What's been going on"
        },
    });
    const posts = [
    {
        id: 1,
        title: 'Boost your conversion rate',
        href: '#',
        description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        category: { title: 'Marketing', href: '#' },
        author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    // More posts...
    ]
</script>
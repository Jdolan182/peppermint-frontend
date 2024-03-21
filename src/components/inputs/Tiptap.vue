<template>
    <EditorContent :editor="editor" />
</template>
  
<script setup>
    import { useEditor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    
    const editor = useEditor({
        content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
            transformPastedText(text) {
            return text.toUpperCase()
            }
        }
    })
</script>
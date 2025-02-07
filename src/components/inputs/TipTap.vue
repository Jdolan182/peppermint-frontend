<template>
    <section
      v-if="editor"
      class="buttons text-gray-700 flex items-center flex-wrap gap-x-3 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm border-gray-300  placeholder-gray-500 text-gray-900"
    >
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('bold') }"
        class="p-1"
      >
        <BoldIcon title="Bold" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('italic') }"
        class="p-1"
      >
        <ItalicIcon title="Italic" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('underline') }"
        class="p-1"
      >
        <UnderlineIcon title="Underline" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          'bg-gray-200 rounded-sm': editor.isActive('heading', { level: 1 }),
        }"
        class="p-1"
      >
        <H1Icon title="H1" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{
          'bg-gray-200 rounded-sm': editor.isActive('heading', { level: 2 }),
        }"
        class="p-1"
      >
        <H2Icon title="H2" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('bulletList') }"
        class="p-1"
      >
        <ListIcon title="Bullet List" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('orderedList') }"
        class="p-1"
      >
        <OrderedListIcon title="Ordered List" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('blockquote') }"
        class="p-1"
      >
        <BlockquoteIcon title="Blockquote" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'bg-gray-200 rounded-sm': editor.isActive('codeBlock') }"
        class="p-1"
      >
        <CodeIcon title="Code" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="p-1"
      >
        <HorizontalRuleIcon title="Horizontal Rule" />
      </button>
      <button
        type="button"
        class="p-1 disabled:text-gray-400"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <UndoIcon title="Undo" />
      </button>
      <button
        type="button"
        @click="addImage"
      >
        <RedoIcon title="Redo" />
      </button>
      <button
        type="button"
        @click="addImage"
         class="p-1"
      >
        <HorizontalRuleIcon title="Image" />
      </button>
    </section>
    <EditorContent :editor="editor" />
</template>
  
<script setup>
    import { useEditor, EditorContent, Extension  } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'
    import Underline from '@tiptap/extension-underline' 
    import BulletList  from '@tiptap/extension-bullet-list'
    import OrderedList  from '@tiptap/extension-ordered-list'
    import Image from '@tiptap/extension-image'


    import BoldIcon from 'vue-material-design-icons/FormatBold.vue'
    import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
    import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue'
    import H1Icon from 'vue-material-design-icons/FormatHeader1.vue'
    import H2Icon from 'vue-material-design-icons/FormatHeader2.vue'
    import ListIcon from 'vue-material-design-icons/FormatListBulleted.vue'
    import OrderedListIcon from 'vue-material-design-icons/FormatListNumbered.vue'
    import BlockquoteIcon from 'vue-material-design-icons/FormatQuoteClose.vue'
    import CodeIcon from 'vue-material-design-icons/CodeTags.vue'
    import HorizontalRuleIcon from 'vue-material-design-icons/Minus.vue'
    import UndoIcon from 'vue-material-design-icons/Undo.vue'
    import RedoIcon from 'vue-material-design-icons/Redo.vue'

    const props = defineProps({
        modelValue: String,
    })

    const emit = defineEmits(['update:modelValue'])

    const editor = useEditor({
        content: props.modelValue,
        onUpdate: ({ editor }) => {
            emit('update:modelValue', editor.getHTML())
        },
        extensions: [
            StarterKit.configure({
              CodeBlock: {
                  class: 'pre code',
              },
            }),
            Underline,
            Image.configure({
              inline: true,
              allowBase64: true
            }),
            BulletList.configure({
              HTMLAttributes: {
                class: 'list-disc',
              },
            }),
            OrderedList.configure({
              HTMLAttributes: {
                class: 'list-decimal',
              },
            })
        ],
        editorProps: {
            attributes: {
                class: 'resize-horizontal prose content-none block w-full min-h-[12rem] max-w-none overflow-y-auto appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm border-gray-300  placeholder-gray-500 text-gray-900',
            },
            transformPastedText(text) {
                return text.toUpperCase()
            }
        }
    })

    
    const addImage = async () => {
      const url = window.prompt('URL')

      if (url) {
        editor.value.chain().focus().setImage({ src: url }).run()
      }
    }
</script>
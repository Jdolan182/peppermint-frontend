<template>
    <form @submit.prevent="submit">
      <slot></slot>
    </form>
</template>
  
<script>
  import { ref } from "@vue/reactivity";
  export default {
    name: "Form",
    emits: ["submit"],
    setup(props, ctx) {
      const delay = ref(false);
      const submit = () => {
        if (!delay.value) {
          delay.value = true;
          emitSubmit();
        }
      };
      const emitSubmit = async () => {
        ctx.emit("submit");
        setTimeout(() => {
          delay.value = false;
        }, 2500);
      };
      return { submit };
    },
  };
</script>
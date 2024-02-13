<template>
  <div class="mb-5">
    <input
      :type="type"
      :placeholder="placeholder"
      required
      :class="[
          styles[styleName],
          sizes[size],
          className,
        ]"
      :name="name"
    />
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  placeholder: string;
  name: string;
  styleName?: 'primary';
  className?: string;
  size?: 'md' | 'lg';
  type: string;
  [x: string]: any;
}
withDefaults(defineProps<Props>(), {
  type: "text",
  size: "md",
  styleName: "primary",
});
const styles = {
  primary: "transition w-full border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-800 focus:border-gray-600 ring-gray-200",
};

const sizes = {
  md: "px-4 py-3",
  lg: "px-5 py-3",
};

</script>

<style></style>

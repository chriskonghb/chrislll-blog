<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
    <button
      :disabled="page <= 1"
      @click="emit('update:page', page - 1)"
      class="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      上一页
    </button>
    <div class="flex items-center gap-1">
      <button
        v-for="p in displayedPages"
        :key="p"
        @click="emit('update:page', p)"
        class="w-10 h-10 rounded-lg text-sm font-medium transition"
        :class="p === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'"
      >
        {{ p }}
      </button>
    </div>
    <button
      :disabled="page >= totalPages"
      @click="emit('update:page', page + 1)"
      class="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      下一页
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
});

const emit = defineEmits(['update:page']);

const displayedPages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, props.page - Math.floor(maxVisible / 2));
  let end = Math.min(props.totalPages, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-white"
      :class="type === 'error' ? 'bg-slate-900 border-rose-500/50 shadow-rose-500/20' : 'bg-slate-900 border-emerald-500/50 shadow-emerald-500/20'"
    >
      <div 
        class="p-1 rounded-full"
        :class="type === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'"
      >
        <component :is="type === 'error' ? AlertCircle : Check" class="w-4 h-4" />
      </div>
      <div>
        <h4 class="text-sm font-semibold">{{ title }}</h4>
        <p class="text-xs text-slate-400">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Check, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  message: String,
  type: {
    type: String,
    default: 'success' 
  }
})

const visible = ref(false)

const show = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}

defineExpose({ show })
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
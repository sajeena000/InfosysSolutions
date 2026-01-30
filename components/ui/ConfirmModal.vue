<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
        
        <div class="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden transform transition-all">
          <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

          <div class="relative z-10 text-center">
            <div class="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
              <file-warning-icon v-if="type === 'danger'" class="w-6 h-6 text-rose-500" />
              <info-icon v-else class="w-6 h-6 text-indigo-500" />
            </div>

            <h3 class="text-xl font-display font-bold text-white mb-2">
              {{ title }}
            </h3>
            
            <p class="text-slate-400 text-sm mb-6">
              {{ description }}
            </p>

            <div class="flex gap-3">
              <button 
                type="button"
                @click="$emit('update:modelValue', false)" 
                class="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/5 transition-colors"
              >
                {{ cancelText }}
              </button>
              <button 
                type="button"
                @click="$emit('confirm')"
                class="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium shadow-lg transition-all"
                :class="type === 'danger' ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'"
              >
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { AlertTriangle as FileWarningIcon, Info as InfoIcon } from 'lucide-vue-next'

defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Are you sure?'
  },
  description: {
    type: String,
    default: 'This action cannot be undone.'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'primary'].includes(value)
  }
})

defineEmits(['update:modelValue', 'confirm'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

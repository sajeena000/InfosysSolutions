<template>
  <div class="relative">
    <button 
      @click.stop="isOpen = !isOpen"
      class="flex items-center justify-center px-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none h-8"
      :class="{ 'text-indigo-400': modelValue !== 'all' }"
    >
      <Filter class="w-4 h-4" />
      <span v-if="modelValue !== 'all'" class="ml-2 text-xs font-medium">{{ modelValue }}</span>
    </button>

    <div 
      v-if="isOpen"
      v-click-outside="close"
      class="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 py-1"
    >
      <div class="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-white/5 mb-1">
        Search filter
      </div>
      
      <button
        v-for="option in options"
        :key="option.value"
        @click="select(option.value)"
        class="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
        :class="modelValue === option.value ? 'text-indigo-400' : 'text-slate-300'"
      >
        <span>{{ option.label }}</span>
        <Check v-if="modelValue === option.value" class="w-3 h-3" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Filter, Check } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const options = [
  { label: 'All', value: 'all' },
  { label: 'Team', value: 'team' },
  { label: 'Projects', value: 'projects' },
  { label: 'Clients', value: 'clients' },
  { label: 'Blogs', value: 'blogs' },
  { label: 'Events', value: 'events' },
  { label: 'Contacts', value: 'contacts' }
]

const select = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const close = () => {
  isOpen.value = false
}

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

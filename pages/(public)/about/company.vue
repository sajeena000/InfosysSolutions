<template>
  <div>
    <section class="relative py-20 bg-gradient-to-br from-blue-600 to-indigo-600 dark:bg-none dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our Company</h1>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          Building the future of digital solutions, one project at a time
        </p>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 transition-colors">
            <div class="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Target class="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              To empower businesses worldwide with innovative software solutions that drive growth, 
              efficiency, and competitive advantage. We believe in building long-term partnerships 
              based on trust, transparency, and exceptional delivery.
            </p>
          </div>
          
          <div class="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 transition-colors">
            <div class="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Eye class="w-7 h-7 text-amber-500 dark:text-amber-400" />
            </div>
            <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              To be the global leader in B2B software outsourcing, recognized for our technical 
              excellence, innovative approach, and unwavering commitment to client success. 
              We envision a future where technology seamlessly transforms business operations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Our Journey</h2>
          <p class="text-slate-600 dark:text-slate-400">From a small startup to a trusted global partner</p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
          
          <div class="space-y-12">
            <div v-for="(milestone, index) in milestones" :key="milestone.year" class="relative">
              <div class="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div :class="index % 2 === 0 ? 'md:text-right' : 'md:order-2'">
                  <div class="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 inline-block transition-colors">
                    <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">{{ milestone.year }}</span>
                    <h3 class="font-semibold text-slate-900 dark:text-white mt-1 mb-2">{{ milestone.title }}</h3>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">{{ milestone.description }}</p>
                  </div>
                </div>
                <div :class="index % 2 === 0 ? 'md:order-2' : ''" class="hidden md:block">
                  <div class="w-4 h-4 bg-blue-600 rounded-full mx-auto ring-4 ring-white dark:ring-slate-900 shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Our Values</h2>
          <p class="text-slate-600 dark:text-slate-400">The principles that guide everything we do</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="value in values" :key="value.title" class="text-center p-6 bg-slate-50 dark:bg-transparent rounded-2xl transition-colors">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <component :is="value.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 class="font-semibold text-slate-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Want to Meet Our Team?
        </h2>
        <p class="text-white/80 dark:text-slate-400 mb-6">
          Get to know the talented people behind our success
        </p>
        <NuxtLink 
          to="/about/team" 
          class="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 dark:bg-blue-600 dark:text-white rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors"
        >
          Meet the Team
          <ArrowRight class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Target, Eye, ArrowRight, Shield, Zap, Heart, Users } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const milestones = [
  { year: '2016', title: 'Founded', description: 'Started with a small team of 5 passionate developers in a garage office.' },
  { year: '2018', title: 'First Major Client', description: 'Secured our first enterprise contract, delivering a complete ERP system.' },
  { year: '2020', title: 'Global Expansion', description: 'Opened offices in 3 new countries and grew to 50+ team members.' },
  { year: '2022', title: 'AI Division Launch', description: 'Established dedicated AI and ML solutions team for cutting-edge projects.' },
  { year: '2024', title: '150+ Projects', description: 'Celebrated milestone of 150+ successful project deliveries worldwide.' }
]

const values = [
  { icon: Shield, title: 'Integrity', description: 'We maintain the highest ethical standards in all our dealings.' },
  { icon: Zap, title: 'Innovation', description: 'Constantly pushing boundaries to deliver cutting-edge solutions.' },
  { icon: Heart, title: 'Excellence', description: 'Committed to quality in every line of code we write.' },
  { icon: Users, title: 'Collaboration', description: 'Working together with clients as true partners in success.' }
]
</script>

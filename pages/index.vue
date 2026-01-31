<template>
  <div>
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">

      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 dark:bg-none dark:bg-slate-950"></div>
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/20 dark:bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8">
          <Sparkles class="w-4 h-4" />
          <span>Transforming Ideas into Digital Reality</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Building Tomorrow's
          <span class="block bg-gradient-to-r from-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Software Solutions
          </span>
        </h1>
        
        <p class="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10">
          We're a B2B software agency specializing in outsourcing and custom solutions. 
          From web applications to AI-powered systems, we bring your vision to life.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/contact" 
            class="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-xl shadow-blue-500/20 hover:scale-105 hover:bg-blue-500 transition-all"
          >
            Start Your Project
          </NuxtLink>
          <NuxtLink 
            to="/services" 
            class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
          >
            View Services
          </NuxtLink>
        </div>
        
        <!-- Stats -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <p class="text-4xl font-display font-bold text-white mb-1">150+</p>
            <p class="text-white/60 text-sm">Projects Delivered</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-display font-bold text-white mb-1">50+</p>
            <p class="text-white/60 text-sm">Happy Clients</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-display font-bold text-white mb-1">8+</p>
            <p class="text-white/60 text-sm">Years Experience</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-display font-bold text-white mb-1">24/7</p>
            <p class="text-white/60 text-sm">Support Available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="service in services" :key="service.title" class="group p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:border-slate-600">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-slate-700 group-hover:bg-blue-500/20 dark:group-hover:bg-slate-600 flex items-center justify-center mb-4 transition-colors">
              <component :is="service.icon" class="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-300 text-sm transition-colors">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Snippet -->
    <section class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-blue-600 dark:text-blue-400 font-medium text-sm uppercase tracking-wider">About Us</span>
            <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mt-2 mb-6">
              Your Trusted Technology Partner
            </h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Founded with a vision to bridge the gap between innovative ideas and technological execution, 
              Infosys Solutions has grown into a leading B2B software agency. We specialize in delivering 
              high-quality outsourcing services and custom software solutions that drive business growth.
            </p>
            <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Our team of experienced developers, designers, and project managers work collaboratively 
              to ensure every project exceeds expectations. From startups to enterprises, we've helped 
              businesses across industries transform their digital presence.
            </p>
            <NuxtLink 
              to="/about/company" 
              class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-4 transition-all"
            >
              Learn More About Us
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>
          
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center text-white p-8">
                  <p class="text-6xl font-display font-bold mb-2">8+</p>
                  <p class="text-xl">Years of Excellence</p>
                </div>
              </div>
            </div>
            <!-- Floating Card -->
            <div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle class="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">100% Success Rate</p>
                  <p class="text-sm text-slate-600 dark:text-slate-400">Project Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
          Ready to Start Your Project?
        </h2>
        <p class="text-slate-600 dark:text-white/80 mb-8 text-lg">
          Let's discuss how we can help bring your vision to life.
        </p>
        <NuxtLink 
          to="/contact" 
          class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-xl hover:scale-105 transition-all hover:bg-blue-500"
        >
          Get in Touch
          <ArrowRight class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Sparkles, Globe, Smartphone, Bot, Cloud, ArrowRight, CheckCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications with modern frameworks and responsive design.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.'
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    description: 'Machine learning and AI-powered solutions to automate and optimize.'
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Cloud infrastructure, CI/CD pipelines, and scalable architectures.'
  }
]
</script>
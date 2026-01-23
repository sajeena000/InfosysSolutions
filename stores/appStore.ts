import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAuthenticated: false, 
    searchQuery: '',
    userProfile: {
      name: 'Intern Developer',
      email: 'dev@dashboard.com',
      notifications: true
    },
    activities: [], 
    team: []        
  }),
  
  getters: {
    totalTeamCount: (state) => state.team.length,
    onlineCount: (state) => state.team.filter(m => m.online).length
  },

  actions: {
    logActivity(text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      this.activities.unshift({ id: Date.now(), text, time, type })
      
      if (this.activities.length > 20) this.activities.pop()
    },

    async initStore() {
      if (import.meta.client) { 
        const auth = localStorage.getItem('is-auth')
        this.isAuthenticated = auth === 'true'
      }

      try {
        const data = await $fetch('/api/team')
        this.team = data
      } catch (e) {
        console.error("Failed to load team", e)
      }
    },
    
    login() {
      this.isAuthenticated = true
      localStorage.setItem('is-auth', 'true')
      this.initStore() 
    },

    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('is-auth')
      this.team = []
    },

    async addTeamMember(member: any) {
      try {
        const newMember = await $fetch('/api/team', {
            method: 'POST',
            body: member
        })
        this.team.unshift(newMember)
        this.logActivity(`New member added: ${member.name}`, 'success') 
      } catch (e) {
        this.logActivity('Failed to add member', 'error')
        throw e 
      }
    },

    async editTeamMember(updatedMember: any) {
        try {
            const res = await $fetch(`/api/team/${updatedMember.id}`, {
                method: 'PUT',
                body: updatedMember
            })
            
            const index = this.team.findIndex(m => m.id === updatedMember.id)
            if (index !== -1) {
                this.team[index] = res
            }
            this.logActivity(`Member updated: ${updatedMember.name}`, 'info') 
        } catch (e) {
            this.logActivity('Failed to update member', 'error')
            throw e 
        }
    },

    async removeTeamMember(id: number) { 
      try {
        await $fetch(`/api/team/${id}`, { method: 'DELETE' })
        
        this.team = this.team.filter(m => m.id !== id)
        this.logActivity(`Member removed`, 'warning') 
      } catch (e) {
        this.logActivity('Failed to remove member', 'error')
        throw e 
      }
    },
    
    updateSettings(payload: any) {
      this.userProfile = { ...this.userProfile, ...payload }
      this.logActivity('User profile settings updated', 'info') 
    }
  }
})
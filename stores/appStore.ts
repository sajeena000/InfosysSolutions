import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    searchQuery: '',
    notifications: [] as string[],
    team: [
      { id: 1, name: 'Tom Holland', role: 'Frontend Lead', email: 'tom@dashboard.com', online: true, tags: ['Vue', 'Design'] },
      { id: 2, name: 'Sajeena Malla', role: 'Backend Dev', email: 'sajeena@dashboard.com', online: false, tags: ['Node', 'SQL'] },
      { id: 3, name: 'Chris Hemsworth', role: 'Product Designer', email: 'hemsworth@dashboard.com', online: true, tags: ['Figma', 'UX'] },
      { id: 4, name: 'Nishant Malla', role: 'DevOps Engineer', email: 'nishant@dashboard.com', online: false, tags: ['AWS', 'CI/CD'] },
      { id: 5, name: 'Ryan Gosling', role: 'Intern', email: 'ryan@dashboard.com', online: true, tags: ['Learning'] },
    ]
  }),
  
  actions: {
    addTeamMember(member: any) {
      this.team.unshift({
        id: Date.now(),
        online: false, 
        tags: ['New'], 
        ...member
      })
    },
    removeTeamMember(email: string) {
      this.team = this.team.filter(m => m.email !== email)
    },
    setSearch(query: string) {
      this.searchQuery = query
    }
  }
})
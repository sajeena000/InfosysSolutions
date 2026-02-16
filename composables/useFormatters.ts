type DateFormat = 'short' | 'long' | 'withTime' | 'withWeekday'

export const useFormatters = () => {
  const formatCurrency = (value: number | undefined | null) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0)
  }

  const formatDate = (dateString: string | undefined | null, format: DateFormat = 'short') => {
    if (!dateString) return 'Unknown'

    const options: Intl.DateTimeFormatOptions = (() => {
      switch (format) {
        case 'long':
          return { year: 'numeric', month: 'long', day: 'numeric' }
        case 'withTime':
          return { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
        case 'withWeekday':
          return { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
        case 'short':
        default:
          return { month: 'short', day: 'numeric', year: 'numeric' }
      }
    })()

    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return { formatCurrency, formatDate }
}


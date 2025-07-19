import { useState, useCallback } from 'react'
import { CozeSearchRequest, CozeApiResponse } from '@/lib/types'

interface UseSearchReturn {
  searchData: any
  isLoading: boolean
  error: string | null
  search: (request: CozeSearchRequest) => Promise<void>
  clearResults: () => void
}

export function useSearch(): UseSearchReturn {
  const [searchData, setSearchData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (request: CozeSearchRequest) => {
    setIsLoading(true)
    setError(null)
    setSearchData(null)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data: CozeApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || '搜索失败')
      }

      setSearchData(data.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误'
      setError(errorMessage)
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setSearchData(null)
    setError(null)
  }, [])

  return {
    searchData,
    isLoading,
    error,
    search,
    clearResults,
  }
}

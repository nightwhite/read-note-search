// Coze API 相关类型定义

export interface CozeSearchRequest {
  keywords: string
  cookie: string
}

export interface CozeWorkflowParameters {
  cookie: string
  keywords: string
}

export interface CozeWorkflowRequest {
  workflow_id: string
  parameters: CozeWorkflowParameters
}

export interface CozeSearchResult {
  id: string
  title: string
  content: string
  url?: string
  author?: string
  publishTime?: string
  tags?: string[]
  platform?: string
  score?: number
}

export interface CozeApiResponse {
  success: boolean
  data?: any
  error?: string
  message?: string
}

export interface SearchFormData {
  keywords: string
  cookie: string
}

// 表格显示相关类型
export interface SearchResultItem {
  id: string
  title: string
  content: string
  author?: string
  publishTime?: string
  platform?: string
  url?: string
  score?: number
}

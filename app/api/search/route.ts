import { NextRequest, NextResponse } from 'next/server'
import { CozeSearchRequest, CozeApiResponse, CozeWorkflowRequest } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: CozeSearchRequest = await request.json()
    
    if (!body.keywords) {
      return NextResponse.json(
        { success: false, error: '关键词不能为空' },
        { status: 400 }
      )
    }

    if (!body.cookie) {
      return NextResponse.json(
        { success: false, error: 'Cookie 不能为空' },
        { status: 400 }
      )
    }

    // 从环境变量获取配置
    const apiToken = process.env.COZE_API_TOKEN
    const workflowId = process.env.COZE_WORKFLOW_ID
    const apiBaseUrl = process.env.COZE_API_BASE_URL

    if (!apiToken || !workflowId || !apiBaseUrl) {
      return NextResponse.json(
        { success: false, error: '服务配置错误' },
        { status: 500 }
      )
    }

    // 构建请求数据
    const cozeRequest: CozeWorkflowRequest = {
      workflow_id: workflowId,
      parameters: {
        cookie: body.cookie,
        keywords: body.keywords
      }
    }

    // 调用 Coze API
    const response = await fetch(`${apiBaseUrl}/workflow/stream_run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cozeRequest)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Coze API Error:', response.status, errorText)
      return NextResponse.json(
        { 
          success: false, 
          error: `API 调用失败: ${response.status}`,
          message: errorText 
        },
        { status: response.status }
      )
    }

    // 处理流式响应
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let result = ''

    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          result += chunk
        }
      } finally {
        reader.releaseLock()
      }
    }

    // 解析结果
    let parsedData
    try {
      parsedData = JSON.parse(result)
    } catch (error) {
      parsedData = { content: result }
    }

    const apiResponse: CozeApiResponse = {
      success: true,
      data: parsedData,
      message: '搜索完成'
    }

    return NextResponse.json(apiResponse)

  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '服务器内部错误',
        message: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    )
  }
}

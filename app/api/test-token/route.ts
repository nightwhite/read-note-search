import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiToken = process.env.COZE_API_TOKEN
    const workflowId = process.env.COZE_WORKFLOW_ID
    const apiBaseUrl = process.env.COZE_API_BASE_URL

    // 检查配置
    const config = {
      hasToken: !!apiToken,
      tokenValid: apiToken && !apiToken.includes('REPLACE') && !apiToken.includes('请替换'),
      tokenPrefix: apiToken?.substring(0, 10) + '...',
      tokenLength: apiToken?.length,
      hasWorkflowId: !!workflowId,
      hasApiBaseUrl: !!apiBaseUrl,
    }

    if (!config.tokenValid) {
      return NextResponse.json({
        success: false,
        error: 'Token 未配置或无效',
        config
      })
    }

    // 简单的 API 测试（不需要 Cookie）
    try {
      const testResponse = await fetch(`${apiBaseUrl}/workflows`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      })

      return NextResponse.json({
        success: testResponse.ok,
        status: testResponse.status,
        message: testResponse.ok ? 'Token 有效' : 'Token 无效或权限不足',
        config
      })
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'API 连接失败',
        message: error instanceof Error ? error.message : '未知错误',
        config
      })
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '服务器错误',
      message: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 })
  }
}

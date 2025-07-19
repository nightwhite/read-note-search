"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, ExternalLink, CheckCircle, XCircle, Loader2 } from "lucide-react"

export function ConfigHelp() {
  const [isTestingToken, setIsTestingToken] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const testToken = async () => {
    setIsTestingToken(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/test-token')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: '测试失败',
        message: error instanceof Error ? error.message : '未知错误'
      })
    } finally {
      setIsTestingToken(false)
    }
  }

  return (
    <Card className="border-0 shadow-sm mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            配置说明
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={testToken}
            disabled={isTestingToken}
            className="h-6 px-2 text-xs"
          >
            {isTestingToken ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                测试中
              </>
            ) : (
              '测试 Token'
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <div className="space-y-3">
              <p className="font-medium">🔑 API Token 配置步骤：</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>访问 <a href="https://www.coze.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Coze 平台</a></li>
                <li>登录并进入工作台</li>
                <li>在设置或 API 管理中生成新的 API Token</li>
                <li>复制以 "cztei_" 开头的完整 Token</li>
                <li>编辑项目根目录的 .env.local 文件</li>
                <li>将 COZE_API_TOKEN=REPLACE_WITH_YOUR_VALID_API_TOKEN 中的占位符替换为真实 Token</li>
                <li>保存文件并重启开发服务器 (Ctrl+C 然后 pnpm dev)</li>
              </ol>

              <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                <p className="font-medium mb-1">示例配置：</p>
                <code className="text-green-600">COZE_API_TOKEN=cztei_xxxxxxxxxxxxxxxxxxxxxxxxx</code>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">当前配置状态：</p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              Workflow ID: 配置完成
            </Badge>
            <Badge variant="destructive" className="text-xs">
              API Token: 需要配置
            </Badge>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          <p>💡 提示：Token 配置完成后，错误提示将消失</p>
        </div>
      </CardContent>
    </Card>
  )
}

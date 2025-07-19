"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { SearchFormData } from "@/lib/types"
import { useSearch } from "@/hooks/use-search"
import { SearchResultsTable } from "@/components/search-results-table"
import { ConfigHelp } from "@/components/config-help"

const searchSchema = z.object({
  keywords: z.string().min(1, "请输入搜索关键词").max(100, "关键词不能超过100个字符"),
  cookie: z.string()
    .min(1, "请输入 Cookie")
    .max(10000, "Cookie 过长")
    .refine((val) => val.includes('='), "Cookie 格式无效，应包含键值对"),
})

export default function HomePage() {
  const { searchData, isLoading, error, search, clearResults } = useSearch()
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const [cookieWarning, setCookieWarning] = useState<string | null>(null)

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keywords: "",
      cookie: "",
    },
  })

  // 清理 Cookie 中的非 ASCII 字符
  const cleanCookie = (cookie: string) => {
    const cleaned = cookie.replace(/[^\x00-\x7F]/g, "")
    if (cleaned !== cookie) {
      setCookieWarning(`已清理 ${cookie.length - cleaned.length} 个非 ASCII 字符`)
      form.setValue('cookie', cleaned)
    } else {
      setCookieWarning(null)
    }
  }

  async function onSubmit(values: SearchFormData) {
    setCookieWarning(null)
    await search(values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI 智能搜索</h1>
              <p className="text-sm text-gray-600">基于 AI 技术的智能内容搜索</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Search Form */}
        <div className={`${isLeftPanelCollapsed ? 'w-12' : 'w-96'} transition-all duration-300 border-r bg-white/50 backdrop-blur-sm flex flex-col`}>
          {/* Collapse Button */}
          <div className="p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
              className="w-full justify-start"
            >
              {isLeftPanelCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  收起面板
                </>
              )}
            </Button>
          </div>

          {/* Search Form */}
          {!isLeftPanelCollapsed && (
            <div className="flex-1 p-4 overflow-y-auto">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">搜索设置</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>搜索关键词</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="例如：AI 人工智能"
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cookie"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center justify-between">
                              Cookie
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => cleanCookie(field.value)}
                                disabled={isLoading || !field.value}
                              >
                                清理字符
                              </Button>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="请输入完整的 Cookie 字符串..."
                                className="min-h-[200px] font-mono text-xs"
                                {...field}
                                disabled={isLoading}
                              />
                            </FormControl>
                            {cookieWarning && (
                              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                ⚠️ {cookieWarning}
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            搜索中...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            开始搜索
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Error Display */}
              {error && (
                <Alert className="mt-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <div className="space-y-2">
                      <div>{error}</div>
                      {error.includes('Token') && (
                        <div className="text-xs text-red-600">
                          <p>💡 解决方案：</p>
                          <ul className="list-disc list-inside space-y-1 mt-1">
                            <li>检查 .env.local 文件中的 COZE_API_TOKEN 是否正确</li>
                            <li>确认 Token 是否已过期</li>
                            <li>重新获取新的 API Token</li>
                          </ul>
                        </div>
                      )}
                      {error.includes('ByteString') && (
                        <div className="text-xs text-red-600">
                          <p>💡 字符编码问题解决方案：</p>
                          <ul className="list-disc list-inside space-y-1 mt-1">
                            <li>Cookie 中包含非 ASCII 字符（如中文、特殊符号）</li>
                            <li>点击 Cookie 输入框旁的"清理字符"按钮</li>
                            <li>或手动删除 Cookie 中的中文和特殊字符</li>
                            <li>确保 Cookie 只包含英文字母、数字和基本符号</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Configuration Help */}
              {error && error.includes('Token') && (
                <ConfigHelp />
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
            {searchData ? (
              <SearchResultsTable data={searchData} onClear={clearResults} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">开始搜索</h3>
                  <p className="text-sm">在左侧输入关键词和 Cookie 开始搜索</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

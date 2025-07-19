"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import { SearchResultItem } from "@/lib/types"

interface SearchResultsTableProps {
  data: any
  onClear: () => void
}

export function SearchResultsTable({ data, onClear }: SearchResultsTableProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // 解析流式响应数据
  const parseStreamData = (content: string): any => {
    try {
      // 按行分割流式数据
      const lines = content.split('\n').filter(line => line.trim())

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.substring(6) // 移除 "data: " 前缀
          try {
            const data = JSON.parse(dataStr)
            if (data.content) {
              // 尝试解析 content 字段中的 JSON
              try {
                const contentData = JSON.parse(data.content)
                if (contentData.data && Array.isArray(contentData.data)) {
                  return contentData.data
                }
              } catch {
                // 如果 content 不是 JSON，返回原始内容
                return data.content
              }
            }
            return data
          } catch {
            continue
          }
        }
      }
      return null
    } catch {
      return null
    }
  }

  // 尝试解析数据为表格格式
  const parseDataToTableFormat = (rawData: any): SearchResultItem[] => {
    if (!rawData) return []

    // 如果是字符串，先尝试解析流式数据
    if (typeof rawData === 'string') {
      const streamData = parseStreamData(rawData)
      if (streamData) {
        return parseDataToTableFormat(streamData)
      }

      try {
        const parsed = JSON.parse(rawData)
        return parseDataToTableFormat(parsed)
      } catch {
        // 如果不是 JSON，创建一个简单的结果项
        return [{
          id: '1',
          title: '搜索结果',
          content: rawData,
        }]
      }
    }

    // 如果是数组，检查是否是小红书数据格式
    if (Array.isArray(rawData)) {
      return rawData.map((item, index) => {
        // 小红书数据格式
        if (item.note_id && item.note_display_title) {
          const likedCount = item.note_liked_count?.replace(/[^\d]/g, '') || '0'
          return {
            id: item.note_id,
            title: item.note_display_title,
            content: `${item.note_card_type === 'video' ? '📹 视频' : '📷 图文'} | ${item.note_cover_width}×${item.note_cover_height}`,
            author: item.auther_nick_name,
            publishTime: item.note_card_type === 'video' ? '视频' : '图文',
            platform: '小红书',
            url: item.note_url,
            score: parseInt(likedCount),
            // 额外信息
            coverUrl: item.note_cover_url_default,
            authorAvatar: item.auther_avatar,
            authorUrl: item.auther_home_page_url,
            xsecToken: item.note_xsec_token
          }
        }

        // 通用格式
        return {
          id: item.id || `${index + 1}`,
          title: item.title || item.name || `结果 ${index + 1}`,
          content: item.content || item.description || item.summary || JSON.stringify(item),
          author: item.author || item.creator,
          publishTime: item.publishTime || item.createdAt || item.date,
          platform: item.platform || item.source,
          url: item.url || item.link,
          score: item.score || item.relevance,
        }
      })
    }

    // 如果是对象
    if (typeof rawData === 'object') {
      // 检查是否有 content 字段（流式数据）
      if (rawData.content) {
        return parseDataToTableFormat(rawData.content)
      }

      // 检查是否有 results 或 data 字段
      if (rawData.results) return parseDataToTableFormat(rawData.results)
      if (rawData.data) return parseDataToTableFormat(rawData.data)
      if (rawData.items) return parseDataToTableFormat(rawData.items)

      // 否则将对象本身作为一个结果项
      return [{
        id: '1',
        title: rawData.title || '搜索结果',
        content: rawData.content || JSON.stringify(rawData, null, 2),
        author: rawData.author,
        publishTime: rawData.publishTime,
        platform: rawData.platform,
        url: rawData.url,
        score: rawData.score,
      }]
    }

    return []
  }

  const results = parseDataToTableFormat(data)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (results.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            搜索结果
            <Button variant="outline" size="sm" onClick={onClear}>
              清除结果
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            没有找到搜索结果
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          🔍 搜索结果 ({results.length} 条)
          <Button variant="outline" size="sm" onClick={onClear}>
            清除结果
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)] overflow-auto p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">序号</TableHead>
                <TableHead className="w-[80px]">封面</TableHead>
                <TableHead className="min-w-[300px]">标题</TableHead>
                <TableHead className="w-[100px]">类型</TableHead>
                <TableHead className="w-[150px]">作者</TableHead>
                <TableHead className="w-[100px]">点赞数</TableHead>
                <TableHead className="w-[120px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium text-center">{index + 1}</TableCell>
                  <TableCell>
                    {(result as any).coverUrl && (
                      <img
                        src={(result as any).coverUrl}
                        alt="封面"
                        className="w-16 h-12 object-cover rounded border"
                        loading="lazy"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-medium text-sm leading-tight line-clamp-2">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {result.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {result.publishTime}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {(result as any).authorAvatar && (
                        <div className="flex items-center gap-2">
                          <img
                            src={(result as any).authorAvatar}
                            alt="头像"
                            className="w-6 h-6 rounded-full"
                            loading="lazy"
                          />
                          <span className="text-xs font-medium truncate max-w-20">
                            {result.author}
                          </span>
                        </div>
                      )}
                      {!((result as any).authorAvatar) && result.author && (
                        <Badge variant="outline" className="text-xs">{result.author}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {result.score && result.score > 0 ? (
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-red-500">
                          ❤️ {result.score.toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {result.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="查看原文"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {(result as any).authorUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8 p-0"
                        >
                          <a
                            href={(result as any).authorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="查看作者"
                          >
                            👤
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => copyToClipboard(result.url || result.title, index)}
                        title="复制链接"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

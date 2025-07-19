import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Palette,
  Code,
  Zap,
  CheckCircle
} from "lucide-react"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            AI开发脚手架
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            基于 Next.js 15 + React 19 + TypeScript 的现代化前端开发脚手架
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>现代化技术栈</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Next.js 15 + React 19 + TypeScript，提供最新的开发体验和性能优化
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>优雅的UI系统</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                shadcn/ui + Tailwind CSS，提供美观且高度可定制的组件库
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>开发体验</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                完整的开发工具链，热重载，类型安全，让开发更高效
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "shadcn/ui",
              "Tailwind CSS",
              "React Hook Form",
              "Zod",
              "Lucide React"
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              快速开始
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="mb-2"># 克隆项目</div>
              <div className="mb-2">git clone &lt;repository-url&gt; my-project</div>
              <div className="mb-2">cd my-project</div>
              <div className="mb-4"></div>
              <div className="mb-2"># 安装依赖</div>
              <div className="mb-2">pnpm install</div>
              <div className="mb-4"></div>
              <div className="mb-2"># 启动开发</div>
              <div>pnpm dev</div>
            </div>
          </CardContent>
        </Card>

        {/* Features List */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">特性</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "🚀 零配置即可开始开发",
              "📱 响应式设计，移动端友好",
              "🎨 完整的UI组件库",
              "📝 表单处理和验证",
              "🌈 主题切换支持",
              "⚡ 性能优化和代码分割",
              "🔧 完整的开发工具链",
              "📖 详细的开发文档"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            开始构建您的下一个项目
          </h2>
          <p className="text-gray-600">
            这个脚手架让您可以快速开始现代化Web应用开发
          </p>
        </div>
      </div>
    </div>
  )
}

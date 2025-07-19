# AI开发脚手架

> 🚀 基于 Next.js 15 + React 19 + TypeScript 的现代化前端开发模板

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge)](https://github.com/your-username/ai-dev-scaffold/generate)

## ✨ 特性

- 🚀 **Next.js 15** + **React 19** + **TypeScript** - 最新技术栈
- 🎨 **shadcn/ui** + **Tailwind CSS** - 现代化UI组件库
- 📝 **React Hook Form** + **Zod** - 完整的表单解决方案
- 🌈 **next-themes** - 深色/浅色主题切换
- ⚡ **零配置** - 开箱即用的开发环境

## 🚀 快速开始

### 使用模板

1. 点击上方 **"Use this template"** 按钮
2. 创建您的新仓库
3. 克隆到本地开始开发

### 手动克隆

```bash
# 克隆项目
git clone https://github.com/your-username/ai-dev-scaffold.git my-project
cd my-project

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 项目结构

```text
my-project/
├── app/                  # 页面和路由 (Next.js App Router)
├── components/           # 组件
│   └── ui/              # 基础UI组件 (shadcn/ui)
├── hooks/               # 自定义Hooks
├── lib/                 # 工具函数
└── public/              # 静态资源
```

## 开发指南

### 创建新页面

```typescript
// app/products/page.tsx
export default function ProductsPage() {
  return <div>产品页面</div>
}
```

### 使用UI组件

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Button>点击我</Button>
      </CardContent>
    </Card>
  )
}
```

### 表单处理

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "必填"),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      {/* 表单内容 */}
    </form>
  )
}
```

## 可用组件

- **基础**: Button, Input, Card, Badge, Avatar
- **表单**: Form, Select, Checkbox, RadioGroup
- **反馈**: Alert, Progress, Skeleton, Toast
- **导航**: Tabs, Sheet, Dialog

## 📖 文档

- [开发指南](./docs/development-guide.md) - 完整的开发教程和使用说明

## 🚀 部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 或部署到 Vercel
npx vercel
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。

## ⭐ 支持

如果这个模板对您有帮助，请给个 Star ⭐️

---

**开始构建您的下一个项目吧！** 🚀

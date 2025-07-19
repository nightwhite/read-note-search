# 开发指南

## 技术栈说明

### 核心框架

- **Next.js 15** - React 全栈框架，使用 App Router
- **React 19** - 最新版本 React
- **TypeScript** - 类型安全

### UI 组件库

- **shadcn/ui** - 基于 Radix UI 的组件库
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库

### 表单处理

- **React Hook Form** - 表单管理
- **Zod** - 数据验证

### 其他工具

- **date-fns** - 日期处理
- **next-themes** - 主题切换
- **sonner** - 通知提示

## 页面路由

### App Router 结构

```
app/
├── page.tsx              # 首页 (/)
├── layout.tsx            # 根布局
├── loading.tsx           # 全局加载页
├── error.tsx             # 全局错误页
├── not-found.tsx         # 404 页面
├── about/
│   └── page.tsx          # 关于页面 (/about)
├── users/
│   ├── page.tsx          # 用户列表 (/users)
│   ├── [id]/
│   │   └── page.tsx      # 用户详情 (/users/123)
│   └── create/
│       └── page.tsx      # 创建用户 (/users/create)
└── (dashboard)/          # 路由组
    ├── layout.tsx        # 仪表板布局
    ├── dashboard/
    │   └── page.tsx      # 仪表板首页
    └── settings/
        └── page.tsx      # 设置页面
```

### 创建新页面

```typescript
// app/products/page.tsx
export default function ProductsPage() {
  return (
    <div>
      <h1>产品列表</h1>
      {/* 页面内容 */}
    </div>
  )
}

// 添加元数据
export const metadata = {
  title: '产品列表',
  description: '查看所有产品'
}
```

### 动态路由

```typescript
// app/products/[id]/page.tsx
interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <div>产品 ID: {params.id}</div>
}
```

### 路由组和布局

```typescript
// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside>侧边栏</aside>
      <main>{children}</main>
    </div>
  )
}
```

## 组件开发

### 使用现有 UI 组件

```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>标题</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  )
}
```

### 创建自定义组件

```typescript
// components/ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <h3>{product.name}</h3>
        <p>¥{product.price}</p>
      </CardContent>
    </Card>
  )
}
```

## 表单处理

### 基础表单

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "名称至少2个字符"),
  email: z.string().email("请输入有效邮箱"),
})

export function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder="请输入姓名" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">提交</Button>
      </form>
    </Form>
  )
}
```

## 状态管理

### 本地状态 (useState)

```typescript
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>计数: {count}</p>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  )
}
```

### 全局状态 (Context)

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState } from "react"

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => setUser(user)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
```

## 数据获取

### 客户端数据获取

```typescript
import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>加载中...</div>

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### 服务端数据获取

```typescript
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      {users.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## 样式开发

### Tailwind CSS 使用

```typescript
export function StyledComponent() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900">标题</h2>
        <p className="text-gray-600 mt-2">描述文本</p>
        <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
          操作按钮
        </Button>
      </div>
    </div>
  )
}
```

### 响应式设计

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 移动端1列，平板2列，桌面3列 */}
</div>
```

### 主题切换

```typescript
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      切换主题
    </Button>
  )
}
```

## 常用 Hooks

### 自定义 Hook 示例

```typescript
// hooks/use-api.ts
import { useState, useEffect } from 'react'

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
```

## 部署

### 构建项目

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

### 静态导出 (可选)

```typescript
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

---

这个脚手架已经配置好了所有必要的工具，您可以直接开始开发新功能。遇到问题可以查看 Next.js 和 shadcn/ui 的官方文档。

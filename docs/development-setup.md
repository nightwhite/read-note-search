# 开发环境配置指南

## 系统要求

### 必需软件

- **Node.js**: >= 18.0.0 (推荐使用 LTS 版本)
- **包管理器**: pnpm >= 8.0.0 (推荐) 或 npm >= 9.0.0
- **Git**: >= 2.0.0
- **代码编辑器**: VS Code (推荐) 或其他支持 TypeScript 的编辑器

### 推荐软件

- **终端**: iTerm2 (macOS) / Windows Terminal (Windows) / Zsh (Linux)
- **浏览器**: Chrome/Edge (最新版本，用于开发调试)
- **Git GUI**: SourceTree / GitKraken (可选)

## 环境搭建步骤

### 1. 安装 Node.js

#### 方式一：官方安装包

```bash
# 访问 https://nodejs.org 下载 LTS 版本
# 验证安装
node --version  # 应显示 v18.x.x 或更高版本
npm --version   # 应显示 9.x.x 或更高版本
```

#### 方式二：使用版本管理器 (推荐)

```bash
# 使用 nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

### 2. 安装 pnpm (推荐)

```bash
# 使用 npm 安装
npm install -g pnpm

# 验证安装
pnpm --version  # 应显示 8.x.x 或更高版本
```

### 3. 配置 Git

```bash
# 设置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 设置换行符处理 (Windows)
git config --global core.autocrlf true

# 设置换行符处理 (macOS/Linux)
git config --global core.autocrlf input
```

## 项目初始化

### 1. 克隆项目

```bash
# 克隆仓库
git clone <repository-url>
cd test-ui

# 或使用 GitHub CLI
gh repo clone <username/repository>
cd test-ui
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install
```

### 3. 环境变量配置

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
# 根据项目需要配置相应的环境变量
```

### 4. 启动开发服务器

```bash
# 启动开发服务器
pnpm dev

# 或指定端口
pnpm dev -- --port 3001
```

访问 http://localhost:3000 查看应用。


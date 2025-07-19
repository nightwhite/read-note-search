# 贡献指南

感谢您对 AI开发脚手架 的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/your-username/ai-dev-scaffold/issues) 确保问题未被报告
2. 使用相应的 Issue 模板创建新的 Issue
3. 提供尽可能详细的信息

### 提交代码

1. Fork 这个仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/your-username/ai-dev-scaffold.git
cd ai-dev-scaffold

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码
- 编写清晰的提交信息

### 测试

在提交 PR 之前，请确保：

- 代码能够正常构建 (`pnpm build`)
- 没有 TypeScript 错误
- 遵循项目的代码风格

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下授权。

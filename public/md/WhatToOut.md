## What to expect from here on out

What follows from here is just a bunch of absolute nonsense I’ve written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, *and even italics*.

It’s important to cover all of these use cases for a few reasons:

1. We want everything to look good out of the box.
2. Really just the first reason, that’s the whole point of the plugin.
3. Here’s a third pretend reason though a list with three items looks more realistic than a list with two items.

Now we’re going to try out another header style.

### [**#**](https://daisyui.com/docs/layout-and-typography/#typography-should-be-easy)Typography should be easy

So that’s a header for you — with any luck if we’ve done our job correctly that will look pretty reasonable.

Something a wise person once told me about typography is:

> Typography is pretty important if you don’t want your stuff to look like trash. Make it good then it won’t be bad.

It’s probably important that images look okay here by default as well:

## 特性

- 自动化生成 mdBook 目录。
- 支持自定义目标仓库链接。
- 支持忽略特定文件夹，避免在目录中显示空文件夹。
- 支持自然排序，以便在目录中正确排序数字（如 `1, 2, ..., 10, 11`）。
- 可以通过工作流配置文件设置自动触发时间间隔。
- 识别 `README.md` 文件并将其置顶。
- 使用 mdBook-tools 仓库设计的排版主题。
- 自动生成 `about-this-mdbook.md` 文件并将其置底。

## 配置

本项目的配置通过 `config.ini` 文件进行，该文件包含两个主要部分：`src` 和 `repository`。

### 示例配置

```ini
[src]
ignore_dirs = .git,figs,examples,figures,.github
use_natural_sort = True

[repository]
url = https://github.com/yourusername/yourrepository
```

- `ignore_dirs`: 指定需要忽略的目录列表。
- `use_natural_sort`: 是否启用自然排序。
- `url`: 目标仓库的链接。

## 工作流自动化

本项目通过 `.github/workflows/mdbook.yml` 文件配置 GitHub Actions 工作流，以自动化 mdBook 的生成和部署。

### 工作流配置

```yaml
schedule:
  - cron: '*/30 * * * *'
```

#### 时间间隔含义

`cron` 表达式 `'*/30 * * * *'` 表示每 30 分钟触发一次工作流。

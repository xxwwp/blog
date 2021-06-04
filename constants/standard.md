# 页面风格

## 编写规范

- [Compilation specification](https://spec-md.com/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

尽可能遵守。😄

## 标题

一级标题被设为文章标题，每个文章页面有且仅有一个。

剩余标题共 5 级，分别是：

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 文本

因为是自己写的 Markdown，不用担心 XSS 攻击，所以页面中支持所有 HTML 元素。

- 重点强调：`strong` 元素，对应 Markdown 中的双 `*` 包裹的文本，例如：**重点强调**

- 强调：`em` 元素，对应 Markdown 中的单 `_` 包裹的文本，例如：_强调_

- 超链接：`a` 元素，对应 Markdown 中的超链接，例如：[点这里跳到下一节](#GFM)

- 列表：`ol` 和 `ul` 元素，对应 Markdown 中的有序和无序列表，例如：

  - 这是嵌套的无序列表
    - 这是嵌套的无序列表
    - 这是嵌套的无序列表
    - 这是嵌套的无序列表
  - 这是嵌套的无序列表
  - 这是嵌套的无序列表

  1. 这是嵌套的有序列表
     1. 这是嵌套的有序列表
     1. 这是嵌套的有序列表
  1. 这是嵌套的有序列表
  1. 这是嵌套的有序列表

- 行内代码：`code` 元素，对应 Markdown 中的行内代码，例如：`const a = 100;`

- 代码段：`code` 元素，对应 Markdown 中的代码段，例如：

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <title>demo</title>
      <style>
        /* css code */
        .foo {
          color: silver;
        }
      </style>
    </head>
    <body>
      <div
        class="foo"
        onclick="
          for(var i = 0;i < 10; i++)
          foo(i)"
      >
        click me
      </div>
      <script>
        function foo(count) {
          alert(count);
        }
      </script>
    </body>
  </html>
  ```

## GFM

[GFM（GitHub Flavored Markdown）](https://github.github.com/gfm/) 是 Github 风格的 Markdown 规范，这对原始的 Markdown 进行了扩展，同时进行了更为严格语法限制。

本站使用了 [remark-gfm](https://github.com/remarkjs/remark-gfm) 来对原始 Markdown 进行扩展。[样例](https://github.com/remarkjs/remark-gfm#use)如下：

- Autolink literals

  www.example.com, https://example.com, and contact@example.com.

- Strikethrough

  ~one~ or ~~two~~ tildes.

- Table

  | a   | b   |   c |  d  |
  | --- | :-- | --: | :-: |

- Tasklist

  - [ ] to do
  - [x] done

## 其他

### 表情参考：

- [getemoji](https://getemoji.com/)

- [emoji pedia](https://emojipedia.org/google/gmail/beaming-face-with-smiling-eyes/)

- [unicode](https://unicode.org/emoji/charts/full-emoji-list.html)

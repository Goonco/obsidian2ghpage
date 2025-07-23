> [!WARNING]
> This is an experimental package and is still in development.

# Obsidian2GHPage

<br/>
<div align="center">
<img src="https://github.com/user-attachments/assets/dcf6b0c0-54d6-400e-9d02-0eb9d8593cef" width="10%">
</div>
<br/>

*Obsidian2GHPage* is a npm library desinged to convert an Obsidian Vault into a static blog, ready to be hosted on GitHub Pages.

This package internally uses combination of Next.js and MDX to render the markdown files into web. Check out [How to use markdown and MDX in Next.js](https://nextjs.org/docs/pages/guides/mdx) for more information.

<br/>

## Features
Obsidian2GHPage supports following features.

<br/>

### Vault Based Routing
The directory structure of the target Obsidian Vault is directly translated into the URL paths for the blog. 

For example, a file tree such as:
```text
.
├── 00. Inbox
│   ├── Inbox.md
│   └── Inbox2.md
├── 01. Computer Science
│   ├── Programming Language
│   │   └── Garbage Collection.md
│   └── Test.md
```

will be converted into overview ui:

<img width="210" height="100" alt="스크린샷 2025-07-23 오후 3 44 41" src="https://github.com/user-attachments/assets/02afb26c-fd9e-413a-b94c-59250d43e87e" />


<br/>

### Obsidian Flavored Markdown(OFM) Support
At its core, MDX relies on **unified** ecosystem and **remark** to convert Markdown into HTML.
To properly support [OFM](https://help.obsidian.md/obsidian-flavored-markdown), *Obsidian2GHPage* injects custom remark plugin.

For example, an Obsidian image embed syntax such as:
```md
![[images/sample.png]]
```

is automatically converted into a standard HTML <img> tag:

```HTML
<img src="images/sample.png"/>
```

Check out [remark-ofm](https://github.com/Goonco/remark-ofm) for more information.

<br/>

### .mdxignore 

Obsidian2ghpage uses an `.mdxignore` file to give full control over which content gets published. Functioning just like a standard `.gitignore` file, it allows listing specific files and folders to exclude from the build process.

Prevents personal memos, drafts, or files containing sensitive information from being accidentally exposed to the public.

<br/>

### Frontmatter Generation

To simplify post management, Obsidian2ghpage automatically generates and injects frontmatter into your Markdown files. This metadata is essential for defining post details that are used for previews.

<img width="302" height="83" alt="스크린샷 2025-07-23 오후 3 45 11" src="https://github.com/user-attachments/assets/dd22db8f-b81e-4f24-ad0b-60186e43dd25" />

By default, the following fields are added automatically:
- date: The last modified date of the file, ensuring your post's timestamp is always current.
- description: A default description to serve as a post summary.

<br/>

## Overview

<div align="center">
<img width="633" height="528" alt="스크린샷 2025-07-23 오후 3 47 10" src="https://github.com/user-attachments/assets/21360b5f-e991-4ce4-af2a-2a2c584545fb" />
</div>



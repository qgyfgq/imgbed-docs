# Blog

The blog feature adds a standalone blog page to your ImgHost site.

After it is enabled, visitors can open:

```text
https://your-domain.com/blog/
```

![Blog homepage](../../image/other/博客/博客首页.png)

The blog is adapted from the open-source [LyraVoid/Mizuki](https://github.com/LyraVoid/Mizuki) project. ImgHost rewrites and integrates it with Vue so it can run as part of the image hosting site.

## Where To Configure It

Blog settings are under:

```text
System Settings -> Other Settings -> Blog
```

![Blog settings](../../image/other/博客/QQ20260611-221702.png)

## First-Time Setup

1. Turn on `Enable`.
2. Select the GitHub account used to store blog configuration.
3. Click `Update Blog`.
4. Wait for the success message.
5. Open `https://your-domain.com/blog/` to view the blog.

On first use, ImgHost prepares a private GitHub repository under the selected account:

```text
imgbed-blog-config
```

This repository stores blog settings and article content.

## Writing Posts

Edit blog posts in your private GitHub repository:

```text
imgbed-blog-config
```

Typical workflow:

1. Open GitHub.
2. Enter the private `imgbed-blog-config` repository.
3. Edit or add post files.
4. Commit the changes.
5. Return to the ImgHost admin panel and click `Update Blog`, or click the logo in the upper-left corner of the blog homepage three times to trigger a blog update.

`Update Blog` does not overwrite content you have written. It initializes the repository when needed and refreshes blog cache.

## Supported Features

The blog supports common blog features such as post lists, categories, tags, archives, search, dark mode, and language switching.

It also supports comments and visit statistics.

![Blog comments](../../image/other/博客/支持留言.png)

Comments appear below posts. Visitors can submit an avatar, nickname, email, and comment content.

Visit statistics show post views and site visits, helping you understand blog traffic.

## URL

The blog is always served under `/blog/`.

For example, if your ImgHost domain is:

```text
https://image.example.com
```

The blog URL is:

```text
https://image.example.com/blog/
```

After the blog is disabled, visitors can no longer access the blog page.

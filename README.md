## 简介

  - ### 命令行创建项目

  - ### 用 koajs(2.x) 建立http服务

  - ### 用 koa中间件 来支持 sass、webpack热替换、nunjucks模版引擎

  - ### 用 gulp 来构建

## 环境准备
  > nodejs >= 7.0.0

## 快速上手

```bash
$ npm install yep-cli -g
$ yep init pc demo
$ cd demo
$ yep start
# 127.0.0.1:8888
```

## 安装
  - ### npm

  ```bash
  $ npm install yep-cli -g
  ```
  - ### yarn

  ```bash
  $ yarn global add yep-cli
  ```
  - ### npm link

  ```bash
  $ git clone git@github.com:cjg125/yep-cli.git yep
  $ cd yep
  $ npm link
  ```

## API
  - ### yep init

    > 创建一个项目

    ```bash
    $ yep init [template-name] [project-name] [options]
    ```
    ```bash
    # 查看帮助
    $ yep init -h

    # 交互式创建一个项目
    $ yep init

    # git clone 创建项目
    $ yep init -c

    # 命令行创建项目
    $ yep init pc demo -c
    ```

  - ### yep alias

    > 给"模版" 设置一个别名

    ```bash
    $ yep alias [options] [template-name] [repository]
    ```
    ```bash
    # github 项目模版别名
    $ yep alias pc github:cjg125/fe-pc-tmpl  # or cjg125/fe-pc-tmpl

    # gitlab 项目模版别名
    $ yep alias pc gitlab:owner/name

    # 自定义 项目模版别名
    $ yep alias pc gitlab:custom.com:owner/name

    # 显示alias列表
    $ yep alias -l

    # 删除一个别名
    $ yep alias -d pc
    ```

  - ### yep start

    > 启动本地http服务

    ```bash
    $ yep start [port]
    ```
    ```bash
    # 默认端口 8888
    $ yep start 1337
    ```

  - ### yep build

    > 构建项目

    ```bash
    $ yep build
    ```

## ChangeLog

  - 0.2.0 ( 2016-12-19 )
    - proxy支持
    - 直接默认浏览器打开项目地址

# 使用npm发布一个包

首先注册一个[npm](https://www.npmjs.com)账号

新建项目，并执行`npm init`命令，生成package.json文件

**添加npm用户**
```sh
npm adduser

// 响应
Username: (username) 账号名称
Password: (<default hidden>)  输入密码
Email: (this IS public)  注册邮箱
Logged in as username on https://registry.npm.taobao.org/.
```

查看配置
```sh
$ cat ~/.npmrc
cache=C:\Program Files\nodejs\node_cache
prefix=C:\Program Files\nodejs\node_global
registry=http://registry.npmjs.org/
//registry.npmjs.org/:_authToken=783f9151-86f4-4a31-aec0-0f4ac062ee36

```

**登录**

`npm login`，根据提示登录，在执行登录时，确定你的~/.npmrc中没有添加任何的私有npm registry配置，否则将会登录失败。

`npm config set registry http://registry.npmjs.org/`

或者在登录时带有官方的registry参数也是可以的,`npm login --registry=https://registry.npmjs.org/`

查看登录状态`npm whoami`

**发布**
执行`npm search packageName`查看包名是否存在

`npm publish .`或者`npm publish@1.0.0`发布且添加版本号

执行`npm publish .`时需要更改版本号

**删除已发布的包**
`npm unpublish [<@scope>/]<pkg>[@<version>] `

从仓储中删除包,该操作会破坏依赖，不推荐适用，如果是为了鼓励用户适用新版本，可以使用deprecate命令

`npm deprecate <pkg>[@<version>] <message>`

标记包弃用，用户在安装时npm会有警告

常用命令：
1. `npm view moudleName dependencies`：查看包的依赖关系

2. `npm view moduleName repository.url`：查看包的源文件地址

3. `npm view moduleName engines`：查看包所依赖的Node的版本



# 常用命令

## 打印文件夹的目录层次结构

1. 进入要操作的文件夹（可以使整个驱动器根目录）
``` bash
  cd d:\project\
```

2. 命令行中输入 tree 回车，默认只展示文件夹，参数/f 将以层次的结构显示所有文件夹及文件的名称
``` bash
D:\project> tree
卷 File 的文件夹 PATH 列表
卷序列号为 BCD3-B9DA
D:.
  ├─store
  └─test

D:\project> tree /f
卷 File 的文件夹 PATH 列表
卷序列号为 BCD3-B9DA
D:.
├─store
│      actions.js
│      getters.js
│      index.js
│      mutations.js
│      mutation_types.js
│      state.js
│
└─test
        demo.html
```

3. 保存文件夹结构目录 tree /f >filename.txt

## 激活处于通知状态的WIN10系统专业版

1.管理员身份打开命令提示符，输入`slmgr.vbs -xpr`，查看系统的状态是什么时候到期或者是处于通知状态

2.卸载系统秘钥：`slmgr.vbs /upk`

3.安装系统秘钥：`slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX`

4.设置密钥管理服务计算机名为zh.us.to：`slmgr /skms zh.us.to`

5.激活系统：`slmgr /ato`

6.输入`slmgr.vbs -xpr`再次查看系统状态

## 新建文件夹和文件
```
cd ..           返回上一级
md test         新建test文件夹
md d:\test\my   d盘下新建文件夹
cd test         进入test文件夹
cd.>cc.txt      新建cc.txt文件
dir             列出文件夹下所有文件及文件夹
```

## 删除文件夹和文件
```
cd test         进入test文件夹
dir             查看所有文件目录
del a.txt       删除a.txt的文件
del *.txt       删除所有后缀为.txt的文件
rd test         删除名为test的空文件夹
rd /s D:\test   删除D盘里的test文件夹  会出现如下 test, 是否确认(Y/N)?  直接输入 Y 在回车
rd test/s       删除此文件夹下的所有文件  test, 是否确认(Y/N)?  直接输入 Y 在回车
```
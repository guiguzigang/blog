# Dos 常用命令


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
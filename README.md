## 使用方法

```
jnpm i @o2team/ambient-particle_link --save
```

```javascript
import ATAmbient from '@o2team/ambient-particle_link'

ATAmbient({
  particleNumber: 25,
  color: '#ffffff',
  maxSize: 3
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| particleNumber | `number` | 3-100 | 粒子数量 |
| color | `string` | 带 `#` 色值 | 粒子颜色 |
| maxSize | `number` | - | 粒子最大半径 |

## 预览地址

https://o2team-ambient.github.io/particle_link/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 组件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.ejs
    ├── index.js            - 主入口文件
    ├── rollup_index.js     - npm 包主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js    - 字段常数
            ├── raf.js
            └── util.js
```

> 开发完毕之后，请新建 gh-pages 分支并 push --set-upstream，以获得线上 demo 页。每次更新后，测试完成即可合并至 gh-pages 发布。
/* eslint-env node */

/**
 * build：发布版本改动内容
 * docs：文档相关改动
 * ci： 持续集成改动，修改配置文件
 * feat：新需求，添加功能
 * chore: 添加插件、依赖等
 * update：更新代码、完善功能
 * fix：修复bug，如有bug编码可带上[xx-1234]
 * perf: 优化性能、体验等
 * refactor：重构
 * revert：代码回滚操作
 * style：代码格式修改，不是css样式！使用prettier后基本可以不用此类
 * test：测试用例改动
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'update',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'header-case': [2, 'always', 'lowerCase'],
    'type-empty': [0, 'always'],
    'body-max-length': [0, 'never']
  }
}

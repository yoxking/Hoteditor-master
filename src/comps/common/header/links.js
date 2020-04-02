/**
 * #!zh: 导航条上的通用外链：文档、交流群、GitHub
 * #!en: common external links on headers: Document、Discussion、GitHub
 */

export default {
  render () {
    return (
      <a-menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', display: 'inline-block', float: 'right' }}
      >
        <a-menu-item key="document">
          <a href="#" target="_blank" rel="noopener" style={{ color: 'white' }}><a-icon type="read" />{this.$t('header.chineseDocument')}</a>
        </a-menu-item>
      </a-menu>
    )
  }
}

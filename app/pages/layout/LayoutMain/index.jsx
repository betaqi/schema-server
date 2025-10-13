import { useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'

const { Header, Sider, Content, Footer } = Layout

/**
 * LayoutMain 多布局容器（Ant Design）
 * 支持三种布局：
 * - header-content-footer: 上-中-下
 * - header-sider-content: 顶部-侧边-通栏（上方通栏 + 左侧菜单 + 右侧内容）
 * - two-siders: 侧边两列式（左侧菜单 + 中间内容 + 右侧侧栏）
 *
 * 可通过 props.mode 动态切换，其他可配置项见下方 Props 注释。
 */

/**
 * @typedef {Object} LayoutMainProps
 * @property {('header-content-footer'|'header-sider-content'|'two-siders')} [mode]
 * @property {import('react').ReactNode} [header]
 * @property {import('react').ReactNode} [footer]
 * @property {import('react').ReactNode} [logo]
 * @property {import('antd').MenuProps['items']} [menuItems]
 * @property {import('react').ReactNode} [rightActions]
 * @property {boolean} [defaultCollapsed]
 * @property {boolean} [collapsible]
 * @property {(collapsed: boolean)=>void} [onCollapsedChange]
 * @property {boolean} [fixedHeader]
 * @property {boolean} [fixedSider]
 * @property {number} [siderWidth]
 * @property {number} [rightSiderWidth]
 * @property {import('react').CSSProperties} [contentStyle]
 * @property {import('react').CSSProperties} [style]
 * @property {import('react').ReactNode} [children]
 * @property {import('react').ReactNode} [rightSider]
 */

/**
 * @param {LayoutMainProps} props
 */
export default function LayoutMain(props) {
  const {
    mode = 'header-content-footer',
    header,
    footer,
    logo,
    menuItems,
    rightActions,
    defaultCollapsed = false,
    collapsible = true,
    onCollapsedChange,
    fixedHeader = true,
    fixedSider = false,
    siderWidth = 220,
    rightSiderWidth = 280,
    contentStyle,
    style,
    children,
    rightSider
  } = props

  const [collapsed, setCollapsed] = useState(Boolean(defaultCollapsed))

  const handleCollapse = (next) => {
    setCollapsed(next)
    if (onCollapsedChange) onCollapsedChange(next)
  }

  const headerNode = useMemo(() => {
    if (header) return header
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {logo ?? (
            <div style={{ width: 20, height: 20, background: '#1677ff', borderRadius: 4 }} />
          )}
          <span style={{ color: '#fff', fontWeight: 600 }}>App</span>
        </div>
        <div style={{ flex: 1 }} />
        {rightActions}
      </div>
    )
  }, [header, logo, rightActions])

  const defaultMenu = useMemo(() => {
    if (menuItems && menuItems.length) return menuItems
    return [
      { key: '1', label: '概览' },
      { key: '2', label: '列表' },
      { key: '3', label: '设置' }
    ]
  }, [menuItems])

  const sharedHeaderStyle = useMemo(() => ({
    position: fixedHeader ? 'sticky' : 'relative',
    top: 0,
    zIndex: 100,
    width: '100%',
    paddingInline: 16,
    display: 'flex',
    alignItems: 'center'
  }), [fixedHeader])

  const sharedContentStyle = useMemo(() => ({
    padding: 16,
    minHeight: 'calc(100vh - 64px)',
    background: '#fff',
    ...contentStyle
  }), [contentStyle])

  const renderHeader = () => (
    <Header style={sharedHeaderStyle}>{headerNode}</Header>
  )

  const renderFooter = () => (
    <Footer style={{ textAlign: 'center' }}>
      {footer ?? '© ' + new Date().getFullYear()}
    </Footer>
  )

  if (mode === 'header-content-footer') {
    return (
      <Layout style={style}>
        {renderHeader()}
        <Content style={sharedContentStyle}>{children}</Content>
        {renderFooter()}
      </Layout>
    )
  }

  if (mode === 'header-sider-content') {
    return (
      <Layout style={style}>
        {renderHeader()}
        <Layout hasSider>
          <Sider
            width={siderWidth}
            collapsible={collapsible}
            collapsed={collapsed}
            onCollapse={handleCollapse}
            style={{
              position: fixedSider ? 'sticky' : 'relative',
              top: fixedHeader ? 64 : 0,
              height: fixedSider ? 'calc(100vh - ' + (fixedHeader ? 64 : 0) + 'px)' : '100%',
              overflow: 'auto'
            }}
          >
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={[String(defaultMenu?.[0]?.key ?? '1')]}
              items={defaultMenu}
              style={{ height: '100%', borderRight: 0 }}
            />
          </Sider>
          <Content style={sharedContentStyle}>{children}</Content>
        </Layout>
        {renderFooter()}
      </Layout>
    )
  }

  // two-siders: 左侧菜单 + 中间内容 + 右侧侧栏
  return (
    <Layout style={style}>
      {renderHeader()}
      <Layout>
        <Sider
          width={siderWidth}
          collapsible={collapsible}
          collapsed={collapsed}
          onCollapse={handleCollapse}
          theme="dark"
          style={{
            position: fixedSider ? 'sticky' : 'relative',
            top: fixedHeader ? 64 : 0,
            height: fixedSider ? 'calc(100vh - ' + (fixedHeader ? 64 : 0) + 'px)' : '100%',
            overflow: 'auto'
          }}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[String(defaultMenu?.[0]?.key ?? '1')]}
            items={defaultMenu}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>

        <Content style={sharedContentStyle}>{children}</Content>

        <Sider
          width={rightSiderWidth}
          theme="light"
          collapsible={false}
          style={{
            background: '#fafafa',
            borderLeft: '1px solid #f0f0f0',
            position: fixedSider ? 'sticky' : 'relative',
            top: fixedHeader ? 64 : 0,
            height: fixedSider ? 'calc(100vh - ' + (fixedHeader ? 64 : 0) + 'px)' : '100%',
            overflow: 'auto',
            padding: 16
          }}
        >
          {rightSider ?? <div style={{ color: 'rgba(0,0,0,.45)' }}>右侧栏</div>}
        </Sider>
      </Layout>
      {renderFooter()}
    </Layout>
  )
}



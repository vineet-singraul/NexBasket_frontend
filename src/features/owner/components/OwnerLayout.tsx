import React from 'react'
import OwnerSidebar from './OwnerSidebar'
import OwnerHeader from './OwnerHeader'

interface OwnerLayoutProps {
  children: React.ReactNode
}

/**
 * OwnerLayout
 * Wraps the sidebar + header shell around any Owner page content,
 * e.g. <OwnerLayout><OwnerDashboard /></OwnerLayout>
 */
const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <OwnerSidebar onLogout={() => console.log('logout')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <OwnerHeader />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  )
}

export default OwnerLayout
import React, { useState } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <OwnerSidebar
        onLogout={() => console.log('logout')}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <OwnerHeader onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  )
}

export default OwnerLayout

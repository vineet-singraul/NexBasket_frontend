import type { ReactNode } from 'react'

export interface SidebarMenuItem {
  id: string
  label: string
  icon: ReactNode
  path: string
  badge?: number
}

export interface SidebarSection {
  id: string
  title?: string
  items: SidebarMenuItem[]
}
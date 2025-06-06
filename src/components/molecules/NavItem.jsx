import React from 'react'
      import { useLocation } from 'react-router-dom'
      import Icon from '@/components/atoms/Icon'

      const NavItem = ({ name, href, icon }) => {
        const location = useLocation()
        const isActive = location.pathname === href

        return (
          <a
            href={href}
            className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <Icon name={icon} size={18} className="mr-3" />
            {name}
          </a>
        )
      }

      export default NavItem
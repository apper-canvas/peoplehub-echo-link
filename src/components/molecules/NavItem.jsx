import React from 'react'
      import { useLocation } from 'react-router-dom'
      import Icon from '@/components/atoms/Icon'

const NavItem = ({ item, onClick }) => {
        const location = useLocation()
        const isActive = location.pathname === item.href
      
        const handleClick = (e) => {
          if (onClick) {
            onClick()
          }
        }

        return (
          <a
            href={item.href}
            onClick={handleClick}
            className={`flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <Icon name={item.icon} size={18} className="mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </a>
        )
      }

      export default NavItem
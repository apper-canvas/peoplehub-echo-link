import React from 'react'
      import SearchInput from '@/components/molecules/SearchInput'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import ProfileInfo from '@/components/molecules/ProfileInfo'

      const Header = ({ onMenuClick, onDarkModeToggle, darkMode }) => {
        return (
          <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center space-x-4">
                <Button onClick={onMenuClick} variant="ghost" className="lg:hidden">
                  <Icon name="Menu" size={20} className="text-surface-600 dark:text-surface-400" />
                </Button>

                <SearchInput placeholder="Search employees... (Cmd+K)" className="w-80" />
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={onDarkModeToggle} variant="dark-mode">
                  <Icon
                    name={darkMode ? 'Sun' : 'Moon'}
                    size={20}
                    className="text-surface-600 dark:text-surface-400"
                  />
                </Button>

                <Button variant="notification">
                  <Icon name="Bell" size={20} className="text-surface-600 dark:text-surface-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                </Button>

                <ProfileInfo src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" name="John Smith" />
              </div>
            </div>
          </header>
        )
      }

      export default Header
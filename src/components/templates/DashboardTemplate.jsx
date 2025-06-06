import React from 'react'
      import { AnimatePresence } from 'framer-motion'
      import Sidebar from '@/components/organisms/Sidebar'
      import Header from '@/components/organisms/Header'
      import Icon from '@/components/atoms/Icon'

      const DashboardTemplate = ({
        children,
        darkMode,
        setDarkMode,
        sidebarOpen,
        setSidebarOpen,
        navigation,
        location
      }) => {
        return (
          <div className={`min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300`}>
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              navigation={navigation}
            />

            <div className="lg:pl-64">
              <Header
                onMenuClick={() => setSidebarOpen(true)}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                darkMode={darkMode}
              />

              <main className="p-6">
                <AnimatePresence mode="wait">
                  {children}
                </AnimatePresence>
              </main>
            </div>

{sidebarOpen && (
              <div
                className="fixed inset-0 z-60 bg-black bg-opacity-50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        )
      }

      export default DashboardTemplate
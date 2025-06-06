import { Routes, Route, useLocation } from 'react-router-dom'
    import { useState, useEffect } from 'react'
    import { ToastContainer } from 'react-toastify'
    import HomePage from '@/components/pages/HomePage'
    import NotFound from './pages/NotFound'
    import DashboardTemplate from '@/components/templates/DashboardTemplate'
    import 'react-toastify/dist/ReactToastify.css'
    
    function App() {
      const [darkMode, setDarkMode] = useState(false)
      const [sidebarOpen, setSidebarOpen] = useState(false)
      const location = useLocation()
    
      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }, [darkMode])
    
      const navigation = [
        { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
        { name: 'Employees', href: '#', icon: 'Users' },
        { name: 'Leave Requests', href: '#', icon: 'Calendar' },
        { name: 'Performance', href: '#', icon: 'TrendingUp' },
        { name: 'Reports', href: '#', icon: 'BarChart3' }
      ]
    
return (
        <>
          <DashboardTemplate
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            navigation={navigation}
            location={location}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardTemplate>

          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={darkMode ? "dark" : "light"}
          />
        </>
      )
    }

export default App
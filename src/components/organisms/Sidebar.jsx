import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Heading from '@/components/atoms/Heading'
      import NavItem from '@/components/molecules/NavItem'
      import Button from '@/components/atoms/Button'

      const Sidebar = ({ isOpen, onClose, navigation }) => {
        return (
          <motion.div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-800 shadow-lg transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
            initial={false}
            animate={{ x: isOpen ? 0 : -256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <Heading level={1} className="text-xl font-bold">PeopleHub</Heading>
              </div>
              <Button onClick={onClose} variant="ghost" className="lg:hidden">
                <Icon name="X" size={20} className="text-surface-600 dark:text-surface-400" />
              </Button>
            </div>

            <nav className="mt-6 px-3">
              {navigation.map((item) => (
                <NavItem key={item.name} {...item} />
              ))}
            </nav>
          </motion.div>
        )
      }

      export default Sidebar
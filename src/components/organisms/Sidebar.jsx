import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import NavItem from '@/components/molecules/NavItem'
import Heading from '@/components/atoms/Heading'

const Sidebar = ({ isOpen, onClose, navigation }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-surface-800 px-6 pb-4 border-r border-surface-200 dark:border-surface-700">
          <div className="flex h-16 shrink-0 items-center">
            <Heading level={2} className="text-primary font-bold">PeopleHub</Heading>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavItem item={item} />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative z-70 lg:hidden"
          >
            <div className="fixed inset-y-0 left-0 z-70 w-64 bg-white dark:bg-surface-800 px-6 pb-4 border-r border-surface-200 dark:border-surface-700">
              <div className="flex h-16 shrink-0 items-center justify-between">
                <Heading level={2} className="text-primary font-bold">PeopleHub</Heading>
                <button
                  type="button"
                  className="p-2 rounded-md text-surface-400 hover:text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700"
                  onClick={onClose}
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col mt-5">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavItem item={item} onClick={onClose} />
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
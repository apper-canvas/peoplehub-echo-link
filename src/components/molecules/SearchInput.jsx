import React from 'react'
      import Icon from '@/components/atoms/Icon'
      import Input from '@/components/atoms/Input'

      const SearchInput = ({ placeholder, value, onChange, className = '' }) => {
        return (
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            icon={({ className }) => <Icon name="Search" className={className} />}
            className={className}
          />
        )
      }

      export default SearchInput
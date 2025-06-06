import React from 'react'
      import Label from '@/components/atoms/Label'
      import Input from '@/components/atoms/Input'
      import Select from '@/components/molecules/Select'

      const FormField = ({ label, type, name, value, onChange, required = false, options = [], className = '' }) => {
        return (
          <div className={className}>
            <Label htmlFor={name}>{label} {required && '*'}</Label>
            {type === 'select' ? (
              <Select id={name} name={name} value={value} onChange={onChange}>
                {options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            ) : (
              <Input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
              />
            )}
          </div>
        )
      }

      export default FormField
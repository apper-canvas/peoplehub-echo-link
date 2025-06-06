import React, { useState, useEffect } from 'react'
      import FormField from '@/components/molecules/FormField'
      import Button from '@/components/atoms/Button'

      const EmployeeForm = ({ employee, onSave, onClose }) => {
        const [formData, setFormData] = useState({
          name: employee?.name || '',
          email: employee?.email || '',
          phone: employee?.phone || '',
          department: employee?.department || '',
          position: employee?.position || '',
          startDate: employee?.startDate || '',
          status: employee?.status || 'active',
          manager: employee?.manager || ''
        })

        useEffect(() => {
          setFormData({
            name: employee?.name || '',
            email: employee?.email || '',
            phone: employee?.phone || '',
            department: employee?.department || '',
            position: employee?.position || '',
            startDate: employee?.startDate || '',
            status: employee?.status || 'active',
            manager: employee?.manager || ''
          })
        }, [employee])

        const handleSubmit = (e) => {
          e.preventDefault()
          onSave(formData)
        }

        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Name" type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <FormField label="Email" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Phone" type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <FormField label="Department" type="text" name="department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>

            <FormField label="Position" type="text" name="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              <FormField
                label="Status"
                type="select"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'on leave', label: 'On Leave' }
                ]}
              />
            </div>

            <FormField label="Manager" type="text" name="manager" value={formData.manager} onChange={(e) => setFormData({ ...formData, manager: e.target.value })} />

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" onClick={onClose} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {employee ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        )
      }

      export default EmployeeForm
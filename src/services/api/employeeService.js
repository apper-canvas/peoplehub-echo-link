import employeeData from '../mockData/employee.json'

class EmployeeService {
  constructor() {
    this.employees = [...employeeData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.employees]
  }

  async getById(id) {
    await this.delay()
    const employee = this.employees.find(emp => emp.id === id)
    return employee ? { ...employee } : null
  }

  async create(employeeData) {
    await this.delay()
    const newEmployee = {
      ...employeeData,
      id: Date.now().toString()
    }
    this.employees.push(newEmployee)
    return { ...newEmployee }
  }

  async update(id, employeeData) {
    await this.delay()
    const index = this.employees.findIndex(emp => emp.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    
    this.employees[index] = { ...this.employees[index], ...employeeData }
    return { ...this.employees[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.employees.findIndex(emp => emp.id === id)
    if (index === -1) {
      throw new Error('Employee not found')
    }
    
    this.employees.splice(index, 1)
    return true
  }
}

export default new EmployeeService()
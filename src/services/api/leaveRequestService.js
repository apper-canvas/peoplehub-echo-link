import leaveRequestData from '../mockData/leaveRequest.json'

class LeaveRequestService {
  constructor() {
    this.leaveRequests = [...leaveRequestData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.leaveRequests]
  }

  async getById(id) {
    await this.delay()
    const request = this.leaveRequests.find(req => req.id === id)
    return request ? { ...request } : null
  }

  async create(requestData) {
    await this.delay()
    const newRequest = {
      ...requestData,
      id: Date.now().toString()
    }
    this.leaveRequests.push(newRequest)
    return { ...newRequest }
  }

  async update(id, requestData) {
    await this.delay()
    const index = this.leaveRequests.findIndex(req => req.id === id)
    if (index === -1) {
      throw new Error('Leave request not found')
    }
    
    this.leaveRequests[index] = { ...this.leaveRequests[index], ...requestData }
    return { ...this.leaveRequests[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.leaveRequests.findIndex(req => req.id === id)
    if (index === -1) {
      throw new Error('Leave request not found')
    }
    
    this.leaveRequests.splice(index, 1)
    return true
  }
}

export default new LeaveRequestService()
import reviewData from '../mockData/review.json'

class ReviewService {
  constructor() {
    this.reviews = [...reviewData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.reviews]
  }

  async getById(id) {
    await this.delay()
    const review = this.reviews.find(rev => rev.id === id)
    return review ? { ...review } : null
  }

  async create(reviewData) {
    await this.delay()
    const newReview = {
      ...reviewData,
      id: Date.now().toString()
    }
    this.reviews.push(newReview)
    return { ...newReview }
  }

  async update(id, reviewData) {
    await this.delay()
    const index = this.reviews.findIndex(rev => rev.id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    
    this.reviews[index] = { ...this.reviews[index], ...reviewData }
    return { ...this.reviews[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.reviews.findIndex(rev => rev.id === id)
    if (index === -1) {
      throw new Error('Review not found')
    }
    
    this.reviews.splice(index, 1)
    return true
  }
}

export default new ReviewService()
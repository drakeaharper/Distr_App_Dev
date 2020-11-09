import mongoose from 'mongoose'

export function connectToDB() {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true},
        error => {
            if (error) {
                console.log('unable to connect to databas')
                throw error
            } else {
                console.log('Connected to MongoDB!')
            }
        })
}
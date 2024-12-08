const { prediction, predictionHistories } = require('./handler')

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: prediction,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: predictionHistories
    }
]

module.exports = routes
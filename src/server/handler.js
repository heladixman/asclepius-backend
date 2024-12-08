const predictClassification = require
const crypto = require('crypto')
const storeData = require('../services/storeData')
const db = require('../config/firebase')

async function prediction(request, h) {
    const { image } = request.payload
    const { model } = request.server.app

    const { result, suggestion } = await predictClassification(model, image)

    const id = crypto.randomUUID()
    const createdAt = new Date()

    const data = {
        "id": id,
        "result": result,
        "suggestion": suggestion,
        "createdAt": createdAt
    }

    await storeData(id, data)

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data: data
    })
    response.code(201)
    return response

}

async function predictionHistories(request, h) {
    const predictionCollection = db.collection('predictions')
    const snapshot = await predictionCollection.get()

    const data = []

    snapshot.forEach((doc) => {
        const history = {
            id: doc.id,
            history: doc.data()
        };
        data.push(history);
    });

    const response = h.response({
        status: 'success',
        data: data
    });
    response.code(200);
    return response
}

module.exports = { prediction, predictionHistories }
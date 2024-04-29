import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    // demonstration purposes only
    const client = await MongoClient.connect(
      'mongodb+srv://ivi8385:Deniskoplay10000@cluster0.gw8ecwu.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    )
    const db = client.db()

    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)

    client.close()

    res.status(201).json({message: 'Meetup inserted!'})
  }
}
export default handler

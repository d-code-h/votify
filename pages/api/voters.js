import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = process.env.DBNAME;

export default function voters(req, res) {
  if (req.method === 'POST') {
    const { votes } = req.body;
    (async () => {
      try {
        await client.connect();
        const db = client.db(dbName);

        for (let x of votes) {
          const incr = await db
            .collection('candidates')
            .updateOne({ matric: x }, { $inc: { vote: 1 } });
        }
        return res.status(200).json({ message: 'Success' });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: 'Server trying to rest, Please try again soon.',
        });
      }
    })();
  }
}

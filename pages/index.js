import Head from 'next/head'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react'

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  // fetch data from an API
    // demonstration purposes only
  const client = await MongoClient.connect(
    'mongodb+srv://<demonstrationEmail>:<demonstrationPassword>@cluster0.gw8ecwu.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
  )
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  }
}
export default HomePage

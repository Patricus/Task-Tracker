import Head from "next/head";
import LogIn from "../Component/Login";
import Tasks from "../Component/Tasks";
import useUser from "../Component/Context/User";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Task Tracker</title>
        <meta name="description" content="Task Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen">{user.id ? <Tasks /> : <LogIn />}</main>
    </>
  );
}

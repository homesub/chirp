import { type NextPage } from "next";
import Head from "next/head";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chirp</title>
        <meta
          name="description"
          content="Twitter clone built with create t3 app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>Profile Page</div>
      </main>
    </>
  );
};

export default ProfilePage;

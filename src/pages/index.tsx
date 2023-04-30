import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

  const user = useUser();

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {!user.isSignedIn && (
            <SignInButton>
              <button className="rounded-full bg-[#1DA1F2] px-4 py-2 text-white">
                Sign In
              </button>
            </SignInButton>
          )}
          {!!user.isSignedIn && (
            <SignOutButton>
              <button className="rounded-full bg-[#1DA1F2] px-4 py-2 text-white">
                Sign Out
              </button>
            </SignOutButton>
          )}
        </div>
        <div>
          {data?.map((post) => (
            <div key={post.id} className="my-4 rounded-lg bg-white p-4">
              {post.content}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

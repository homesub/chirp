import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div key={post.id} className="flex gap-6 border-b border-slate-400 p-4">
      <Image
        src={author.profileImageUrl}
        alt={`${author.username}'s profile image`}
        className="h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <span>{`@${author.username} `}</span>
          <span className="font-thin">{` · ${dayjs(
            post.createdAt
          ).fromNow()}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

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
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton>
                  <button className="rounded-full bg-[#1DA1F2] px-4 py-2 text-white">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}
            {user.isSignedIn && (
              <CreatePostWizard />
              // <SignOutButton>
              //   <button className="rounded-full bg-[#1DA1F2] px-4 py-2 text-white">
              //     Sign Out
              //   </button>
              // </SignOutButton>
            )}
          </div>
          <div className="flex flex-col">
            {data?.map((fullPost) => (
              <PostView key={fullPost.post.id} {...fullPost} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

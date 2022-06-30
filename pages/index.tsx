import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { Hero } from "../components/hero/Hero";
import { Section } from "../components/layout/Section";
import { getUserProfile } from "../utils/graphcms";
import { IUser } from "../types/user";
import { LEANERID } from "../utils/constants";

type Props = {
  user: IUser;
};

const Home: NextPage<Props> = ({ user }) => {
  return (
    <Layout>
      <Hero user={user} />
      <Section title="Your Achivements">
        <div className="hidden stats shadow sm:flex">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    width={72}
                    height={72}
                    src="/IMG_1968.jpg"
                    alt="Dang Hoang"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </Section>
      <Section>
      <div className="hero  bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
      </Section>
      <Section>
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow h-64 card bg-base-300 rounded-box place-items-center">
            content
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="grid flex-grow h-64 card bg-base-300 rounded-box place-items-center">
            content
          </div>
        </div>
      </Section>
      <Section title="Learning" description="Let learn then practice">
        <div className="md:flex grid grid-cols-1 gap-4 justify-center">
          <div className="stack">
            <div className="p-1 flex-1 mx-6 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <Link href="/grammar">
                <a className="block p-6 bg-white sm:p-8 rounded-xl">
                  <div className="mt-8 sm:pr-8">
                    <h5 className="text-xl font-bold text-gray-900">
                      JLPT GRAMMAR QUIZ N2
                    </h5>
                    <p className="mt-2 text-sm text-gray-500">
                      JLPT GRAMMAR QUIZ N2
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <div className="p-1 flex-1 mx-6 shadow-xl card bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
                <div className="card-body">JLPT KANJI QUIZ N2</div>
            </div>
            <div className="p-1 flex-1 mx-6 shadow-xl card bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
                <div className="card-body">JLPT KANJI QUIZ N2</div>
            </div>
          </div>
          <div className="stack">
            <div className="p-1 flex-1 mx-6 shadow-xl card bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
              <Link href="/kanji">
              <a className="block p-6 bg-white sm:p-8 rounded-xl">
                  <div className="mt-8 sm:pr-8">
                    <h5 className="text-xl font-bold text-gray-900">
                      JLPT KANJI QUIZ N2
                    </h5>
                    <p className="mt-2 text-sm text-gray-500">
                      Let remember kanji with us daily
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <div className="p-1 flex-1 mx-6 shadow-xl card bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
                <div className="card-body">JLPT KANJI QUIZ N2</div>
            </div>
            <div className="p-1 flex-1 mx-6 shadow-xl card bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
                <div className="card-body">JLPT KANJI QUIZ N2</div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await getUserProfile(LEANERID, false);
  return { props: { user: data.learner } };
}

export default Home;

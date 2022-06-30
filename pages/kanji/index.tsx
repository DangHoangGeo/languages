import type { NextPage } from "next";
import Layout from "../../components/layout/Layout";
import { Section } from "../../components/layout/Section";
import { getUserProfile } from "../../utils/graphcms";
import { IUser } from "../../types/user";
import { LEANERID } from "../../utils/constants";


type Props = {
  user: IUser;
};
const Kanji: NextPage<Props> = ({ user }) => {
  return (
    <Layout>
      <Section title="Kanji">
        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
          <div id="item1" className="carousel-item">
          <div className="card w-72 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">1</a> 
        </div>
      </Section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await getUserProfile(LEANERID, false);
  return { props: { user: data.learner } };
}

export default Kanji;

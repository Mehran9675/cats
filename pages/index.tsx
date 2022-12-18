import { END_POINTS_SERVER } from "services/endPoints.enum";
import axios from "services/axios";
import Home from "pageComponents/home";
import makeQuery from "../common/functions/makeQuery";
import { QUERIES } from "../services/queries.enum";
import { GetServerSidePropsContext } from "next";
export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const { data } = await axios.get(
      END_POINTS_SERVER.CATS +
        makeQuery<QUERIES>({
          limit: "15",
          has_breeds: ctx.query[QUERIES.category_ids] ? "0" : "1",
          page: "1",
          [QUERIES.category_ids]: ctx.query[QUERIES.category_ids] as string,
        })
    );
    return {
      props: {
        data: data,
      },
    };
  } catch (e) {
    return {
      props: {
        data: [],
      },
    };
  }
}

import { GetServerSidePropsContext } from "next";
import axios from "services/axios";
import { END_POINTS_SERVER } from "services/endPoints.enum";
import { QUERIES } from "services/queries.enum";
import makeQuery from "common/functions/makeQuery";
import Breed from "pageComponents/breed";

export default Breed;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const { data } = await axios.get(
      END_POINTS_SERVER.CATS +
        makeQuery<QUERIES>({
          [QUERIES.breed_ids]: ctx.query.breed,
          [QUERIES.limit]: "11",
        } as Record<string, string>)
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

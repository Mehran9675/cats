import { NextApiRequest, NextApiResponse } from "next";
import axios from "services/axios";
import { END_POINTS_SERVER } from "services/endPoints.enum";
import makeQuery from "../../common/functions/makeQuery";

const cats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(
      END_POINTS_SERVER.CATS + makeQuery(req.query as Record<string, string>)
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
};
export default cats;

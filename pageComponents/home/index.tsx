import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import type { CatsT, CatT } from "common/types";
import makeQuery from "common/functions/makeQuery";
import Show from "common/components/utility/show";
import { QUERIES } from "services/queries.enum";
import { END_POINTS_CLIENT } from "services/endPoints.enum";
import Cat from "./components/cat";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const Home = (props: { data: CatsT }) => {
  const { query } = useRouter();
  const { ref, inView } = useInView();
  const [cats, setCats] = useState<CatsT>([]);
  const [page, setPage] = useState(2);
  const [dataFinished, setDataFinished] = useState(false);

  useEffect(() => {
    if (inView && !dataFinished) getCats(page.toString());
  }, [inView]);

  const getCats = useCallback(async (page: string) => {
    try {
      const { data } = await axios.get(
        END_POINTS_CLIENT.CATS +
          makeQuery({
            [QUERIES.limit]: "15",
            [QUERIES.has_breeds]: query[QUERIES.category_ids] ? "0" : "1",
            [QUERIES.page]: page,
            [QUERIES.category_ids]: query[QUERIES.category_ids] as string,
          })
      );
      if (!data?.length) return setDataFinished(true);
      setPage((currentPage) => currentPage + 1);
      setCats((prev) => [...prev, ...data]);
    } catch (e) {}
  }, []);

  const renderCats = useCallback(
    (cat: CatT, index: number) => <Cat key={index} data={cat} />,
    []
  );

  const catsData = useMemo(() => [...props.data, ...(cats || [])], [cats]);
  return (
    <>
      {catsData.map(renderCats)}
      <Show if={dataFinished}>
        <span className={styles.loading}>THAT'S ALL THE CATS</span>
      </Show>
      <Show if={!dataFinished}>
        <span className={styles.loading}>LOADING</span>
      </Show>
      <Show if={!dataFinished}>
        <span ref={ref} />
      </Show>
    </>
  );
};
export default Home;

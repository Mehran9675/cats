import { useRouter } from "next/router";
import Link from "next/link";
import Show from "common/components/utility/show";
import DropDown from "./components/dropDown";
import ROUTES from "../../../routes.enum";
import { QUERIES } from "services/queries.enum";
import styles from "./styles.module.scss";
import useFetch from "../../../hooks/useFetch";
import { END_POINTS_CLIENT } from "services/endPoints.enum";
import { Categories, Category } from "../../../types";
import { useCallback, useMemo } from "react";

const Header = () => {
  const [filters] = useFetch<END_POINTS_CLIENT, Categories>(
    END_POINTS_CLIENT.CATEGORIES
  );
  const { back, pathname, asPath, query, push, reload } = useRouter();

  const [activeFilter]: Categories = useMemo(
    () =>
      filters?.filter(
        (filter: Category) =>
          filter.id.toString() === query[QUERIES.category_ids]
      ) || ([] as Categories),
    [filters, query]
  );
  const handleClearFilter = useCallback(
    () => push(ROUTES.HOME).then(reload),
    []
  );
  return (
    <header className={styles.header}>
      <h1>Cats</h1>
      <div>
        <Show if={pathname.includes(ROUTES.BREED_DETAILS)}>
          <span onClick={back}>GO BACK</span>
        </Show>
        <Show if={asPath.includes(QUERIES.category_ids)}>
          <span onClick={handleClearFilter} className="visible-on-desktop">
            CLEAR FILTER
          </span>
        </Show>
        <Show if={!pathname.includes(ROUTES.BREED_DETAILS)}>
          <DropDown data={filters} currentFilter={activeFilter?.name} />
        </Show>
      </div>
      <Show if={asPath.includes(query[QUERIES.category_ids] as string)}>
        <label className="visible-on-desktop">
          ACTIVE FILTER:
          <span>{activeFilter?.name}</span>
        </label>
        <label onClick={handleClearFilter} className="visible-on-mobile">
          CLEAR FILTER
        </label>
      </Show>
    </header>
  );
};
export default Header;

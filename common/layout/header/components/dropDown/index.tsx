import { useCallback } from "react";
import { QUERIES } from "services/queries.enum";
import { Categories, Category } from "common/types";
import ROUTES from "common/routes.enum";
import makeQuery from "common/functions/makeQuery";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const DropDown = (props: {
  data: Categories | null;
  currentFilter: string;
}) => {
  const { push, reload } = useRouter();

  const handleClick = useCallback(
    (id: number) => () =>
      push(
        ROUTES.HOME + makeQuery({ [QUERIES.category_ids]: id.toString() })
      ).then(reload),
    []
  );

  const renderFilters = useCallback(
    (filter: Category) => (
      <span onClick={handleClick(filter.id)}>{filter.name}</span>
    ),
    []
  );

  return (
    <div className={styles.filter}>
      <span className={styles.title}>
        <span className="visible-on-desktop">FILTERS</span>

        <span className="visible-on-mobile">
          {props.currentFilter || "FILTERS"}
        </span>
        <pre>{"^"}</pre>
      </span>
      <div className={styles["drop-down"]}>
        {(props.data || []).map(renderFilters)}
      </div>
    </div>
  );
};
export default DropDown;

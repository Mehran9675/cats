import { useCallback } from "react";
import { CatsT, CatT } from "../../common/types";
import Image from "next/image";

import styles from "./styles.module.scss";

const Breed = (props: { data: CatsT }) => {
  const [data] = props.data;
  const [breed] = data.breeds;
  const renderImages = useCallback(
    (cat: CatT) => (
      <Image
        priority
        width="450"
        height="400"
        src={cat.url}
        alt={cat.id}
        className={styles["cat-image"]}
      />
    ),
    []
  );
  return (
    <>
      <div className={styles["breed-description"]}>
        <h2>{breed.name}</h2>
        <p>{breed.description}</p>
      </div>
      {props.data.map(renderImages)}
    </>
  );
};
export default Breed;

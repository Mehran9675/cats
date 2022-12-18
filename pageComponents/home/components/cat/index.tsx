import { useCallback, useMemo } from "react";
import Image from "next/image";
import { Breed, CatT } from "common/types";
import ROUTES from "common/routes.enum";
import styles from "./styles.module.scss";
import Show from "common/utility/show";
import { useRouter } from "next/router";

const Cat = (props: { data: CatT }) => {
  const { push } = useRouter();
  const renderBreeds = useCallback((breed: Breed) => breed.name, []);
  const breedId = useMemo(
    () => props.data.breeds?.length && props.data.breeds[0].id,
    []
  );
  return (
    <div
      onClick={() => breedId && push(ROUTES.BREED_DETAILS + breedId)}
      className={styles.cat}
    >
      <Image
        priority
        width="450"
        height="400"
        src={props.data.url}
        alt={props.data.id}
      />
      <Show if={!!breedId}>
        <span>
          <span>{props.data.breeds.map(renderBreeds)}</span>
        </span>
      </Show>
    </div>
  );
};
export default Cat;

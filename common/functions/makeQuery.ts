const makeQuery = <Q extends string>(query: Partial<Record<Q, string>>) => {
  const queryString = new URLSearchParams();
  for (const key in query) {
    queryString.append(key, query[key as Q] || "");
  }
  return "?" + queryString.toString();
};
export default makeQuery;

export type Response<Data> = {
  response: {
    data: Data;
  };
  status: number;
};

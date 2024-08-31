import { Pagination } from "../utils/interface/general.interface";

export const Paginate = (pagination: Pagination) => {
    const page = Number(pagination.page);
    let limit = Number(pagination.limit);
  
    // We are specifying a maximum limit to prevent the client from crashing the server by
    // setting limit to an unreasonably high figure.
    // if (!forSpaceCache) {
    //   limit = limit && limit > 0 && limit <= 20 ? limit : 10;
    // }
    return {
      limit,
      page: page && page > 0 ? (page - 1) * limit : 0,
    };
  };
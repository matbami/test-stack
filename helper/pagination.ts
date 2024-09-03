import { Pagination } from "../utils/interface/general.interface";

export const Paginate = (pagination: Pagination) => {
    const page = Number(pagination.page) || 1
    const limit = Number(pagination.limit) || 10

    return {
        page,
      limit,
      offset: (page - 1) * limit 
    };
  };
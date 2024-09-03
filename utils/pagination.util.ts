export function paginate(page: any = 1, limit: any = 10) {
  page = Number(page);
  limit = Number(limit);

  const offset = (page - 1) * limit;

  return { limit, offset, page };
}

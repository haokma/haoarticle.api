const Pagination = {
  sort: (order, orderBy) => {
    if (!orderBy) return;
    return {
      [orderBy]: order == "asc" ? 1 : -1,
    };
  },
  limit: (limit) => {
    return limit || 20;
  },
  skip: (page, limit) => {
    if (page == 0) return 0;
    return (page - 1) * limit;
  },
  page: (page) => {
    return page || 1;
  },
  result: (limit, page, total) => {
    return {
      _limit: limit,
      _page: page,
      _total: total,
    };
  },
};

module.exports = Pagination;

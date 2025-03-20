module.exports = (objectPagination, req) => {
  const currentPage = req.query.page;
  if(currentPage !== undefined) {
    objectPagination.currentPage = parseInt(currentPage);
  }
  
  return objectPagination;
}
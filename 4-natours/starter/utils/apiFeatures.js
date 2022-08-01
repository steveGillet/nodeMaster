class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryStr };
    const exFields = [`page`, `sort`, `limit`, `fields`];
    exFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.query.sort.split(',').join(` `);
      this.query = this.query.sort(sortBy);
      // sort by two fields
      // sort(`price ratingsAverage`)
    } else {
      this.query = this.query.sort(`-createdAt`);
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(`,`).join(` `);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select(`-__v`);
    }
    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 5;
    const skip = limit * (page - 1);
    // page=2&limit=5
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

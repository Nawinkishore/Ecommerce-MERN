class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({...keyword});
        return this;
    }
    filter()
    {
        const queryCopy = { ...this.queryString };
        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);   
        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr)); 
       
        return this;
    }
    paginate(resPerPage)
    {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;
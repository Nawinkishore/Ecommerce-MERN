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
        this.query = this.query.find(queryCopy);
        return this;
    }
}
export default ApiFeatures;
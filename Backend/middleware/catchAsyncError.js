const catchAsyncError = (handler) => {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    };
};

export default catchAsyncError;
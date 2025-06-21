import errors from "../helpers/errors/errors.js";

const setResponses = (req, res, next) => {
  const { method, originalUrl: url } = req;

  const successResponse = (statusCode, data) => {
    return res.status(statusCode).json({
      response: data,
      method,
      url,
    });
  };

  const errorResponse = ({ message, statusCode }) => {
    return res.status(statusCode).json({
      error: message,
      status: statusCode,
      method,
      url,
    });
  };

  res.json200 = (data) => successResponse(200, data);
  res.json201 = (data) => successResponse(201, data);

  res.json400 = () => errorResponse(errors.client);
  res.json401 = () => errorResponse(errors.auth);
  res.json403 = () => errorResponse(errors.forbidden);
  res.json404 = () => errorResponse(errors.notFound);
  res.json500 = () => errorResponse(errors.fatal);

  next();
};

export default setResponses;

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {() => {}} fn
 * @returns
 */
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

module.exports = {
  runMiddleware,
};

import * as yup from 'yup';

/**
 * Group errors in object where key is field name,
 * and value is array of error messages.
 */
export const groupYupErrors = (e: yup.ValidationError) => {
  const errors = (e.inner as yup.CreateErrorOptions[]).reduce(
    (accumulator: object, error: yup.CreateErrorOptions) => {
      if (!(error.path in accumulator)) {
        accumulator[error.path] = [error.message];
      } else {
        accumulator[error.path].push(error.message);
      }

      return accumulator;
    },
    {},
  );

  return errors;
};

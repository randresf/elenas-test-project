export const parseError = (errors: { field: any; message: any; }[]) => {
  const errs: Record<string, string> = {};
  errors.forEach((er: { message: any; }) => errs.message = er.message);
  return errs;
};

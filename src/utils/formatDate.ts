const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);
  const day = dateFormatted.getDate();
  const month = dateFormatted.getMonth() + 1;
  const year = dateFormatted.getFullYear();

  /** acrescentar o 0 caso o mês seja menor que 10 */
  const monthFormatted = month < 10 ? "0" + month : month;
  /** acrescentar o 0 caso o dia seja menor que 10 */
  const dayFormatted = day < 10 ? "0" + day : day;

  return `${dayFormatted}/${monthFormatted}/${year}`;
};

export default formatDate;

export const changeCurrent = (index) => {
  let selected = '';
  switch (index) {
    case 0:
      selected = 'PERSONAL';
      break;
    case 1:
      selected = 'SCHOOL';
      break;
    case 2:
      selected = 'WORK';
      break;
    case 3:
      selected = 'COURSE';
      break;
    case 4:
      selected = 'GRAPH';
      break;
    default:
      selected = 'PERSONAL';
      break;
  }
  return { type: 'CHANGE_CURRENT', selected };
}
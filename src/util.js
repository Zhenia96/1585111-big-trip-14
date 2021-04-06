export const getRandomIntegerRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


export const getRandomText = (sentencesCount) => {
  const PLACEHOLDER = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna,',
    'non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'];
  const placeholderLastIndex = PLACEHOLDER.length - 1;
  let text = '';

  for (let i = 1; i <= sentencesCount; i++) {
    text += PLACEHOLDER[getRandomIntegerRange(0, placeholderLastIndex)];
    text += ' ';
  }
  return text;
};
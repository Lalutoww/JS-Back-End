exports.httpOptionsSelector = (difficultyLevel) => {
   const titles = [
      'Very Easy',
      'Easy',
      'Medium (Standard 3x3)',
      'Intermediate',
      'Expert',
      'Hardcore',
   ];

   const options = titles.map((title, index) => {
      const value = index + 1; //indices start from 0 and we don't want that
      return {
         title: `${value} - ${title}`,
         value,
         selected: Number(difficultyLevel) === value ? 'selected' : '',
      };
   });

   return options;
};

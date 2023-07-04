const KEY = '35767877-cdffd31ced0a9308a675e254a';
const URL = 'https://pixabay.com/api/?';


const options = new URLSearchParams([
  ['orientation', 'horizontal'],
  ['safesearch', 'true'],
  ['per_page', 12],
  ['image_type', 'photo'],
]);

export async function fetchByName(name) {
  const response = await fetch(`${URL}q=${name}&key=${KEY}&page=1&${options}`);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('Oops Something Went Wrong'));
}

export async function pagination(name, pageNumber) {
  const response = await fetch(`${URL}q=${name}&key=${KEY}&page=${pageNumber}&${options}`);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('Oops Something Went Wrong'));
}
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_description = document.querySelector('#post-desc').value.trim();
  const location = window.location.href.split('/');
  const id = location[location.length -1];

  if (title && post_description) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'Put',
      body: JSON.stringify({ title, post_description }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update Post');
    }
  }
};




const delButtonHandler =  async (event) => {
  event.preventDefault();
  console.log('delete button clicked')
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};



document
  .querySelector('.updatePost')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#postCard')
  .addEventListener('click', delButtonHandler);

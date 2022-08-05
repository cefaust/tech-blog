const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post_description = document.querySelector('#post-desc').value.trim();

  if (title && post_description) {
    const response = await fetch('/api/posts', {
      method: 'Post',
      body: JSON.stringify({ title, post_description }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create Post');
    }
  }
};


const delButtonHandler =  async (event) => {
  console.log('delete button clicked')
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`api/posts/${id}`, {
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
  .querySelector('#newPostForm')
  .addEventListener('click', newFormHandler);

document
  .querySelector('#post-list')
  .addEventListener('click', delButtonHandler);




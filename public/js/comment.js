const commentFormHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#commentForm').value.trim();
  const location = window.location.href.split('/');
  const post_id = location[location.length -1];

  if (text) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({text, post_id}),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to Update Post with a comment')
    }
  }
};


document
  .querySelector('.submitComment')
  .addEventListener('click', commentFormHandler)

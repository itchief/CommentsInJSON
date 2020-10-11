const // путь до PHP обработчика
  URL_PHP_HANDLER = '/php/comments.php';

/*var comments = {
  id: 1,
  count: 1,
  comments: [
    {
      id: 1,
      parent: 0,
      text: 'Текст комментария...',
      name: 'Имя пользователя',
      ip: '192.168.0.1',
      createdon: '11.10.2020',
    },
  ],
};*/

function commentsTitle(data) {
  return `<div class="comments-title">Комментарии (${data.count})`;
}

function outputComments(data) {
  const commentsTitle = commentsTitle(data);
  const $comments = document.querySelector('.comments');
  $comments.insertAdjacentHTML('afterbegin', $comments);
}

document.addEventListener('submit', (e) => {
  const $form = e.target;
  if ($form.name !== 'comment-form') {
    return;
  }
  e.preventDefault();
  // получаем данные формы
  const data = new FormData($form);
  data.append('comment-thread', $form.closest('.comments').dataset.thread);
  data.append('comment-parent', 0);
  data.append('comment-id', 0);
  // form-key
  data.append('comment-action', 'save');

  // отправляем запрос на сервер
  let promise = fetch(URL_PHP_HANDLER, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log('Возникла проблема. Код состояния:', response.status);
        return;
      }
      response.json().then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      console.log('Fetch Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const data = new FormData();
  const thread = document.querySelector('.comments').dataset.thread;
  data.append('comment-thread', thread);
  data.append('comment-action', 'getlist');
  let promise = fetch(URL_PHP_HANDLER, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log('Возникла проблема. Код состояния:', response.status);
        return;
      }
      response.json().then((data) => {
        console.log(data);
        outputComments(data);
      });
    })
    .catch((error) => {
      console.log('Fetch Error:', error);
    });
});

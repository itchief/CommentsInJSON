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

const commentsTitle = (count) => {
  return `<div class="comments__title">Комментарии (${count})`;
};

const commentRow = (comments) => {
  //let html = `<div class="comments__items">${items}</div>`;
  let items = [];
  for (const comment in comments) {
    const item = comments[comment];
    items.push(
      `<div class="comments__item" data-id="${item['id']}" data-parent="${item['parent']}">
          <div class="comments__name">${item['name']}</div>
          <div class="comments__text">${item['text']}</div>
      </div>`
    );
  }
  /*comments.forEach((value, index) => {
    console.log(value);
    const a = `<div class="comments__item" data-id=""`;
  });*/
  return items.join('');
};

const outputComments = (data) => {
  const count = data.comments ? data.comments.count : 0;
  const title = commentsTitle(count);
  if (count === 0) {
    return;
  }
  const $comments = document.querySelector('.comments');
  $comments.insertAdjacentHTML('afterbegin', title);
  const items = commentRow(data.comments.comments);
  $comments.insertAdjacentHTML('beforeend', items);
};

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

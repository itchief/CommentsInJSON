<?php

function addComment($commentThread, $commentText, $commentName, $commentParent, $commentId)
{

  $data['result'] = 'success';

  $thread = (int) substr($commentThread, 9);
  if (!$thread > 0) {
    $data['result'] = 'error';
    exit(json_encode($data));
  }

  $file = PATH_TO_COMMENTS . 'comments-' . $thread . '.json';

  // если файла нет
  if (file_exists($file)) {
    $comments = json_decode(file_get_contents($file), true);
    $count = (int) $comments['count'];
    $comments['count'] = ++$count;
    $comment = [
      'id' => $count,
      'parent' => $commentParent,
      'text' => $commentText,
      'name' => $commentName
    ];
    $comments['comments']['comment-' . $count] = $comment;
  } else {
    $comment = [
      'id' => 1,
      'parent' => 0,
      'text' => $commentText,
      'name' => $commentName
    ];
    $comments = [
      'thread' => 'thread-' . $thread,
      'count' => 1,
      'comments' => [
        'comment-1' => $comment
      ]
    ];
  }

  file_put_contents($file, json_encode($comments), LOCK_EX);
  $data['comment'] = $comment;
  return $data;
}

<?php

function getList($commentThread)
{

  $data['result'] = 'success';

  $thread = (int) substr($commentThread, 9);
  if (!$thread > 0) {
    $data['result'] = 'error';
    exit(json_encode($data));
  }

  $file = PATH_TO_COMMENTS . 'comments-' . $thread . '.json';

  // если файл имеется
  if (file_exists($file)) {
    $comments = json_decode(file_get_contents($file), true);
  }

  $data['comments'] = $comments;
  return $data;
}

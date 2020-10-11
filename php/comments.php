<?php

mb_internal_encoding("UTF-8");

/*ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);*/

define('PATH_TO_COMMENTS', $_SERVER['DOCUMENT_ROOT'] . '/php/comments/');

include_once 'comments_add.php';
include_once 'comments_getlist.php';

$commentThread = $_POST['comment-thread'];
$commentText = $_POST['comment-text'];
$commentName = $_POST['comment-name'];
$commentParent = $_POST['comment-parent'];
$commentId = $_POST['comment-id'];
$commentAction = $_POST['comment-action'];

if ($commentAction === 'save') {
  $data = addComment($commentThread, $commentText, $commentName, $commentParent, $commentId);
  echo json_encode($data);
} elseif ($commentAction === 'getlist') {
  $data = getList($commentThread);
  echo json_encode($data);
}



/*$thread = (int) substr($commentThread, 9);
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
    'id' => $commentId,
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

$data['result'] = 'success';
$data['comment'] = $comment;


echo json_encode($data);*/

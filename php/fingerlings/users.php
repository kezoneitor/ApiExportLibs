<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
header('Content-type: application/json');

// Get the posted data.
$postdata = json_decode(file_get_contents("php://input")) or die("Se marmut");
if (isset($postdata) && isset($postdata->displayName) && isset($postdata->email) && isset($postdata->photoURL) && isset($postdata->uid)) {
      //echo json_encode($postdata->displayName);
      //echo json_encode($postdata->email);
      //echo json_encode($postdata->photoURL);
      //echo json_encode($postdata->uid);
      // Extract the data.
      //echo json_encode($postdata);
      $sql = "INSERT INTO users(uid,displayName, email, photoURL) values ('$postdata->uid','$postdata->displayName','$postdata->email','$postdata->photoURL') on conflict(uid) do nothing";
      $result = connection($sql) or die("false");
      //echo json_encode(pg_fetch_all(connection("select * from users")));
      //connection("delete from users where uid = '$postdata->uid'") or die("false");
      //echo json_encode(pg_fetch_all(connection("select * from users")));
      echo json_encode(true);
      exit;
} else{
      echo json_encode(false);
}

<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
header('Content-type: application/json');

// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata))
{
      // Extract the data.
      $request = json_decode($postdata);
      echo $request;
      exit;

      // Validate.
      if(trim($request->number) === '' || (float)$request->amount < 0)
      {
            return http_response_code(400);
      }


      // Create.
      $sql = "INSERT INTO `policies`(`id`,`number`,`amount`) VALUES (null,'{$number}','{$amount}')";

      if(mysqli_query($con,$sql))
      {
      http_response_code(201);
      $policy = [
      'number' => $number,
      'amount' => $amount,
      'id'    => mysqli_insert_id($con)
      ];
      echo json_encode($policy);
      }
      else
      {
            http_response_code(422);
      }
}
echo "kezo";
<?php
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $conn = new mysqli('localhost', 'root', '', 'contact');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into contact(firstname, lastname, email, message)values(?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $message);
        $stmt->execute();
        echo "Sent Successfully...";
        $stmt->close();
        $conn->close();
    }
?>

<?php
$host = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "narendrawebsite"; 

// Membuat koneksi
$conn = new mysqli($host, $username, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

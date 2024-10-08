<?php
include 'db_connect.php'; // Memasukkan file koneksi database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Untuk Contact Me
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        $name = $conn->real_escape_string($_POST['name']);
        $email = $conn->real_escape_string($_POST['email']);
        $message = $conn->real_escape_string($_POST['message']);

        // Insert data ke tabel contacts
        $sql = "INSERT INTO cont`acts (name, email, message) VALUES ('$name', '$email', '$message')";

        if ($conn->query($sql) === TRUE) {
            echo "Message sent successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    // Untuk Complaint
    if (isset($_POST['name-pengaduan']) && isset($_POST['email-pengaduan']) && isset($_POST['subject-pengaduan']) && isset($_POST['complaint'])) {
        $name_pengaduan = $conn->real_escape_string($_POST['name-pengaduan']);
        $email_pengaduan = $conn->real_escape_string($_POST['email-pengaduan']);
        $subject_pengaduan = $conn->real_escape_string($_POST['subject-pengaduan']);
        $complaint = $conn->real_escape_string($_POST['complaint']);

        // Insert data ke tabel complaints
        $sql_pengaduan = "INSERT INTO complaints (name, email, subject, complaint) VALUES ('$name_pengaduan', '$email_pengaduan', '$subject_pengaduan', '$complaint')";

        if ($conn->query($sql_pengaduan) === TRUE) {
            echo "Complaint submitted successfully!";
        } else {
            echo "Error: " . $sql_pengaduan . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>

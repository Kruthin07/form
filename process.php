<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $first = trim($_POST['firstName'] ?? '');
    $last  = trim($_POST['lastName'] ?? '');
    $fullName = trim($first . ' ' . $last);

    $email   = $_POST['email'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $dob     = $_POST['dob'] ?? '';
    $age     = $_POST['age'] ?? '';
    $country = $_POST['country'] ?? '';
    $gender  = $_POST['gender'] ?? 'Not specified';
    $skills  = isset($_POST['skills']) ? implode(', ', $_POST['skills']) : 'None';
    $address = $_POST['address'] ?? '';
    $bio     = $_POST['bio'] ?? '';

    echo '
      <div class="result-header">
        <h2 class="result-title">Registration Successful</h2>
        <p class="result-subtitle">Your information has been recorded.</p>
      </div>

      <div class="result-grid">
        <div>
          <div class="result-item-label">Full Name</div>
          <div class="result-item-value">'.htmlspecialchars($fullName).'</div>
        </div>
        <div>
          <div class="result-item-label">Email</div>
          <div class="result-item-value">'.htmlspecialchars($email).'</div>
        </div>
        <div>
          <div class="result-item-label">Phone</div>
          <div class="result-item-value">'.htmlspecialchars($phone).'</div>
        </div>
        <div>
          <div class="result-item-label">Date of Birth</div>
          <div class="result-item-value">'.htmlspecialchars($dob).'</div>
        </div>
        <div>
          <div class="result-item-label">Age</div>
          <div class="result-item-value">'.htmlspecialchars($age).'</div>
        </div>
        <div>
          <div class="result-item-label">Country</div>
          <div class="result-item-value">'.htmlspecialchars($country).'</div>
        </div>
        <div>
          <div class="result-item-label">Gender</div>
          <div class="result-item-value">'.htmlspecialchars($gender).'</div>
        </div>
        <div>
          <div class="result-item-label">Skills</div>
          <div class="result-item-value">'.htmlspecialchars($skills).'</div>
        </div>
      </div>

      <div style="margin-top:1.4rem;">
        <div class="result-item-label">Address</div>
        <div class="result-item-value">'.nl2br(htmlspecialchars($address)).'</div>
      </div>

      <div style="margin-top:1.4rem;">
        <div class="result-item-label">Short Bio</div>
        <div class="result-item-value">'.nl2br(htmlspecialchars($bio)).'</div>
      </div>
    ';
} else {
    echo '<p style="color:#dc2626;">Invalid request.</p>';
}

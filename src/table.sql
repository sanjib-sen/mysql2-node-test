CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  clerk_id VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  primaryEmailAddress VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  timezone VARCHAR(255),
  language VARCHAR(255),
  lastSignInAt DATETIME NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (user_id)
);

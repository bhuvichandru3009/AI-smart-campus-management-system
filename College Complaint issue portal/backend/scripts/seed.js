require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const users = [
  { name: 'Admin User', email: 'admin@college.edu', password: 'admin123', role: 'admin' },
  { name: 'John Student', email: 'student@college.edu', password: 'student123', role: 'student_teacher' },
  { name: 'Jane Teacher', email: 'teacher@college.edu', password: 'teacher123', role: 'student_teacher' },
];

const complaints = [
  { userEmail: 'student@college.edu', title: 'Broken AC in Lab 3', description: 'The air conditioner in computer lab 3 has not been working for a week.', category: 'Infrastructure', status: 'Pending' },
  { userEmail: 'student@college.edu', title: 'Missing Books', description: 'Several reference books are missing from the library catalog.', category: 'Library', status: 'In Progress' },
  { userEmail: 'teacher@college.edu', title: 'WiFi Not Working', description: 'WiFi connection is unstable in the staff room.', category: 'IT Support', status: 'Resolved' },
  { userEmail: 'teacher@college.edu', title: 'Hostel Water Issue', description: 'No hot water available in Block B hostel.', category: 'Hostel', status: 'Pending' },
  { userEmail: 'student@college.edu', title: 'Dirty Classroom', description: 'Room 204 needs cleaning, trash not collected.', category: 'Cleanliness', status: 'In Progress' },
];

async function seed() {
  try {
    console.log('Seeding database...');

    await pool.query('DELETE FROM complaints');
    await pool.query('DELETE FROM users');

    const userIds = {};
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, hashedPassword, user.role]
      );
      userIds[user.email] = result.insertId;
      console.log(`Created user: ${user.email}`);
    }

    for (const complaint of complaints) {
      const userId = userIds[complaint.userEmail];
      await pool.query(
        'INSERT INTO complaints (user_id, title, description, category, status) VALUES (?, ?, ?, ?, ?)',
        [userId, complaint.title, complaint.description, complaint.category, complaint.status]
      );
      console.log(`Created complaint: ${complaint.title}`);
    }

    console.log('\nSeed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('  Admin:   admin@college.edu / admin123');
    console.log('  Student: student@college.edu / student123');
    console.log('  Teacher: teacher@college.edu / teacher123');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

seed();

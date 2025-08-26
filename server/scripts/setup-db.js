const { exec } = require('child_process');
const path = require('path');

// Change to server directory
process.chdir(path.join(__dirname, '..'));

// Run Prisma migrations
exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running migrations: ${error}`);
    return;
  }
  
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  
  console.log(`stdout: ${stdout}`);
  
  // Run database initialization script
  exec('node scripts/init-db.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error initializing database: ${error}`);
      return;
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    
    console.log(`Database initialization output: ${stdout}`);
    console.log('Database setup completed successfully!');
  });
});
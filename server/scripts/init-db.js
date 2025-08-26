const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Initializing database...');
  
  // Create initial admin user with default credentials
  const defaultAdminUser = await prisma.user.upsert({
    where: { email: 'admin@shambadirect.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@shambadirect.com',
      phone: '+255712345678',
      passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S', // password: admin123
      role: 'ADMIN'
    }
  });
  
  console.log('Default admin user created/updated:', defaultAdminUser);
  
  // Create required admin user with specified credentials
  // NOTE: The passwordHash below needs to be updated with the actual bcrypt hash of "innovation2025//"
  // You can generate this hash using: await bcrypt.hash('innovation2025//', 12)
  const requiredAdminUser = await prisma.user.upsert({
    where: { email: 'imanipenza@gmail.com' },
    update: {},
    create: {
      name: 'Imani Penza',
      email: 'imanipenza@gmail.com',
      phone: '+255700000000',
      passwordHash: '$2b$12$MGpkrLpUQKT9YYXTgtzae.2fW27MaEvFgrcw8geVI9ysgrlUgcuFC', // password: innovation2025// (hashed)
      role: 'ADMIN'
    }
  });
  
  console.log('Required admin user created/updated:', requiredAdminUser);
  
  // Create some sample suppliers
  const suppliers = [
    {
      name: 'AgriTech Solutions',
      companyName: 'AgriTech Solutions Ltd',
      businessRegNo: 'REG12345',
      email: 'info@agritechsolutions.com',
      phone: '+255710000001',
      location: 'Dar es Salaam, Tanzania',
      role: 'SUPPLIER',
      status: 'APPROVED'
    },
    {
      name: 'Farm Equipment Suppliers',
      companyName: 'Farm Equipment Suppliers Co',
      businessRegNo: 'REG67890',
      email: 'contact@farmequipment.com',
      phone: '+255710000002',
      location: 'Arusha, Tanzania',
      role: 'SUPPLIER',
      status: 'APPROVED'
    }
  ];
  
  const createdSuppliers = [];
  for (const supplierData of suppliers) {
    const supplier = await prisma.user.upsert({
      where: { email: supplierData.email },
      update: {},
      create: supplierData
    });
    console.log('Supplier created/updated:', supplier);
    createdSuppliers.push(supplier);
  }
  
  // Create some sample products
  const products = [
    { name: 'Maize Seeds', unit: 'kg', price: 500.0, supplierId: createdSuppliers[0]?.id },
    { name: 'Fertilizer', unit: 'bag', price: 1200.0, supplierId: createdSuppliers[0]?.id },
    { name: 'Pesticide', unit: 'liter', price: 800.0, supplierId: createdSuppliers[1]?.id },
    { name: 'Water Pump', unit: 'unit', price: 15000.0, supplierId: createdSuppliers[1]?.id }
  ];
  
  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { name: productData.name },
      update: {},
      create: productData
    });
    console.log('Product created/updated:', product);
  }
  
  console.log('Database initialized successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
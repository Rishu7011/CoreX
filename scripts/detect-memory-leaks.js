setInterval(() => {
  const memory = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Heap: ${Math.round(memory)} MB`);
}, 10000);

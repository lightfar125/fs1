export default {
  async fetch(request) {
    return new Response("Worker is running!", { status: 200 });
  }
};


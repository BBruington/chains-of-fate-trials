export async function GET(request: Request) {
  return new Response("hi");
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return new Response("ok");
}

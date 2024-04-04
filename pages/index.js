import Link from "next/link";

function Home() {
  return (
  <div>
    <h2>Home</h2>
    <Link href="/sobre">
      Acessar Sobre
    </Link>
  </div>
  );
}

export default Home
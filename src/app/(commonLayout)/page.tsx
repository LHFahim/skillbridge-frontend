import Image from "next/image";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 mt-8 h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="relative w-full h-96 mb-6">
          <Image
            src="https://images.unsplash.com/photo-1621356986575-05811227a42e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            priority
            alt="Hero"
            className="object-cover rounded-md"
          />
        </div>
        <h1 className={"text-5xl font-bold text-center mb-4"}>
          Welcome to SkillBridge
        </h1>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Tutors</h2>
        <div className="grid grid-cols-3 gap-5"></div>
      </div>
    </div>
  );
}

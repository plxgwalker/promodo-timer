import TestAuth from "@/components/home/testAuth";

export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <TestAuth />
      </div>
    </div>
  );
}

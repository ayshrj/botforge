import { AvatarCustomizer } from "@/avatar/editor";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-6 font-sans sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto mb-6 w-full max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          BotForge
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Avatar Builder
        </h1>
        <p className="mt-2 text-neutral-400">
          Build an avatar and see every change in real time.
        </p>
      </div>
      <AvatarCustomizer />
    </main>
  );
}

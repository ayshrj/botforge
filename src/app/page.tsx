import { AvatarCustomizer } from "@/avatar/editor";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <header className="relative mx-auto mb-7 flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-4">
        <div>
          <a href="#builder" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#6f52ad]">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#30263d] text-base text-white shadow-md" aria-hidden="true">B</span>
            BotForge
          </a>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] text-[#30263d] sm:text-5xl">
            Forge a face that feels like <span className="text-[#7655bd]">you.</span>
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#716678] sm:text-right">
          Mix expressive silhouettes, hair, gear, and color. Your avatar is saved locally as you create.
        </p>
      </header>
      <div id="builder" className="relative scroll-mt-4">
        <AvatarCustomizer />
      </div>
      <footer className="relative mx-auto mt-10 flex w-full max-w-[1440px] justify-between border-t border-[#dcd2c8] py-5 text-xs font-semibold text-[#81778a]">
        <span>BotForge avatar studio</span>
        <span>Built for playful identities</span>
      </footer>
    </main>
  );
}

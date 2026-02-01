export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          About SkillBridge
        </h1>
        <p className="mt-4 text-base leading-7 text-white/80">
          SkillBridge is a modern online tutoring platform designed to connect
          students with skilled and verified tutors in just a few clicks...
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
            Students
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
            Tutors
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
            Admins
          </span>
        </div>
      </div>
    </div>
  );
}

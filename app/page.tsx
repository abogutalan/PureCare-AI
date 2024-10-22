import VoiceAssistant from "@/components/main/VoiceAssistant";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <VoiceAssistant />
      </div>
    </main>
  );
}
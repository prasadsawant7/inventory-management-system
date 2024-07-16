import Topbar from "@/components/topbar";

export default function CustomerLayout({ children }: RootLayoutProps) {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

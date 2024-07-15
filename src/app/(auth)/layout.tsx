import { ThemeToggle } from "@/components/theme-toggle";

const AuthLayout = ({ children }: RootLayoutProps) => {
  return (
    <section className="relative w-full">
      <ThemeToggle className="xs:right-5 xs:top-5 absolute right-10 top-10" />
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;

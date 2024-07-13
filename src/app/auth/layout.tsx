const AuthLayout = ({ children }: RootLayoutProps) => {
  return (
    <section className="w-full">
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;

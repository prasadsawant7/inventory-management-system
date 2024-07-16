declare type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

declare type WindowSize = {
  width: number;
  height: number;
};

declare type NavLink = {
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
  title: string;
  count?: number;
  href: string;
};

declare type GSTType = {
  gst: number;
  cGst: number;
  sGst: number;
  iGst: number;
};

declare type AmountType = {
  taxableAmount: number;
  totalGst: number;
  amount: number;
};

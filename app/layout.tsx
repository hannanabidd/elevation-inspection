import type { Metadata } from "next";
import { Kalam, Montserrat, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Headings: the geometric caps from the business card ("CHAD HAMILTON").
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Body copy.
const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
});

// Inspector's hand-written notes on photos, echoing the script "Inspections" in the logo.
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Elevation Inspections | Structural Inspections for Short-Term Rentals in Sevier County",
    template: "%s | Elevation Inspections",
  },
  description:
    "Twice-a-year structural inspections for short-term rentals in Sevierville, Pigeon Forge and Gatlinburg, backed by engineers. Catch small problems before they become big repairs.",
};

// Runs before paint: light by default, or the visitor's saved choice from the toggle, so there is no flash,
// and marks JS as available so scroll animations can start hidden.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t!=='dark'){t='light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${sourceSans.variable} ${kalam.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads */}
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import "./global1.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header'
import Footer from '../component/Footer'




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'BistaClinic',
  description: 'Admin and User Panel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
       <Header/>
        {children}
        <Footer/>
         <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>

      </body>
    </html>
  );
}

import MovieByIdProvider from "./providers/movieById-provider";
import MoviesProvider from "./providers/movies-provider"
import "./global.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container-fluid">
          <Navbar />
        </div>
        <MoviesProvider>
          <MovieByIdProvider>
            <main className="container">{children}</main>
          </MovieByIdProvider>
        </MoviesProvider>
        <div className="container">
          <Footer />
        </div>
      </body>
    </html>
  );
}
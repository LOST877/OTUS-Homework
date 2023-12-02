import MovieByIdProvider from "./providers/movieById-provider";
import MoviesProvider from "./providers/movies-provider"
import "./global.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import MoviesTopProvider from "./providers/moviesTop-provider";
import RoutesProvider from "./providers/routes-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RoutesProvider>
          <div className="container-fluid">
            <Navbar />
          </div>
          <MoviesProvider>
            <MoviesTopProvider>
              <MovieByIdProvider>
                <main className="container">{children}</main>
              </MovieByIdProvider>
            </MoviesTopProvider>
          </MoviesProvider>
          <div className="container">
            <Footer />
          </div>
        </RoutesProvider>
      </body>
    </html>
  );
}
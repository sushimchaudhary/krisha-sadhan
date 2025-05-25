// app/admin-layout.js
export const metadata = {
  title: 'Admin Panel',
  description: 'Admin section layout without header/footer',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RequireAuth from '@/components/RequireAuth';
import ProfileContent from '@/components/ProfileContent';

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <RequireAuth>
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
          <ProfileContent />
        </main>
      </RequireAuth>
      <Footer />
    </>
  );
}

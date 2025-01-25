import React from 'react';
import { Home, MessageCircle, Search } from 'lucide-react';

const WomensHealthApp = () => {
  return (
    <div className="min-h-screen bg-black text-green-400">
      <header className="flex justify-between items-center p-4 border-b border-green-700">
        <div className="flex items-center space-x-2">
          <Search color="green" size={32} />
          <h1 className="text-2xl font-bold text-green-400">WellWoman Tracker</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-green-200">Home</a></li>
            <li><a href="#" className="hover:text-green-200">Medications</a></li>
            <li><a href="#" className="hover:text-green-200">Chatbot</a></li>
            <li><a href="#" className="hover:text-green-200">Doctor Search</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-green-700">
            <Home color="green" size={48} className="mb-4" />
            <h2 className="text-xl font-semibold mb-3 text-green-400">Medication Tracker</h2>
            <p className="text-green-200">Easily input and track your current medications</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-green-700">
            <MessageCircle color="green" size={48} className="mb-4" />
            <h2 className="text-xl font-semibold mb-3 text-green-400">Health Chatbot</h2>
            <p className="text-green-200">Get instant health guidance and answers</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-green-700">
            <Search color="green" size={48} className="mb-4" />
            <h2 className="text-xl font-semibold mb-3 text-green-400">Doctor Finder</h2>
            <p className="text-green-200">Search and connect with specialized healthcare providers</p>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Your Health, Your Control</h2>
          <p className="text-green-200 max-w-2xl mx-auto">
            WellWoman Tracker is designed to empower women in managing their health 
            through medication tracking, instant health guidance, and easy doctor discovery.
          </p>
        </section>
      </main>

      <footer className="bg-gray-900 p-4 text-center border-t border-green-700">
        <p className="text-green-400">© 2024 WellWoman Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WomensHealthApp;
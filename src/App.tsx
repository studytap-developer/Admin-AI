// import React, { useState } from 'react';
// import { LoginPage } from './components/LoginPage';
// import { Navbar } from './components/Navbar';
// import { DashboardHome } from './components/DashboardHome';
// import { UsersSection } from './components/UsersSection';
// import { SyllabusSection } from './components/SyllabusSection';
// import type { Screen } from './types';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setCurrentScreen('dashboard');
//   };

//   const handleNavigate = (screen: Screen) => {
//     setCurrentScreen(screen);
//   };

//   const renderCurrentScreen = () => {
//     switch (currentScreen) {
//       case 'users':
//         return <UsersSection />;
//       case 'syllabus':
//         return <SyllabusSection />;
//       default:
//         return <DashboardHome onNavigate={handleNavigate} />;
//     }
//   };

//   if (!isLoggedIn) {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar 
//         searchQuery={searchQuery} 
//         onSearchChange={setSearchQuery} 
//       />
//       <div className="flex">
//         {/* Sidebar Navigation */}
//         <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-16">
//           <div className="p-6">
//             <nav className="space-y-2">
//               <button
//                 onClick={() => handleNavigate('dashboard')}
//                 className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
//                   currentScreen === 'dashboard'
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                     : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//                 Dashboard
//               </button>
              
//               <button
//                 onClick={() => handleNavigate('users')}
//                 className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
//                   currentScreen === 'users'
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                     : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
//                 Users
//               </button>
              
//               <button
//                 onClick={() => handleNavigate('syllabus')}
//                 className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
//                   currentScreen === 'syllabus'
//                     ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                     : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
//                 Syllabus
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           {renderCurrentScreen()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;






import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { DashboardHome } from './components/DashboardHome';
import { UsersSection } from './components/UsersSection';
import { SyllabusSection } from './components/SyllabusSection';
import type { Screen } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'users':
        return <UsersSection />;
      case 'syllabus':
        return <SyllabusSection />;
      default:
        return <DashboardHome onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
      />
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-16">
          <div className="p-6">
            <nav className="space-y-2">
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Dashboard
              </button>
              
              <button
                onClick={() => handleNavigate('users')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'users'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Users
              </button>
              
              <button
                onClick={() => handleNavigate('syllabus')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'syllabus'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Syllabus
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderCurrentScreen()}
        </div>
      </div>
    </div>
  );
}

export default App;
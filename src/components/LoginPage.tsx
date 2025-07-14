// import React, { useState } from 'react';
// import { Lock, Mail, BookOpen, Eye, EyeOff } from 'lucide-react';

// interface LoginPageProps {
//   onLogin: () => void;
// }

// export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{email?: string; password?: string}>({});

//   const validateForm = () => {
//     const newErrors: {email?: string; password?: string} = {};
    
//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Please enter a valid email';
//     }
    
//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     setIsLoading(false);
//     onLogin();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         {/* Logo and Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-6 shadow-2xl">
//             <BookOpen className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">StudyTap AI</h1>
//           <p className="text-gray-600 text-lg">Dashboard Access Portal</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm">
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//             <p className="text-gray-600">Sign in to access your dashboard</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 ${
//                     errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
//                   }`}
//                   placeholder="Enter your email address"
//                 />
//               </div>
//               {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`w-full pl-12 pr-12 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 ${
//                     errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
//                   }`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 'Sign In to Dashboard'
//               )}
//             </button>
//           </form>

//           <div className="mt-8 text-center space-y-4">
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
//               Forgot your password?
//             </a>
//             <div className="pt-4 border-t border-gray-200">
//               <p className="text-xs text-gray-500">
//                 Secure access to StudyTap AI Dashboard
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };







// import React, { useState } from 'react';
// import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// interface LoginPageProps {
//   onLogin: () => void;
// }

// export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState<{email?: string; password?: string; auth?: string}>({});

//   // Hardcoded credentials
//   const VALID_EMAIL = 'testing@gmail.com';
//   const VALID_PASSWORD = '1234';

//   const validateForm = () => {
//     const newErrors: {email?: string; password?: string; auth?: string} = {};
    
//     if (!email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!password) {
//       newErrors.password = 'Password is required';
//     } else if (password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Check credentials
//     if (email && password && (email !== VALID_EMAIL || password !== VALID_PASSWORD)) {
//       newErrors.auth = 'Invalid email or password';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsLoading(true);
//     setErrors({});
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (email === VALID_EMAIL && password === VALID_PASSWORD) {
//       setIsLoading(false);
//       onLogin();
//     } else {
//       setIsLoading(false);
//       setErrors({ auth: 'Invalid email or password' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mx-auto mb-4">
//               <BookOpen className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">StudyTap AI</h1>
//             <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//               {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//             </div>

//             {errors.auth && (
//               <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                 <p className="text-sm text-red-600 text-center">{errors.auth}</p>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                   Signing In...
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           {/* Additional Links */}
//           <div className="mt-8 text-center space-y-4">
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
//               Forgot your password?
//             </a>
//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//               <p className="text-xs text-blue-700 font-medium mb-2">Demo Credentials:</p>
//               <p className="text-xs text-blue-600">Email: testing@gmail.com</p>
//               <p className="text-xs text-blue-600">Password: 1234</p>
//             </div>
//             <div className="pt-4 border-t border-gray-200">
//               <p className="text-xs text-gray-500">
//                 Secure access to StudyTap AI Dashboard
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };









import React, { useState } from 'react';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; auth?: string}>({});

  // Hardcoded credentials
  const VALID_EMAIL = 'studytap21@gmail.com';
  const VALID_PASSWORD = 'Ai@tapKVMG';

  const validateForm = () => {
    const newErrors: {email?: string; password?: string; auth?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Check credentials
    if (email && password && (email !== VALID_EMAIL || password !== VALID_PASSWORD)) {
      newErrors.auth = 'Invalid email or password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsLoading(false);
      onLogin();
    } else {
      setIsLoading(false);
      setErrors({ auth: 'Invalid email or password' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">StudyTap AI</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.auth && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 text-center">{errors.auth}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-4">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
              Forgot your password?
            </a>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Secure access to StudyTap AI Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
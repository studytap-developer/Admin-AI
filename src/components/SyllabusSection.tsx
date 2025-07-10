

///// all are working except search , apis

// import React, { useState, useEffect, useMemo } from 'react';
// import { Search, BookCopy, ArrowLeft, Plus, Trash2, ChevronRight, FileText, Folder, BrainCircuit, UploadCloud, X } from 'lucide-react';

// // --- TYPE DEFINITIONS ---
// export interface University {
//   id: string;
//   name: string;
//   code: string;
//   totalSubjects: number;
//   totalQuestions: number;
// }

// export interface Branch {
//   id: string;
//   name: string;
//   code: string;
//   universityId: string;
//   totalSubjects: number;
// }

// export interface Subject {
//   id: string;
//   name: string;
//   code: string;
//   branchId: string;
//   totalPdfs: number;
// }

// interface PdfFile {
//   id: string;
//   name: string;
//   size: string;
//   date: string;
//   status: 'Uploading' | 'Processing' | 'Processed';
//   url: string;
//   fileData: string; // Base64 encoded file data for persistence
// }

// // --- BREADCRUMB COMPONENT ---
// const Breadcrumb: React.FC<{ items: { name: string, onClick?: () => void }[] }> = ({ items }) => (
//   <nav className="flex items-center text-sm text-gray-500 mb-4">
//     {items.map((item, index) => (
//       <React.Fragment key={item.name}>
//         {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
//         {item.onClick ? (<button onClick={item.onClick} className="hover:text-gray-800 hover:underline">{item.name}</button>) : (<span className="font-medium text-gray-700">{item.name}</span>)}
//       </React.Fragment>
//     ))}
//   </nav>
// );

// // --- ENHANCED SEARCH COMPONENT ---
// const SearchInput: React.FC<{ 
//   value: string; 
//   onChange: (value: string) => void; 
//   placeholder: string;
//   className?: string;
//   centered?: boolean;
// }> = ({ value, onChange, placeholder, className = "", centered = false }) => (
//   <div className={`relative ${className} ${centered ? 'flex justify-center' : ''}`}>
//     <div className={`relative ${centered ? 'w-full max-w-2xl' : 'w-full'}`}>
//       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//         <Search className="h-5 w-5 text-gray-400" />
//       </div>
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 ${centered ? 'text-center text-lg' : ''}`}
//         placeholder={placeholder}
//       />
//       {value && (
//         <button
//           onClick={() => onChange('')}
//           className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
//         >
//           <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//         </button>
//       )}
//     </div>
//   </div>
// );

// // --- MAIN SYLLABUS COMPONENT ---
// export const SyllabusSection: React.FC = () => {
//   // --- STATE MANAGEMENT ---
//   const [universities, setUniversities] = useState<University[]>(() => {
//     const saved = localStorage.getItem('universities');
//     return saved ? JSON.parse(saved) : [
//       { id: 'ou', name: 'Osmania University', code: 'OU', totalSubjects: 6, totalQuestions: 5240 },
//       { id: 'jntuh', name: 'Jawaharlal Nehru Technological University Hyderabad', code: 'JNTUH', totalSubjects: 0, totalQuestions: 6180 },
//     ];
//   });

//   const [branches, setBranches] = useState<Branch[]>(() => {
//     const saved = localStorage.getItem('branches');
//     return saved ? JSON.parse(saved) : [
//       { id: 'ou-cse', name: 'Computer Science Engineering', code: 'CSE', universityId: 'ou', totalSubjects: 6 },
//       { id: 'ou-it', name: 'Information Technology', code: 'IT', universityId: 'ou', totalSubjects: 0 },
//     ];
//   });

//   const [subjects, setSubjects] = useState<Subject[]>(() => {
//     const saved = localStorage.getItem('subjects');
//     return saved ? JSON.parse(saved) : [
//       { id: 'ou-cse-ds', name: 'Data Structures', code: 'DS', branchId: 'ou-cse', totalPdfs: 0 },
//       { id: 'ou-cse-algo', name: 'Algorithms', code: 'ALGO', branchId: 'ou-cse', totalPdfs: 0 },
//       { id: 'ou-cse-os', name: 'Operating Systems', code: 'OS', branchId: 'ou-cse', totalPdfs: 0 },
//     ];
//   });
  
//   // PDFs now persist with base64 encoding
//   const [pdfs, setPdfs] = useState<{ [subjectId: string]: PdfFile[] }>(() => {
//     const saved = localStorage.getItem('pdfs');
//     return saved ? JSON.parse(saved) : {};
//   });

//   const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
//   const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
//   const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

//   const [showAddUniversity, setShowAddUniversity] = useState(false);
//   const [showAddBranch, setShowAddBranch] = useState(false);
//   const [showAddSubject, setShowAddSubject] = useState(false);
//   const [name, setName] = useState('');
//   const [code, setCode] = useState('');

//   // --- SEARCH STATE ---
//   const [searchQuery, setSearchQuery] = useState('');

//   // --- SAVE TO LOCALSTORAGE ---
//   useEffect(() => {
//     localStorage.setItem('universities', JSON.stringify(universities));
//   }, [universities]);

//   useEffect(() => {
//     localStorage.setItem('branches', JSON.stringify(branches));
//   }, [branches]);

//   useEffect(() => {
//     localStorage.setItem('subjects', JSON.stringify(subjects));
//   }, [subjects]);

//   useEffect(() => {
//     localStorage.setItem('pdfs', JSON.stringify(pdfs));
//   }, [pdfs]);

//   // --- SEARCH LOGIC ---
//   const filteredUniversities = useMemo(() => {
//     if (!searchQuery.trim()) return universities;
//     const query = searchQuery.toLowerCase();
//     return universities.filter(u => 
//       u.name.toLowerCase().includes(query) || 
//       u.code.toLowerCase().includes(query)
//     );
//   }, [universities, searchQuery]);

//   const filteredBranches = useMemo(() => {
//     if (!selectedUniversity) return [];
//     const universityBranches = branches.filter(b => b.universityId === selectedUniversity.id);
//     if (!searchQuery.trim()) return universityBranches;
//     const query = searchQuery.toLowerCase();
//     return universityBranches.filter(b => 
//       b.name.toLowerCase().includes(query) || 
//       b.code.toLowerCase().includes(query)
//     );
//   }, [branches, selectedUniversity, searchQuery]);

//   const filteredSubjects = useMemo(() => {
//     if (!selectedBranch) return [];
//     const branchSubjects = subjects.filter(s => s.branchId === selectedBranch.id);
//     if (!searchQuery.trim()) return branchSubjects;
//     const query = searchQuery.toLowerCase();
//     return branchSubjects.filter(s => 
//       s.name.toLowerCase().includes(query) || 
//       s.code.toLowerCase().includes(query)
//     );
//   }, [subjects, selectedBranch, searchQuery]);

//   const filteredPdfs = useMemo(() => {
//     if (!selectedSubject) return [];
//     const subjectPdfs = pdfs[selectedSubject.id] || [];
//     if (!searchQuery.trim()) return subjectPdfs;
//     const query = searchQuery.toLowerCase();
//     return subjectPdfs.filter(pdf => 
//       pdf.name.toLowerCase().includes(query)
//     );
//   }, [pdfs, selectedSubject, searchQuery]);

//   // --- DELETE HANDLERS ---
//   const handleDeleteUniversity = (universityId: string) => {
//     if (!window.confirm('Are you sure? This will delete the university and all its branches, subjects, and PDFs.')) return;
//     setUniversities(prev => prev.filter(u => u.id !== universityId));
//     setBranches(prev => prev.filter(b => b.universityId !== universityId));
//     setSubjects(prev => prev.filter(s => !branches.find(b => b.id === s.branchId && b.universityId === universityId)));
//     // Clean up PDFs for deleted subjects
//     setPdfs(prev => {
//       const newPdfs = { ...prev };
//       Object.keys(newPdfs).forEach(subjectId => {
//         const subject = subjects.find(s => s.id === subjectId);
//         if (subject && branches.find(b => b.id === subject.branchId && b.universityId === universityId)) {
//           newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
//           delete newPdfs[subjectId];
//         }
//       });
//       return newPdfs;
//     });
//   };

//   const handleDeleteBranch = (branchId: string) => {
//     if (!window.confirm('Are you sure? This will delete the branch and all its subjects and PDFs.')) return;
//     setBranches(prev => prev.filter(b => b.id !== branchId));
//     setSubjects(prev => prev.filter(s => s.branchId !== branchId));
//     // Clean up PDFs for deleted subjects
//     setPdfs(prev => {
//       const newPdfs = { ...prev };
//       Object.keys(newPdfs).forEach(subjectId => {
//         const subject = subjects.find(s => s.id === subjectId && s.branchId === branchId);
//         if (subject) {
//           newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
//           delete newPdfs[subjectId];
//         }
//       });
//       return newPdfs;
//     });
//   };

//   const handleDeleteSubject = (subjectId: string) => {
//     if (!window.confirm('Are you sure? This will delete the subject and all its PDFs.')) return;
//     setSubjects(prev => prev.filter(s => s.id !== subjectId));
//     setPdfs(prev => {
//       const newPdfs = { ...prev };
//       if (newPdfs[subjectId]) {
//         newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
//         delete newPdfs[subjectId];
//       }
//       return newPdfs;
//     });
//   };

//   const handleDeletePdf = (subjectId: string, pdfId: string) => {
//     setPdfs(prev => {
//       const subjectPdfs = prev[subjectId] || [];
//       const pdfToDelete = subjectPdfs.find(p => p.id === pdfId);
//       if (pdfToDelete) URL.revokeObjectURL(pdfToDelete.url);
//       return { ...prev, [subjectId]: subjectPdfs.filter(p => p.id !== pdfId) };
//     });
//   };

//   // --- ADD & UPLOAD HANDLERS ---
//   const handleAddUniversity = () => {
//     if (!name.trim() || !code.trim()) return;
//     setUniversities(prev => [...prev, { id: `uni-${Date.now()}`, name, code: code.toUpperCase(), totalSubjects: 0, totalQuestions: 0 }]);
//     setName(''); setCode(''); setShowAddUniversity(false);
//   };
  
//   const handleAddBranch = () => {
//     if (!name.trim() || !code.trim() || !selectedUniversity) return;
//     setBranches(prev => [...prev, { id: `branch-${Date.now()}`, name, code: code.toUpperCase(), universityId: selectedUniversity.id, totalSubjects: 0 }]);
//     setName(''); setCode(''); setShowAddBranch(false);
//   };

//   const handleAddSubject = () => {
//     if (!name.trim() || !code.trim() || !selectedBranch) return;
//     setSubjects(prev => [...prev, { id: `subject-${Date.now()}`, name, code: code.toUpperCase(), branchId: selectedBranch.id, totalPdfs: 0 }]);
//     setName(''); setCode(''); setShowAddSubject(false);
//   };

//   // Helper function to convert file to base64
//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = error => reject(error);
//     });
//   };

//   // Helper function to create blob URL from base64
//   const base64ToBlob = (base64: string): string => {
//     const byteCharacters = atob(base64.split(',')[1]);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: 'application/pdf' });
//     return URL.createObjectURL(blob);
//   };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.target.files || !selectedSubject) return;
    
//     const files = Array.from(event.target.files);
//     const newFiles: PdfFile[] = [];

//     for (const file of files) {
//       try {
//         const base64Data = await fileToBase64(file);
//         const blobUrl = base64ToBlob(base64Data);
        
//         newFiles.push({
//           id: `${file.name}-${Date.now()}`,
//           name: file.name,
//           size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
//           date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
//           status: 'Uploading',
//           url: blobUrl,
//           fileData: base64Data
//         });
//       } catch (error) {
//         console.error('Error converting file to base64:', error);
//       }
//     }

//     setPdfs(prev => ({ ...prev, [selectedSubject.id]: [...(prev[selectedSubject.id] || []), ...newFiles] }));
    
//     // Simulate upload and processing
//     newFiles.forEach(pdf => {
//       setTimeout(() => {
//         setPdfs(prev => {
//           if (!prev[selectedSubject.id]) return prev;
//           return { ...prev, [selectedSubject.id]: prev[selectedSubject.id].map(p => p.id === pdf.id ? { ...p, status: 'Processing' } : p) };
//         });
//         setTimeout(() => {
//           setPdfs(prev => {
//             if (!prev[selectedSubject.id]) return prev;
//             return { ...prev, [selectedSubject.id]: prev[selectedSubject.id].map(p => p.id === pdf.id ? { ...p, status: 'Processed' } : p) };
//           });
//         }, 3000);
//       }, 2000);
//     });
//   };

//   // --- HELPER & EFFECT HOOKS ---
//   const getBreadcrumbItems = () => {
//     const items: { name: string, onClick?: () => void }[] = [
//       { name: 'Syllabus Management', onClick: () => { setSelectedUniversity(null); setSelectedBranch(null); setSelectedSubject(null); setSearchQuery(''); } }
//     ];
//     if (selectedUniversity) {
//       items.push({ name: selectedUniversity.name, onClick: () => { setSelectedBranch(null); setSelectedSubject(null); setSearchQuery(''); } });
//     }
//     if (selectedBranch) {
//       items.push({ name: selectedBranch.name, onClick: () => { setSelectedSubject(null); setSearchQuery(''); } });
//     }
//     if (selectedSubject) {
//       items.push({ name: 'Upload PDF Documents' });
//     }
//     return items;
//   };

//   // Clear search when navigating
//   const handleNavigation = (callback: () => void) => {
//     setSearchQuery('');
//     callback();
//   };

//   // Restore blob URLs from base64 data on component mount
//   useEffect(() => {
//     const restoredPdfs = { ...pdfs };
//     Object.keys(restoredPdfs).forEach(subjectId => {
//       restoredPdfs[subjectId] = restoredPdfs[subjectId].map(pdf => ({
//         ...pdf,
//         url: pdf.fileData ? base64ToBlob(pdf.fileData) : pdf.url
//       }));
//     });
//     setPdfs(restoredPdfs);
//   }, []);
  
//   useEffect(() => { 
//     return () => { 
//       Object.values(pdfs).flat().forEach(pdf => URL.revokeObjectURL(pdf.url)); 
//     }; 
//   }, [pdfs]);

//   // --- RENDER FUNCTIONS ---
//   const renderUniversitySelector = () => (
//     <div>
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Syllabus Management</h1>
//         <p className="text-gray-600 mb-8">Select a university to manage branches, subjects, and PDF documents</p>
        
//         {/* Centered Search Bar */}
//         <div className="mb-8">
//           <SearchInput
//             value={searchQuery}
//             onChange={setSearchQuery}
//             placeholder="Search universities by name or code..."
//             className="mb-4"
//             centered={true}
//           />
//           {searchQuery && (
//             <div className="text-sm text-gray-600">
//               Found {filteredUniversities.length} university(ies) matching "{searchQuery}"
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end mb-6">
//         <button onClick={() => { setName(''); setCode(''); setShowAddUniversity(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
//           <Plus size={16} /> Add University
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUniversities.map(u => {
//           const u_branches = branches.filter(b => b.universityId === u.id);
//           return (
//             <div key={u.id} className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm group hover:shadow-md transition-shadow">
//               <button onClick={(e) => { e.stopPropagation(); handleDeleteUniversity(u.id); }} className="absolute top-3 right-3 p-1.5 text-gray-400 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all"><X size={14} /></button>
//               <div onClick={() => handleNavigation(() => setSelectedUniversity(u))} className="cursor-pointer">
//                 <div className="flex flex-col items-center text-center"><div className="bg-blue-100 text-blue-700 text-3xl font-bold h-24 w-24 flex items-center justify-center rounded-2xl mb-4">{u.code}</div><h3 className="text-lg font-semibold text-gray-900 leading-tight h-10">{u.name}</h3></div>
//                 <hr className="my-5 border-gray-200" />
//                 <div className="flex justify-around w-full text-center">
//                   <div><p className="text-xl font-bold text-gray-800">{u_branches.length}</p><p className="text-xs text-gray-500">Branches</p></div>
//                   <div><p className="text-xl font-bold text-gray-800">{u.totalSubjects}</p><p className="text-xs text-gray-500">Subjects</p></div>
//                   <div><p className="text-xl font-bold text-gray-800">{u.totalQuestions.toLocaleString()}</p><p className="text-xs text-gray-500">Questions</p></div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredUniversities.length === 0 && searchQuery && (
//         <div className="text-center py-16">
//           <div className="text-gray-400 mb-4">
//             <Search size={64} className="mx-auto" />
//           </div>
//           <h3 className="text-xl font-medium text-gray-900 mb-2">No universities found</h3>
//           <p className="text-gray-600 mb-6">Try adjusting your search terms or add a new university.</p>
//           <button onClick={() => { setName(''); setCode(''); setShowAddUniversity(true); }} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
//             <Plus size={16} /> Add New University
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   const renderBranchSelector = () => {
//     const universityBranches = branches.filter(b => b.universityId === selectedUniversity?.id);
//     const universitySubjects = subjects.filter(s => universityBranches.find(b => b.id === s.branchId));
//     const totalPdfs = universitySubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
    
//     return (
//       <div>
//         <Breadcrumb items={getBreadcrumbItems()} />
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{selectedUniversity?.name}</h1>
//             <p className="mt-1 text-gray-600">Manage branches and their subjects</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => handleNavigation(() => { setSelectedUniversity(null); setSelectedBranch(null); setSelectedSubject(null); })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//               <ArrowLeft size={16} /> Back
//             </button>
//             <button onClick={() => { setName(''); setCode(''); setShowAddBranch(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
//               <Plus size={16} /> Add Branch
//             </button>
//           </div>
//         </div>

//         {/* Centered Search Input */}
//         <div className="mb-8">
//           <SearchInput
//             value={searchQuery}
//             onChange={setSearchQuery}
//             placeholder="Search branches by name or code..."
//             className="mb-4"
//             centered={true}
//           />
//           {searchQuery && (
//             <div className="text-center text-sm text-gray-600">
//               Found {filteredBranches.length} branch(es) matching "{searchQuery}"
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-purple-100"><Folder size={24} className="text-purple-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{universityBranches.length}</p><p className="text-sm text-gray-500">Total Branches</p></div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-indigo-100"><BookCopy size={24} className="text-indigo-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{universitySubjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-green-100"><BrainCircuit size={24} className="text-green-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{selectedUniversity?.totalQuestions.toLocaleString()}</p><p className="text-sm text-gray-500">Total Questions</p></div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{totalPdfs}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200">
//           <div className="p-5 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">Branches ({filteredBranches.length})</h3>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {filteredBranches.map(branch => {
//               const branchSubjects = subjects.filter(s => s.branchId === branch.id);
//               const branchPdfs = branchSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
//               return (
//                 <div key={branch.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-md text-sm">{branch.code}</div>
//                     <div>
//                       <p className="font-semibold text-gray-800">{branch.name}</p>
//                       <p className="text-sm text-gray-500">{branchSubjects.length} subjects • {branchPdfs} PDFs</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <button onClick={() => handleNavigation(() => setSelectedBranch(branch))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
//                       View Subjects
//                     </button>
//                     <button onClick={() => handleDeleteBranch(branch.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {filteredBranches.length === 0 && searchQuery && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 mb-4">
//                 <Search size={48} className="mx-auto" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
//               <p className="text-gray-600 mb-4">Try adjusting your search terms or add a new branch.</p>
//               <button onClick={() => { setName(''); setCode(''); setShowAddBranch(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
//                 <Plus size={16} /> Add New Branch
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderSubjectSelector = () => {
//     if (!selectedBranch) return null;
//     const branchSubjects = subjects.filter(s => s.branchId === selectedBranch.id);
//     const totalPdfs = branchSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
    
//     return (
//       <div>
//         <Breadcrumb items={getBreadcrumbItems()} />
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{selectedBranch.name}</h1>
//             <p className="mt-1 text-gray-600">Manage subjects and their PDF documents</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => handleNavigation(() => { setSelectedBranch(null); setSelectedSubject(null); })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//               <ArrowLeft size={16} /> Back
//             </button>
//             <button onClick={() => { setName(''); setCode(''); setShowAddSubject(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
//               <Plus size={16} /> Add Subject
//             </button>
//           </div>
//         </div>

//         {/* Centered Search Input */}
//         <div className="mb-8">
//           <SearchInput
//             value={searchQuery}
//             onChange={setSearchQuery}
//             placeholder="Search subjects by name or code..."
//             className="mb-4"
//             centered={true}
//           />
//           {searchQuery && (
//             <div className="text-center text-sm text-gray-600">
//               Found {filteredSubjects.length} subject(s) matching "{searchQuery}"
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-indigo-100"><BookCopy size={24} className="text-indigo-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{branchSubjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">{totalPdfs}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
//           </div>
//           <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
//             <div className="p-3 rounded-lg bg-green-100"><BrainCircuit size={24} className="text-green-600" /></div>
//             <div><p className="text-2xl font-bold text-gray-800">0</p><p className="text-sm text-gray-500">Total Questions</p></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200">
//           <div className="p-5 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800">Subjects ({filteredSubjects.length})</h3>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {filteredSubjects.length > 0 ? filteredSubjects.map(subject => {
//               const subjectPdfs = pdfs[subject.id] || [];
//               return (
//                 <div key={subject.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-md text-sm">{subject.code}</div>
//                     <div>
//                       <p className="font-semibold text-gray-800">{subject.name}</p>
//                       <p className="text-sm text-gray-500">{subjectPdfs.length} PDFs uploaded</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <button onClick={() => handleNavigation(() => setSelectedSubject(subject))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
//                       Upload PDFs
//                     </button>
//                     <button onClick={() => handleDeleteSubject(subject.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             }) : (
//               <div className="text-center py-12">
//                 {searchQuery ? (
//                   <>
//                     <div className="text-gray-400 mb-4">
//                       <Search size={48} className="mx-auto" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
//                     <p className="text-gray-600 mb-4">Try adjusting your search terms or add a new subject.</p>
//                     <button onClick={() => { setName(''); setCode(''); setShowAddSubject(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
//                       <Plus size={16} /> Add New Subject
//                     </button>
//                   </>
//                 ) : (
//                   <p className="text-gray-500">No subjects added for this branch yet.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderPdfUploader = () => {
//     if (!selectedSubject) return null;
//     const subjectPdfs = pdfs[selectedSubject.id] || [];
//     const StatusTag: React.FC<{ status: PdfFile['status'] }> = ({ status }) => { 
//       const styles = { 
//         Uploading: 'bg-blue-100 text-blue-800', 
//         Processing: 'bg-yellow-100 text-yellow-800', 
//         Processed: 'bg-green-100 text-green-800' 
//       }; 
//       return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>; 
//     };
    
//     return (
//       <div>
//         <Breadcrumb items={getBreadcrumbItems()} />
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Upload PDF Documents</h1>
//             <p className="mt-1 text-gray-600">Subject: {selectedSubject.name} ({selectedSubject.code})</p>
//           </div>
//           <button onClick={() => handleNavigation(() => setSelectedSubject(null))} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//             <ArrowLeft size={16} /> Back to Subjects
//           </button>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-4 rounded-xl border border-gray-200">
//               <label htmlFor="file-upload" className="cursor-pointer relative border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors">
//                 <div className="bg-slate-100 p-4 rounded-full mb-4">
//                   <UploadCloud size={32} className="text-slate-500" />
//                 </div>
//                 <p className="font-semibold text-gray-700 mb-1">Drop PDF files here</p>
//                 <p className="text-sm text-gray-500 mb-4">or click to browse</p>
//                 <span className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Choose Files</span>
//                 <input id="file-upload" type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
//               </label>
//             </div>

//             {/* Search Input for PDFs */}
//             <div className="bg-white p-4 rounded-xl border border-gray-200">
//               <SearchInput
//                 value={searchQuery}
//                 onChange={setSearchQuery}
//                 placeholder="Search PDF documents by filename..."
//                 className="w-full"
//               />
//             </div>

//             <div className="bg-white rounded-xl border border-gray-200">
//               <div className="p-5 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-800">Uploaded Documents ({filteredPdfs.length})</h3>
//                 {searchQuery && (
//                   <p className="text-sm text-gray-600 mt-1">
//                     Showing {filteredPdfs.length} of {subjectPdfs.length} documents
//                   </p>
//                 )}
//               </div>
//               <div className="divide-y divide-gray-200">
//                 {filteredPdfs.length > 0 ? filteredPdfs.map(file => (
//                   <div key={file.id} className="p-4 flex items-center gap-4">
//                     <FileText className="h-7 w-7 text-red-500 flex-shrink-0" />
//                     <div className="flex-grow min-w-0">
//                       <p className="font-medium text-sm text-gray-800 truncate" title={file.name}>{file.name}</p>
//                       <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
//                     </div>
//                     <div className="flex items-center gap-4 flex-shrink-0">
//                       <StatusTag status={file.status} />
//                       {file.status === 'Processed' && (
//                         <a href={file.url} download={file.name} className="text-sm font-medium text-blue-600 hover:underline">
//                           Download
//                         </a>
//                       )}
//                       <button onClick={() => handleDeletePdf(selectedSubject.id, file.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 )) : (
//                   <div className="text-center py-12">
//                     {searchQuery ? (
//                       <>
//                         <div className="text-gray-400 mb-4">
//                           <Search size={48} className="mx-auto" />
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No PDF documents found</h3>
//                         <p className="text-gray-600">Try adjusting your search terms.</p>
//                       </>
//                     ) : (
//                       <p className="text-gray-500">No documents uploaded for this subject yet.</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Guidelines</h3>
//               <ul className="list-disc list-inside text-gray-600 space-y-2.5 text-sm marker:text-gray-400">
//                 <li>Maximum file size: <strong>50MB per PDF</strong></li>
//                 <li>Supported format: <strong>PDF only</strong></li>
//                 <li>Multiple files can be uploaded</li>
//                 <li>Files will be processed automatically</li>
//                 <li>Files are saved permanently and will persist after page refresh</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {!selectedUniversity ? renderUniversitySelector() : 
//        !selectedBranch ? renderBranchSelector() : 
//        !selectedSubject ? renderSubjectSelector() : 
//        renderPdfUploader()}

//       {showAddUniversity && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
//             <h3 className="text-lg font-semibold mb-4">Add New University</h3>
//             <input type="text" placeholder="University Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <input type="text" placeholder="University Code (e.g., JNTUK)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowAddUniversity(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
//               <button onClick={handleAddUniversity} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add University</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAddBranch && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
//             <h3 className="text-lg font-semibold mb-4">Add New Branch</h3>
//             <input type="text" placeholder="Branch Name (e.g., Mechanical Engineering)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <input type="text" placeholder="Branch Code (e.g., MECH)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowAddBranch(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
//               <button onClick={handleAddBranch} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Add Branch</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAddSubject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
//             <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
//             <input type="text" placeholder="Subject Name (e.g., Data Structures)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <input type="text" placeholder="Subject Code (e.g., DS)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowAddSubject(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
//               <button onClick={handleAddSubject} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">Add Subject</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function App() {
//   return <SyllabusSection />;
// }




// functionalities working , search popup is working. 


import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookCopy, ArrowLeft, Plus, Trash2, ChevronRight, FileText, Folder, BrainCircuit, UploadCloud, X, AlertTriangle } from 'lucide-react';

// --- TYPE DEFINITIONS ---
export interface University {
  id: string;
  name: string;
  code: string;
  totalSubjects: number;
  totalQuestions: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  universityId: string;
  totalSubjects: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  branchId: string;
  totalPdfs: number;
}

interface PdfFile {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'Uploading' | 'Processing' | 'Processed';
  url: string;
  fileData: string; // Base64 encoded file data for persistence
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

// --- BREADCRUMB COMPONENT ---
const Breadcrumb: React.FC<{ items: { name: string, onClick?: () => void }[] }> = ({ items }) => (
  <nav className="flex items-center text-sm text-gray-500 mb-4">
    {items.map((item, index) => (
      <React.Fragment key={item.name}>
        {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
        {item.onClick ? (<button onClick={item.onClick} className="hover:text-gray-800 hover:underline">{item.name}</button>) : (<span className="font-medium text-gray-700">{item.name}</span>)}
      </React.Fragment>
    ))}
  </nav>
);

// --- ENHANCED SEARCH COMPONENT ---
const SearchInput: React.FC<{ 
  value: string; 
  onChange: (value: string) => void; 
  placeholder: string;
  className?: string;
  centered?: boolean;
}> = ({ value, onChange, placeholder, className = "", centered = false }) => (
  <div className={`relative ${className} ${centered ? 'flex justify-center' : ''}`}>
    <div className={`relative ${centered ? 'w-full max-w-2xl' : 'w-full'}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-200 ${centered ? 'text-center text-lg' : ''}`}
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  </div>
);

// --- CONFIRMATION MODAL COMPONENT ---
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger"
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmBg: 'bg-red-600 hover:bg-red-700',
          confirmText: 'text-white'
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          confirmBg: 'bg-yellow-600 hover:bg-yellow-700',
          confirmText: 'text-white'
        };
      default:
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          confirmBg: 'bg-blue-600 hover:bg-blue-700',
          confirmText: 'text-white'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className={`${styles.iconBg} ${styles.iconColor} p-3 rounded-full`}>
              <AlertTriangle size={24} />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{message}</p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 text-sm font-medium ${styles.confirmText} ${styles.confirmBg} rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SYLLABUS COMPONENT ---
export const SyllabusSection: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [universities, setUniversities] = useState<University[]>(() => {
    const saved = localStorage.getItem('universities');
    return saved ? JSON.parse(saved) : [
      { id: 'ou', name: 'Osmania University', code: 'OU', totalSubjects: 6, totalQuestions: 5240 },
      { id: 'jntuh', name: 'Jawaharlal Nehru Technological University Hyderabad', code: 'JNTUH', totalSubjects: 0, totalQuestions: 6180 },
    ];
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('branches');
    return saved ? JSON.parse(saved) : [
      { id: 'ou-cse', name: 'Computer Science Engineering', code: 'CSE', universityId: 'ou', totalSubjects: 6 },
      { id: 'ou-it', name: 'Information Technology', code: 'IT', universityId: 'ou', totalSubjects: 0 },
    ];
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [
      { id: 'ou-cse-ds', name: 'Data Structures', code: 'DS', branchId: 'ou-cse', totalPdfs: 0 },
      { id: 'ou-cse-algo', name: 'Algorithms', code: 'ALGO', branchId: 'ou-cse', totalPdfs: 0 },
      { id: 'ou-cse-os', name: 'Operating Systems', code: 'OS', branchId: 'ou-cse', totalPdfs: 0 },
    ];
  });
  
  // PDFs now persist with base64 encoding
  const [pdfs, setPdfs] = useState<{ [subjectId: string]: PdfFile[] }>(() => {
    const saved = localStorage.getItem('pdfs');
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [showAddUniversity, setShowAddUniversity] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- CONFIRMATION MODAL STATE ---
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger'
  });

  // --- SAVE TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem('universities', JSON.stringify(universities));
  }, [universities]);

  useEffect(() => {
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('pdfs', JSON.stringify(pdfs));
  }, [pdfs]);

  // --- SEARCH LOGIC ---
  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) return universities;
    const query = searchQuery.toLowerCase();
    return universities.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.code.toLowerCase().includes(query)
    );
  }, [universities, searchQuery]);

  const filteredBranches = useMemo(() => {
    if (!selectedUniversity) return [];
    const universityBranches = branches.filter(b => b.universityId === selectedUniversity.id);
    if (!searchQuery.trim()) return universityBranches;
    const query = searchQuery.toLowerCase();
    return universityBranches.filter(b => 
      b.name.toLowerCase().includes(query) || 
      b.code.toLowerCase().includes(query)
    );
  }, [branches, selectedUniversity, searchQuery]);

  const filteredSubjects = useMemo(() => {
    if (!selectedBranch) return [];
    const branchSubjects = subjects.filter(s => s.branchId === selectedBranch.id);
    if (!searchQuery.trim()) return branchSubjects;
    const query = searchQuery.toLowerCase();
    return branchSubjects.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.code.toLowerCase().includes(query)
    );
  }, [subjects, selectedBranch, searchQuery]);

  const filteredPdfs = useMemo(() => {
    if (!selectedSubject) return [];
    const subjectPdfs = pdfs[selectedSubject.id] || [];
    if (!searchQuery.trim()) return subjectPdfs;
    const query = searchQuery.toLowerCase();
    return subjectPdfs.filter(pdf => 
      pdf.name.toLowerCase().includes(query)
    );
  }, [pdfs, selectedSubject, searchQuery]);

  // --- DELETE HANDLERS WITH CONFIRMATION ---
  const handleDeleteUniversity = (universityId: string) => {
    const university = universities.find(u => u.id === universityId);
    if (!university) return;

    const relatedBranches = branches.filter(b => b.universityId === universityId);
    const relatedSubjects = subjects.filter(s => relatedBranches.find(b => b.id === s.branchId));
    const totalPdfs = relatedSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);

    setConfirmationModal({
      isOpen: true,
      title: 'Delete University',
      message: `Are you sure you want to delete "${university.name}"? This will permanently remove ${relatedBranches.length} branches, ${relatedSubjects.length} subjects, and ${totalPdfs} PDF documents. This action cannot be undone.`,
      onConfirm: () => {
        setUniversities(prev => prev.filter(u => u.id !== universityId));
        setBranches(prev => prev.filter(b => b.universityId !== universityId));
        setSubjects(prev => prev.filter(s => !branches.find(b => b.id === s.branchId && b.universityId === universityId)));
        // Clean up PDFs for deleted subjects
        setPdfs(prev => {
          const newPdfs = { ...prev };
          Object.keys(newPdfs).forEach(subjectId => {
            const subject = subjects.find(s => s.id === subjectId);
            if (subject && branches.find(b => b.id === subject.branchId && b.universityId === universityId)) {
              newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
              delete newPdfs[subjectId];
            }
          });
          return newPdfs;
        });
      },
      type: 'danger'
    });
  };

  const handleDeleteBranch = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    const relatedSubjects = subjects.filter(s => s.branchId === branchId);
    const totalPdfs = relatedSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);

    setConfirmationModal({
      isOpen: true,
      title: 'Delete Branch',
      message: `Are you sure you want to delete "${branch.name}"? This will permanently remove ${relatedSubjects.length} subjects and ${totalPdfs} PDF documents. This action cannot be undone.`,
      onConfirm: () => {
        setBranches(prev => prev.filter(b => b.id !== branchId));
        setSubjects(prev => prev.filter(s => s.branchId !== branchId));
        // Clean up PDFs for deleted subjects
        setPdfs(prev => {
          const newPdfs = { ...prev };
          Object.keys(newPdfs).forEach(subjectId => {
            const subject = subjects.find(s => s.id === subjectId && s.branchId === branchId);
            if (subject) {
              newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
              delete newPdfs[subjectId];
            }
          });
          return newPdfs;
        });
      },
      type: 'danger'
    });
  };

  const handleDeleteSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const subjectPdfs = pdfs[subjectId] || [];

    setConfirmationModal({
      isOpen: true,
      title: 'Delete Subject',
      message: `Are you sure you want to delete "${subject.name}"? This will permanently remove ${subjectPdfs.length} PDF documents. This action cannot be undone.`,
      onConfirm: () => {
        setSubjects(prev => prev.filter(s => s.id !== subjectId));
        setPdfs(prev => {
          const newPdfs = { ...prev };
          if (newPdfs[subjectId]) {
            newPdfs[subjectId].forEach(pdf => URL.revokeObjectURL(pdf.url));
            delete newPdfs[subjectId];
          }
          return newPdfs;
        });
      },
      type: 'danger'
    });
  };

  const handleDeletePdf = (subjectId: string, pdfId: string) => {
    const subjectPdfs = pdfs[subjectId] || [];
    const pdf = subjectPdfs.find(p => p.id === pdfId);
    if (!pdf) return;

    setConfirmationModal({
      isOpen: true,
      title: 'Delete PDF Document',
      message: `Are you sure you want to delete "${pdf.name}"? This action cannot be undone.`,
      onConfirm: () => {
        setPdfs(prev => {
          const subjectPdfs = prev[subjectId] || [];
          const pdfToDelete = subjectPdfs.find(p => p.id === pdfId);
          if (pdfToDelete) URL.revokeObjectURL(pdfToDelete.url);
          return { ...prev, [subjectId]: subjectPdfs.filter(p => p.id !== pdfId) };
        });
      },
      type: 'danger'
    });
  };

  // --- ADD & UPLOAD HANDLERS ---
  const handleAddUniversity = () => {
    if (!name.trim() || !code.trim()) return;
    setUniversities(prev => [...prev, { id: `uni-${Date.now()}`, name, code: code.toUpperCase(), totalSubjects: 0, totalQuestions: 0 }]);
    setName(''); setCode(''); setShowAddUniversity(false);
  };
  
  const handleAddBranch = () => {
    if (!name.trim() || !code.trim() || !selectedUniversity) return;
    setBranches(prev => [...prev, { id: `branch-${Date.now()}`, name, code: code.toUpperCase(), universityId: selectedUniversity.id, totalSubjects: 0 }]);
    setName(''); setCode(''); setShowAddBranch(false);
  };

  const handleAddSubject = () => {
    if (!name.trim() || !code.trim() || !selectedBranch) return;
    setSubjects(prev => [...prev, { id: `subject-${Date.now()}`, name, code: code.toUpperCase(), branchId: selectedBranch.id, totalPdfs: 0 }]);
    setName(''); setCode(''); setShowAddSubject(false);
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Helper function to create blob URL from base64
  const base64ToBlob = (base64: string): string => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !selectedSubject) return;
    
    const files = Array.from(event.target.files);
    const newFiles: PdfFile[] = [];

    for (const file of files) {
      try {
        const base64Data = await fileToBase64(file);
        const blobUrl = base64ToBlob(base64Data);
        
        newFiles.push({
          id: `${file.name}-${Date.now()}`,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Uploading',
          url: blobUrl,
          fileData: base64Data
        });
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }

    setPdfs(prev => ({ ...prev, [selectedSubject.id]: [...(prev[selectedSubject.id] || []), ...newFiles] }));
    
    // Simulate upload and processing
    newFiles.forEach(pdf => {
      setTimeout(() => {
        setPdfs(prev => {
          if (!prev[selectedSubject.id]) return prev;
          return { ...prev, [selectedSubject.id]: prev[selectedSubject.id].map(p => p.id === pdf.id ? { ...p, status: 'Processing' } : p) };
        });
        setTimeout(() => {
          setPdfs(prev => {
            if (!prev[selectedSubject.id]) return prev;
            return { ...prev, [selectedSubject.id]: prev[selectedSubject.id].map(p => p.id === pdf.id ? { ...p, status: 'Processed' } : p) };
          });
        }, 3000);
      }, 2000);
    });
  };

  // --- HELPER & EFFECT HOOKS ---
  const getBreadcrumbItems = () => {
    const items: { name: string, onClick?: () => void }[] = [
      { name: 'Syllabus Management', onClick: () => { setSelectedUniversity(null); setSelectedBranch(null); setSelectedSubject(null); setSearchQuery(''); } }
    ];
    if (selectedUniversity) {
      items.push({ name: selectedUniversity.name, onClick: () => { setSelectedBranch(null); setSelectedSubject(null); setSearchQuery(''); } });
    }
    if (selectedBranch) {
      items.push({ name: selectedBranch.name, onClick: () => { setSelectedSubject(null); setSearchQuery(''); } });
    }
    if (selectedSubject) {
      items.push({ name: 'Upload PDF Documents' });
    }
    return items;
  };

  // Clear search when navigating
  const handleNavigation = (callback: () => void) => {
    setSearchQuery('');
    callback();
  };

  // Restore blob URLs from base64 data on component mount
  useEffect(() => {
    const restoredPdfs = { ...pdfs };
    Object.keys(restoredPdfs).forEach(subjectId => {
      restoredPdfs[subjectId] = restoredPdfs[subjectId].map(pdf => ({
        ...pdf,
        url: pdf.fileData ? base64ToBlob(pdf.fileData) : pdf.url
      }));
    });
    setPdfs(restoredPdfs);
  }, []);
  
  useEffect(() => { 
    return () => { 
      Object.values(pdfs).flat().forEach(pdf => URL.revokeObjectURL(pdf.url)); 
    }; 
  }, [pdfs]);

  // --- RENDER FUNCTIONS ---
  const renderUniversitySelector = () => (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Syllabus Management</h1>
        <p className="text-gray-600 mb-8">Select a university to manage branches, subjects, and PDF documents</p>
        
        {/* Centered Search Bar */}
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search universities by name or code..."
            className="mb-4"
            centered={true}
          />
          {searchQuery && (
            <div className="text-sm text-gray-600">
              Found {filteredUniversities.length} university(ies) matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button onClick={() => { setName(''); setCode(''); setShowAddUniversity(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
          <Plus size={16} /> Add University
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map(u => {
          const u_branches = branches.filter(b => b.universityId === u.id);
          return (
            <div key={u.id} className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm group hover:shadow-md transition-shadow">
              <button onClick={(e) => { e.stopPropagation(); handleDeleteUniversity(u.id); }} className="absolute top-3 right-3 p-1.5 text-gray-400 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all"><X size={14} /></button>
              <div onClick={() => handleNavigation(() => setSelectedUniversity(u))} className="cursor-pointer">
                <div className="flex flex-col items-center text-center"><div className="bg-blue-100 text-blue-700 text-3xl font-bold h-24 w-24 flex items-center justify-center rounded-2xl mb-4">{u.code}</div><h3 className="text-lg font-semibold text-gray-900 leading-tight h-10">{u.name}</h3></div>
                <hr className="my-5 border-gray-200" />
                <div className="flex justify-around w-full text-center">
                  <div><p className="text-xl font-bold text-gray-800">{u_branches.length}</p><p className="text-xs text-gray-500">Branches</p></div>
                  <div><p className="text-xl font-bold text-gray-800">{u.totalSubjects}</p><p className="text-xs text-gray-500">Subjects</p></div>
                  <div><p className="text-xl font-bold text-gray-800">{u.totalQuestions.toLocaleString()}</p><p className="text-xs text-gray-500">Questions</p></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUniversities.length === 0 && searchQuery && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No universities found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or add a new university.</p>
          <button onClick={() => { setName(''); setCode(''); setShowAddUniversity(true); }} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus size={16} /> Add New University
          </button>
        </div>
      )}
    </div>
  );

  const renderBranchSelector = () => {
    const universityBranches = branches.filter(b => b.universityId === selectedUniversity?.id);
    const universitySubjects = subjects.filter(s => universityBranches.find(b => b.id === s.branchId));
    const totalPdfs = universitySubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
    
    return (
      <div>
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{selectedUniversity?.name}</h1>
            <p className="mt-1 text-gray-600">Manage branches and their subjects</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleNavigation(() => { setSelectedUniversity(null); setSelectedBranch(null); setSelectedSubject(null); })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={() => { setName(''); setCode(''); setShowAddBranch(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
              <Plus size={16} /> Add Branch
            </button>
          </div>
        </div>

        {/* Centered Search Input */}
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search branches by name or code..."
            className="mb-4"
            centered={true}
          />
          {searchQuery && (
            <div className="text-center text-sm text-gray-600">
              Found {filteredBranches.length} branch(es) matching "{searchQuery}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-100"><Folder size={24} className="text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{universityBranches.length}</p><p className="text-sm text-gray-500">Total Branches</p></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-100"><BookCopy size={24} className="text-indigo-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{universitySubjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100"><BrainCircuit size={24} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{selectedUniversity?.totalQuestions.toLocaleString()}</p><p className="text-sm text-gray-500">Total Questions</p></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{totalPdfs}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Branches ({filteredBranches.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredBranches.map(branch => {
              const branchSubjects = subjects.filter(s => s.branchId === branch.id);
              const branchPdfs = branchSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
              return (
                <div key={branch.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-md text-sm">{branch.code}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{branch.name}</p>
                      <p className="text-sm text-gray-500">{branchSubjects.length} subjects • {branchPdfs} PDFs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleNavigation(() => setSelectedBranch(branch))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                      View Subjects
                    </button>
                    <button onClick={() => handleDeleteBranch(branch.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBranches.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or add a new branch.</p>
              <button onClick={() => { setName(''); setCode(''); setShowAddBranch(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                <Plus size={16} /> Add New Branch
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSubjectSelector = () => {
    if (!selectedBranch) return null;
    const branchSubjects = subjects.filter(s => s.branchId === selectedBranch.id);
    const totalPdfs = branchSubjects.reduce((acc, subject) => acc + (pdfs[subject.id] || []).length, 0);
    
    return (
      <div>
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{selectedBranch.name}</h1>
            <p className="mt-1 text-gray-600">Manage subjects and their PDF documents</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleNavigation(() => { setSelectedBranch(null); setSelectedSubject(null); })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={() => { setName(''); setCode(''); setShowAddSubject(true); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              <Plus size={16} /> Add Subject
            </button>
          </div>
        </div>

        {/* Centered Search Input */}
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search subjects by name or code..."
            className="mb-4"
            centered={true}
          />
          {searchQuery && (
            <div className="text-center text-sm text-gray-600">
              Found {filteredSubjects.length} subject(s) matching "{searchQuery}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-100"><BookCopy size={24} className="text-indigo-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{branchSubjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{totalPdfs}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-100"><BrainCircuit size={24} className="text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">0</p><p className="text-sm text-gray-500">Total Questions</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Subjects ({filteredSubjects.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredSubjects.length > 0 ? filteredSubjects.map(subject => {
              const subjectPdfs = pdfs[subject.id] || [];
              return (
                <div key={subject.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-md text-sm">{subject.code}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{subject.name}</p>
                      <p className="text-sm text-gray-500">{subjectPdfs.length} PDFs uploaded</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleNavigation(() => setSelectedSubject(subject))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                      Upload PDFs
                    </button>
                    <button onClick={() => handleDeleteSubject(subject.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <div className="text-gray-400 mb-4">
                      <Search size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search terms or add a new subject.</p>
                    <button onClick={() => { setName(''); setCode(''); setShowAddSubject(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                      <Plus size={16} /> Add New Subject
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500">No subjects added for this branch yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPdfUploader = () => {
    if (!selectedSubject) return null;
    const subjectPdfs = pdfs[selectedSubject.id] || [];
    const StatusTag: React.FC<{ status: PdfFile['status'] }> = ({ status }) => { 
      const styles = { 
        Uploading: 'bg-blue-100 text-blue-800', 
        Processing: 'bg-yellow-100 text-yellow-800', 
        Processed: 'bg-green-100 text-green-800' 
      }; 
      return <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>; 
    };
    
    return (
      <div>
        <Breadcrumb items={getBreadcrumbItems()} />
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Upload PDF Documents</h1>
            <p className="mt-1 text-gray-600">Subject: {selectedSubject.name} ({selectedSubject.code})</p>
          </div>
          <button onClick={() => handleNavigation(() => setSelectedSubject(null))} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <ArrowLeft size={16} /> Back to Subjects
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <label htmlFor="file-upload" className="cursor-pointer relative border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <UploadCloud size={32} className="text-slate-500" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Drop PDF files here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <span className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Choose Files</span>
                <input id="file-upload" type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            {/* Search Input for PDFs */}
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search PDF documents by filename..."
                className="w-full"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Uploaded Documents ({filteredPdfs.length})</h3>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {filteredPdfs.length} of {subjectPdfs.length} documents
                  </p>
                )}
              </div>
              <div className="divide-y divide-gray-200">
                {filteredPdfs.length > 0 ? filteredPdfs.map(file => (
                  <div key={file.id} className="p-4 flex items-center gap-4">
                    <FileText className="h-7 w-7 text-red-500 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-sm text-gray-800 truncate" title={file.name}>{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <StatusTag status={file.status} />
                      {file.status === 'Processed' && (
                        <a href={file.url} download={file.name} className="text-sm font-medium text-blue-600 hover:underline">
                          Download
                        </a>
                      )}
                      <button onClick={() => handleDeletePdf(selectedSubject.id, file.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    {searchQuery ? (
                      <>
                        <div className="text-gray-400 mb-4">
                          <Search size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No PDF documents found</h3>
                        <p className="text-gray-600">Try adjusting your search terms.</p>
                      </>
                    ) : (
                      <p className="text-gray-500">No documents uploaded for this subject yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Guidelines</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2.5 text-sm marker:text-gray-400">
                <li>Maximum file size: <strong>50MB per PDF</strong></li>
                <li>Supported format: <strong>PDF only</strong></li>
                <li>Multiple files can be uploaded</li>
                <li>Files will be processed automatically</li>
                <li>Files are saved permanently and will persist after page refresh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {!selectedUniversity ? renderUniversitySelector() : 
       !selectedBranch ? renderBranchSelector() : 
       !selectedSubject ? renderSubjectSelector() : 
       renderPdfUploader()}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmationModal.onConfirm}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
      />

      {showAddUniversity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New University</h3>
            <input type="text" placeholder="University Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" placeholder="University Code (e.g., JNTUK)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddUniversity(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleAddUniversity} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add University</button>
            </div>
          </div>
        </div>
      )}

      {showAddBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New Branch</h3>
            <input type="text" placeholder="Branch Name (e.g., Mechanical Engineering)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" placeholder="Branch Code (e.g., MECH)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddBranch(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleAddBranch} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Add Branch</button>
            </div>
          </div>
        </div>
      )}

      {showAddSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
            <input type="text" placeholder="Subject Name (e.g., Data Structures)" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 mb-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" placeholder="Subject Code (e.g., DS)" value={code} onChange={(e) => setCode(e.target.value)} className="w-full border px-3 py-2 mb-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowAddSubject(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleAddSubject} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">Add Subject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return <SyllabusSection />;
}

import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookCopy, ArrowLeft, Plus, Trash2, ChevronRight, FileText, Folder, BrainCircuit, UploadCloud, X, AlertTriangle, RefreshCw } from 'lucide-react';

// --- TYPE DEFINITIONS ---
export interface University {
  id: string;
  name: string;
  code: string;
  totalSubjects: number;
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
  status: 'Uploading' | 'Processing' | 'Processed' | 'Failed';
  url: string;
  errorMessage?: string;
  apiId?: string;
  filename?: string;
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
      <React.Fragment key={`${item.name}-${index}`}>
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
  const [universities, setUniversities] = useState<University[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<PdfFile[]>([]);
  const [currentSubjectId, setCurrentSubjectId] = useState<string | null>(null);

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

  // --- LOADING STATE ---
  const [isLoadingPdfs, setIsLoadingPdfs] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);

  // --- API CONFIGURATION ---
  // const API_BASE_URL = 'http://127.0.0.1:8000';
     const API_BASE_URL = 'https://ai-chatbot-1-sgup.onrender.com';

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

  // --- API FUNCTIONS ---
  const fetchUniversities = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/universities/`);
      const data = await res.json();
      setUniversities(data.map((uni: any) => ({
        id: uni.id,
        name: uni.name,
        code: uni.code,
        totalSubjects: 0 // Will be calculated
      })));
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const fetchBranches = async (universityId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/branches/${universityId}`);
      const data = await res.json();
      setBranches(data.map((branch: any) => ({
        id: branch.id,
        name: branch.name,
        code: branch.code,
        universityId: universityId,
        totalSubjects: 0 // Will be calculated
      })));
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchSubjects = async (branchId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/branches/${branchId}/subjects/`);
      const data = await res.json();
      setSubjects(data.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        branchId: branchId,
        totalPdfs: 0 // Will be calculated
      })));
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchUploadedFiles = async (subjectId: string) => {
    try {
      setIsLoadingPdfs(true);
      setPdfLoadError(null);
      const res = await fetch(`${API_BASE_URL}/subjects/${subjectId}/pdfs/`);
      const data = await res.json();
      setUploadedFiles(data.map((file: any) => ({
        id: file.id,
        name: file.filename,
        filename: file.filename,
        size: file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown Size',
        date: file.upload_date ? new Date(file.upload_date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) : new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        status: 'Processed' as const,
        url: file.download_url || '#',
        apiId: file.id
      })));
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      setPdfLoadError('Failed to load PDF files');
    } finally {
      setIsLoadingPdfs(false);
    }
  };

  // --- INITIALIZATION ---
  useEffect(() => {
    fetchUniversities();
  }, []);

  // --- HANDLERS ---
  const handleUniversityClick = (uni: University) => {
    setSelectedUniversity(uni);
    setSelectedBranch(null);
    setSelectedSubject(null);
    setSubjects([]);
    setUploadedFiles([]);
    fetchBranches(uni.id);
  };

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setSelectedSubject(null);
    setUploadedFiles([]);
    fetchSubjects(branch.id);
  };

  const handleSubjectClick = async (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentSubjectId(subject.id);
    await fetchUploadedFiles(subject.id);
  };

  // --- FILE UPLOAD HANDLER ---
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !selectedSubject) return;
    
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`${API_BASE_URL}/subjects/${selectedSubject.id}/pdfs/`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // alert('PDF uploaded successfully');
          await fetchUploadedFiles(selectedSubject.id);
        } else {
          alert('File upload failed');
        }
      } catch (err) {
        console.error('Upload error', err);
        alert('File upload failed');
      }
    }

    event.target.value = '';
  };

  // --- DELETE HANDLERS ---
  const deleteFile = async (fileId: string) => {
    if (!currentSubjectId) return;

    try {
      await fetch(`${API_BASE_URL}/delete-file/${fileId}`, {
        method: 'DELETE'
      });
      await fetchUploadedFiles(currentSubjectId);
    } catch (err) {
      alert('Failed to delete file');
    }
  };

  const addUniversity = async () => {
    if (!name || !code) return;
    try {
      await fetch(`${API_BASE_URL}/universities/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, code: code })
      });
      setName('');
      setCode('');
      setShowAddUniversity(false);
      await fetchUniversities();
    } catch (error) {
      console.error('Error adding university:', error);
      alert('Failed to add university');
    }
  };

  const deleteUniversity = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/universities/${id}`, { method: 'DELETE' });
      await fetchUniversities();
    } catch (err) {
      alert('Failed to delete university');
    }
  };

  const addBranch = async () => {
    if (!name || !code || !selectedUniversity) return;
    try {
      await fetch(`${API_BASE_URL}/branches/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, code: code, university_id: selectedUniversity.id })
      });
      setName('');
      setCode('');
      setShowAddBranch(false);
      await fetchBranches(selectedUniversity.id);
    } catch (error) {
      console.error('Error adding branch:', error);
      alert('Failed to add branch');
    }
  };

  const deleteBranch = async (branchId: string) => {
    try {
      await fetch(`${API_BASE_URL}/branches/${branchId}/`, { method: 'DELETE' });
      if (selectedUniversity) {
        await fetchBranches(selectedUniversity.id);
      }
    } catch (err) {
      alert('Failed to delete branch');
    }
  };

  const addSubject = async () => {
    if (!name || !code || !selectedBranch) return;
    try {
      await fetch(`${API_BASE_URL}/branches/${selectedBranch.id}/subjects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, code: code })
      });
      setName('');
      setCode('');
      setShowAddSubject(false);
      await fetchSubjects(selectedBranch.id);
    } catch (error) {
      console.error('Error adding subject:', error);
      alert('Failed to add subject');
    }
  };

  const deleteSubject = async (subjectId: string) => {
    try {
      await fetch(`${API_BASE_URL}/subjects/${subjectId}/`, { method: 'DELETE' });
      if (selectedBranch) {
        await fetchSubjects(selectedBranch.id);
      }
    } catch (err) {
      alert('Failed to delete subject');
    }
  };

  // --- CONFIRMATION HANDLERS ---
  const handleDeleteUniversity = (universityId: string) => {
    const university = universities.find(u => u.id === universityId);
    if (!university) return;

    setConfirmationModal({
      isOpen: true,
      title: 'Delete University',
      message: `Are you sure you want to delete "${university.name}"? This will permanently remove all associated branches, subjects, and PDF documents. This action cannot be undone.`,
      onConfirm: () => deleteUniversity(universityId),
      type: 'danger'
    });
  };

  const handleDeleteBranch = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    setConfirmationModal({
      isOpen: true,
      title: 'Delete Branch',
      message: `Are you sure you want to delete "${branch.name}"? This will permanently remove all associated subjects and PDF documents. This action cannot be undone.`,
      onConfirm: () => deleteBranch(branchId),
      type: 'danger'
    });
  };

  const handleDeleteSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;

    setConfirmationModal({
      isOpen: true,
      title: 'Delete Subject',
      message: `Are you sure you want to delete "${subject.name}"? This will permanently remove all associated PDF documents. This action cannot be undone.`,
      onConfirm: () => deleteSubject(subjectId),
      type: 'danger'
    });
  };

  const handleDeletePdf = (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    setConfirmationModal({
      isOpen: true,
      title: 'Delete PDF Document',
      message: `Are you sure you want to delete "${file.name}"? This action cannot be undone.`,
      onConfirm: () => deleteFile(fileId),
      type: 'danger'
    });
  };

  // --- REFRESH PDFS FUNCTION ---
  const handleRefreshPdfs = async () => {
    if (!selectedSubject) return;
    await fetchUploadedFiles(selectedSubject.id);
  };

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
    if (!searchQuery.trim()) return branches;
    const query = searchQuery.toLowerCase();
    return branches.filter(b => 
      b.name.toLowerCase().includes(query) || 
      b.code.toLowerCase().includes(query)
    );
  }, [branches, searchQuery]);

  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return subjects;
    const query = searchQuery.toLowerCase();
    return subjects.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.code.toLowerCase().includes(query)
    );
  }, [subjects, searchQuery]);

  const filteredPdfs = useMemo(() => {
    if (!searchQuery.trim()) return uploadedFiles;
    const query = searchQuery.toLowerCase();
    return uploadedFiles.filter(pdf => 
      pdf.name.toLowerCase().includes(query)
    );
  }, [uploadedFiles, searchQuery]);

  // --- HELPER FUNCTIONS ---
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

  const handleNavigation = (callback: () => void) => {
    setSearchQuery('');
    callback();
  };

const getDisplayName = (filename) => {
  // This regex splits on the first underscore and returns the rest
  const parts = filename.split('_');
  return parts.length > 1 ? parts.slice(1).join('_') : filename;
};


  // --- RENDER FUNCTIONS ---
  const renderUniversitySelector = () => (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Syllabus Management</h1>
        <p className="text-gray-600 mb-8">Select a university to manage branches, subjects, and PDF documents.</p>
        
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
              <div onClick={() => handleNavigation(() => handleUniversityClick(u))} className="cursor-pointer">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 text-blue-700 text-3xl font-bold h-24 w-24 flex items-center justify-center rounded-2xl mb-4">{u.code}</div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight h-10">{u.name}</h3>
                </div>
                <hr className="my-5 border-gray-200" />
                <div className="flex justify-around w-full text-center">
                  <div>
                    <p className="text-xl font-bold text-gray-800">{u_branches.length}</p>
                    <p className="text-xs text-gray-500">Branches</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">{u.totalSubjects}</p>
                    <p className="text-xs text-gray-500">Subjects</p>
                  </div>
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

  const renderBranchSelector = () => (
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
          <div><p className="text-2xl font-bold text-gray-800">{branches.length}</p><p className="text-sm text-gray-500">Total Branches</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-100"><BookCopy size={24} className="text-indigo-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{subjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{uploadedFiles.length}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Branches ({filteredBranches.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredBranches.map(branch => (
            <div key={branch.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-md text-sm">{branch.code}</div>
                <div>
                  <p className="font-semibold text-gray-800">{branch.name}</p>
                  <p className="text-sm text-gray-500">Click to view subjects</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleNavigation(() => handleBranchClick(branch))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                  View Subjects
                </button>
                <button onClick={() => handleDeleteBranch(branch.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
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

  const renderSubjectSelector = () => (
    <div>
      <Breadcrumb items={getBreadcrumbItems()} />
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{selectedBranch?.name}</h1>
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
          <div><p className="text-2xl font-bold text-gray-800">{subjects.length}</p><p className="text-sm text-gray-500">Total Subjects</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-orange-100"><FileText size={24} className="text-orange-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">{uploadedFiles.length}</p><p className="text-sm text-gray-500">Total PDFs</p></div>
        </div>
        {/* <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100"><BrainCircuit size={24} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold text-gray-800">0</p><p className="text-sm text-gray-500">Total Questions</p></div>
        </div> */}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Subjects ({filteredSubjects.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSubjects.length > 0 ? filteredSubjects.map(subject => (
            <div key={subject.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-md text-sm">{subject.code}</div>
                <div>
                  <p className="font-semibold text-gray-800">{subject.name}</p>
                  <p className="text-sm text-gray-500">Click to manage PDFs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleNavigation(() => handleSubjectClick(subject))} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                  Upload PDFs
                </button>
                <button onClick={() => handleDeleteSubject(subject.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                  <Trash2 size={18} />
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

  const renderPdfUploader = () => {
    if (!selectedSubject) return null;
    
    const StatusTag: React.FC<{ status: PdfFile['status'] }> = ({ status }) => { 
      const styles = { 
        Uploading: 'bg-blue-100 text-blue-800', 
        Processing: 'bg-yellow-100 text-yellow-800', 
        Processed: 'bg-green-100 text-green-800',
        Failed: 'bg-red-100 text-red-800'
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
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefreshPdfs}
              disabled={isLoadingPdfs}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoadingPdfs ? 'animate-spin' : ''} /> 
              {isLoadingPdfs ? 'Refreshing...' : 'Refresh'}
            </button>
            <button onClick={() => handleNavigation(() => setSelectedSubject(null))} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <ArrowLeft size={16} /> Back to Subjects
            </button>
          </div>
        </div>

        {/* Loading/Error States */}
        {isLoadingPdfs && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-blue-600 animate-spin" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Loading PDFs...</h4>
                <p className="text-xs text-blue-700">Fetching documents from the server</p>
              </div>
            </div>
          </div>
        )}

        {pdfLoadError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-600" />
              <div>
                <h4 className="text-sm font-medium text-red-900">Error Loading PDFs</h4>
                <p className="text-xs text-red-700">{pdfLoadError}</p>
              </div>
            </div>
          </div>
        )}

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

            {/* API Status Indicator */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BrainCircuit size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-blue-900">API Integration Active</h4>
                  <p className="text-xs text-blue-700">Files will be uploaded to processing system at {API_BASE_URL}</p>
                </div>
              </div>
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
                    Showing {filteredPdfs.length} of {uploadedFiles.length} documents
                  </p>
                )}
              </div>


              {/* <div className="divide-y divide-gray-200">
                {filteredPdfs.length > 0 ? filteredPdfs.map(file => (
                  <div key={file.id} className="p-4 flex items-center gap-4">
                    <FileText className="h-7 w-7 text-red-500 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate" title={file.name}>{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                      {file.status === 'Failed' && file.errorMessage && (
                        <p className="text-xs text-red-600 mt-1" title={file.errorMessage}>
                          Error: {file.errorMessage.length > 50 ? `${file.errorMessage.substring(0, 50)}...` : file.errorMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <StatusTag status={file.status} />
                      {file.status === 'Processed' && file.url && file.url !== '#' && (
                        <a href={file.url} download={file.name} className="text-sm font-medium text-blue-600 hover:underline">
                          Download
                        </a>
                      )}
                      <button onClick={() => handleDeletePdf(file.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
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
              </div> */}



       <div className="divide-y divide-gray-200">
                {filteredPdfs.length > 0 ? filteredPdfs.map(file => (
                  <div key={file.id} className="p-4 flex items-center gap-4">
                    <FileText className="h-7 w-7 text-red-500 flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      {/* <p className="font-medium text-sm text-gray-900 truncate" title={file.name}>{file.name}</p> */}
                    <p className="font-medium text-sm text-gray-900 truncate" title={getDisplayName(file.name)}>
  {getDisplayName(file.name)}
</p>

                    
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                      {file.status === 'Failed' && file.errorMessage && (
                        <p className="text-xs text-red-600 mt-1" title={file.errorMessage}>
                          Error: {file.errorMessage.length > 50 ? `${file.errorMessage.substring(0, 50)}...` : file.errorMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <StatusTag status={file.status} />
                      {file.status === 'Processed' && file.url && file.url !== '#' && (
                        <a href={file.url} download={file.name} className="text-sm font-medium text-blue-600 hover:underline">
                          Download
                        </a>
                      )}
                      <button onClick={() => handleDeletePdf(file.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
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
                <li>Multiple files can be uploaded simultaneously</li>
                <li>Files are processed via API integration</li>
                <li>Upload status shows real-time API responses</li>
                <li>Failed uploads can be retried by re-uploading</li>
                <li>Files are stored on the server</li>
                <li>Click "Refresh" to sync with server data</li>
              </ul>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-800 mb-2">API Status</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connected to {API_BASE_URL}</span>
                </div>
              </div>
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
              <button onClick={addUniversity} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add University</button>
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
              <button onClick={addBranch} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">Add Branch</button>
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
              <button onClick={addSubject} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">Add Subject</button>
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


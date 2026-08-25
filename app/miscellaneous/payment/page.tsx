'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSignature, UploadCloud, FileText, Image as ImageIcon, CheckCircle, Loader2, Download, Receipt } from 'lucide-react';
import { PdfTeXEngine } from '@/lib/texEngine';

export default function PaymentVoucherPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    addone: '',
    addtwo: '',
    addthree: '',
    pan: '',
    purpose: 'WSDL 2026',
    accno: '',
    bankname: '',
    bankbranch: '',
    ifsc: '',
    swift: '',
  });

  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const [compiling, setCompiling] = useState(false);
  const [openingOverleaf, setOpeningOverleaf] = useState(false);
  const [resultPdfUrl, setResultPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignatureFile(e.target.files[0]);
    }
  };

  const readAsUint8Array = (file: File | Blob): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(new Uint8Array(reader.result));
        } else {
          reject(new Error("Failed to read file as ArrayBuffer"));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const fileToDataUri = (file: File | Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImageFile = async (file: File): Promise<{ data: Uint8Array, name: string, dataUri: string }> => {
    if (file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml') {
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width || 1024;
          canvas.height = img.height || 1024;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error("Canvas context failed"));
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url);
            if (!blob) return reject(new Error("Blob creation failed"));
            fileToDataUri(blob).then(dataUri => {
              blob.arrayBuffer().then(buffer => {
                const newName = file.name.replace(/\.svg$/i, '.png');
                resolve({ data: new Uint8Array(buffer), name: newName, dataUri });
              });
            });
          }, 'image/png');
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load SVG for conversion"));
        };
        img.src = url;
      });
    } else {
      const data = await readAsUint8Array(file);
      const dataUri = await fileToDataUri(file);
      return { data, name: file.name, dataUri };
    }
  };

  const fetchAsset = async (url: string): Promise<Uint8Array> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch asset: ${url}`);
    const blob = await res.blob();
    return readAsUint8Array(blob);
  };

  const fetchTextAsset = async (url: string): Promise<string> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch asset: ${url}`);
    return res.text();
  };

  const generateFinalTex = async (baseTex: string, sigFileName: string) => {
    let texCode = baseTex;
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      const regex = new RegExp(`\\\\newcommand{\\\\${key}}{.*}`);
      texCode = texCode.replace(regex, `\\newcommand{\\${key}}{${value}}`);
    });
    texCode = texCode.replace('example-image-a', sigFileName);
    return texCode;
  };

  const handleCompile = async () => {
    if (!signatureFile) {
      setError("Please upload your signature.");
      return;
    }

    setCompiling(true);
    setError(null);
    setResultPdfUrl(null);

    try {
      const engine = new PdfTeXEngine();
      await engine.loadEngine();

      const baseTex = await fetchTextAsset('/texparser/paymentvoucher.tex');
      const logoData = await fetchAsset('/texparser/logoaccounts.png');
      engine.writeMemFSFile('logoaccounts.png', logoData);

      const { data: sigData, name: sigFileName } = await processImageFile(signatureFile);
      engine.writeMemFSFile(sigFileName, sigData);

      const texCode = await generateFinalTex(baseTex, sigFileName);
      engine.writeMemFSFile('paymentvoucher_final.tex', texCode);
      engine.setEngineMainFile('paymentvoucher_final.tex');

      const result = await engine.compileLaTeX();

      if (result.status === 0 && result.pdf) {
        const blob = new Blob([result.pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResultPdfUrl(url);
      } else {
        setError("Compilation failed. Check console log for details.");
        console.error(result.log);
      }

      engine.closeWorker();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during compilation.");
      console.error(err);
    } finally {
      setCompiling(false);
    }
  };

  const handleOverleaf = async () => {
    if (!signatureFile) {
      setError("Please upload your signature.");
      return;
    }
    
    setOpeningOverleaf(true);
    setError(null);

    try {
      const baseTex = await fetchTextAsset('/texparser/paymentvoucher.tex');
      const { name: sigFileName, dataUri: sigDataUri } = await processImageFile(signatureFile);
      const texCode = await generateFinalTex(baseTex, sigFileName);

      const texDataUri = "data:application/x-tex;base64," + btoa(unescape(encodeURIComponent(texCode)));

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.overleaf.com/docs';
      form.target = '_blank';

      const appendInput = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      appendInput('snip_uri[]', texDataUri);
      appendInput('snip_name[]', 'main.tex');

      appendInput('snip_uri[]', `${window.location.origin}/texparser/logoaccounts.png`);
      appendInput('snip_name[]', 'logoaccounts.png');

      appendInput('snip_uri[]', sigDataUri);
      appendInput('snip_name[]', sigFileName);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (err: any) {
      setError(err?.message || "Failed to open in Overleaf. Check console for details.");
      console.error(err);
    } finally {
      setOpeningOverleaf(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Receipt className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Payment Voucher Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill out the form below and upload your signature to generate your payment voucher.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Form Fields */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Line 1</label>
                  <input type="text" name="addone" value={formData.addone} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Line 2</label>
                  <input type="text" name="addtwo" value={formData.addtwo} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Line 3</label>
                  <input type="text" name="addthree" value={formData.addthree} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PAN Number</label>
                    <input type="text" name="pan" value={formData.pan} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purpose</label>
                    <input type="text" name="purpose" placeholder="WSDL 2026" value={formData.purpose} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bank Details, Upload & Action */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Bank Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Number</label>
                  <input type="text" name="accno" value={formData.accno} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bank Name</label>
                  <input type="text" name="bankname" value={formData.bankname} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bank Branch</label>
                  <input type="text" name="bankbranch" value={formData.bankbranch} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IFSC Code</label>
                    <input type="text" name="ifsc" value={formData.ifsc} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SWIFT Code</label>
                    <input type="text" name="swift" value={formData.swift} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <UploadCloud className="w-5 h-5 mr-2 text-blue-500" />
                Signature Upload
              </h2>
              <div
                onClick={() => signatureInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <div className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors
                  ${signatureFile ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'}`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    ref={signatureInputRef}
                    onChange={handleSignatureUpload}
                    className="hidden"
                  />
                  {signatureFile ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                        {signatureFile.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                        Select Signature Image
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Action and Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center min-h-[12rem]"
            >
              {error && (
                <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {resultPdfUrl ? (
                <div className="w-full flex flex-col items-center space-y-4">
                  <div className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Compilation Successful
                  </div>
                  
                  <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner bg-gray-100 dark:bg-gray-800">
                    <iframe
                      src={`${resultPdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      className="w-full h-full"
                      title="PDF Preview"
                    />
                  </div>

                  <a
                    href={resultPdfUrl}
                    download="payment_voucher.pdf"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </a>

                  <button
                    onClick={() => setResultPdfUrl(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline mt-4"
                  >
                    Generate Another
                  </button>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <button
                    onClick={handleCompile}
                    disabled={compiling || openingOverleaf || !signatureFile}
                    className={`w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md flex items-center justify-center space-x-3
                      ${(compiling || openingOverleaf || !signatureFile)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-[1.02]'}`}
                  >
                    {compiling ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Compiling LaTeX...</span>
                      </>
                    ) : (
                      <>
                        <FileSignature className="w-6 h-6" />
                        <span>Generate Voucher</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleOverleaf}
                    disabled={compiling || openingOverleaf || !signatureFile}
                    className={`w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md flex items-center justify-center space-x-3
                      ${(compiling || openingOverleaf || !signatureFile)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#47a141] hover:bg-[#3d8a38] hover:shadow-xl hover:scale-[1.02]'}`}
                  >
                    {openingOverleaf ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Opening in Overleaf...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M11 20.3c-.6 0-1.1-.3-1.4-.7L4.7 13.1c-.6-.8-.5-1.9.3-2.5.8-.6 1.9-.5 2.5.3l3.6 4.7V3.5c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8v12l3.6-4.7c.6-.8 1.7-.9 2.5-.3.8.6.9 1.7.3 2.5l-4.9 6.5c-.3.4-.8.7-1.4.7z" opacity="0.3"/>
                          <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm0-18C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/>
                        </svg>
                        <span>Open in Overleaf</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

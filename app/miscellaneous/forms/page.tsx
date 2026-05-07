'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileSignature, UploadCloud, FileText, Image as ImageIcon, CheckCircle, Loader2, Download } from 'lucide-react';
import { PdfTeXEngine } from '@/lib/texEngine';

export default function FormsPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Logo parameters
  const [xshift, setXshift] = useState('5mm');
  const [width, setWidth] = useState('5cm');
  const [angle, setAngle] = useState('90');

  // Stamp parameters
  const [rotate, setRotate] = useState('8');
  const [opacity, setOpacity] = useState('0.8');
  const [colorR, setColorR] = useState('34');
  const [colorG, setColorG] = useState('150');
  const [colorB, setColorB] = useState('45');
  const [fontSize, setFontSize] = useState('55');
  const [baselineSkip, setBaselineSkip] = useState('70');

  const [compiling, setCompiling] = useState(false);
  const [resultPdfUrl, setResultPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const generateTexCode = () => {
    return `\\documentclass{article}

\\usepackage{pdfpages}      
\\usepackage{tikz}          
\\usepackage{graphicx}      
\\usetikzlibrary{decorations.pathmorphing} 
\\begin{document}
\\thispagestyle{empty}

\\includepdf[
  pages=1,                 
  fitpaper=true,           
  pagecommand={%
    \\begin{tikzpicture}[remember picture, overlay]
      \\node[anchor=west, inner sep=0pt]
        at ([xshift=${xshift}] current page.west)
        {\\includegraphics[width=${width}, angle=${angle}]{logo.png}};
      \\node[rotate=${rotate}, opacity=${opacity}] at (current page.center) {%
        \\begin{tikzpicture}
          \\definecolor{stampgreen}{RGB}{${colorR},${colorG},${colorB}}
          \\draw[stampgreen, line width=2.4pt,
                decorate,
                decoration={random steps, segment length=3pt, amplitude=0.5pt}]
                (-5.2,-1.4) rectangle (5.2,1.4);
          \\draw[stampgreen, line width=0.9pt,
                decorate,
                decoration={random steps, segment length=3pt, amplitude=0.5pt}]
                (-5.0,-1.2) rectangle (5.0,1.2);
          \\node[stampgreen] at (0,0)
            {\\fontfamily{phv}\\fontseries{b}\\fontsize{${fontSize}}{${baselineSkip}}\\selectfont ACCEPTED};
        \\end{tikzpicture}
      };
    \\end{tikzpicture}
  }
]{mydoc.pdf}

\\end{document}`;
  };

  const readAsUint8Array = (file: File): Promise<Uint8Array> => {
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

  const handleCompile = async () => {
    if (!pdfFile || !logoFile) {
      setError("Please upload both a PDF and a Logo image.");
      return;
    }

    setCompiling(true);
    setError(null);
    setResultPdfUrl(null);

    try {
      const engine = new PdfTeXEngine();
      await engine.loadEngine();

      const pdfData = await readAsUint8Array(pdfFile);
      const logoData = await readAsUint8Array(logoFile);

      engine.writeMemFSFile('mydoc.pdf', pdfData);
      engine.writeMemFSFile('logo.png', logoData);

      const texCode = generateTexCode();
      engine.writeMemFSFile('papdis.tex', texCode);
      engine.setEngineMainFile('papdis.tex');

      // First compilation pass to generate .aux file for TikZ overlay coordinates
      await engine.compileLaTeX();

      // Second compilation pass to correctly place the TikZ overlays
      const result = await engine.compileLaTeX();

      if (result.status === 0 && result.pdf) {
        const blob = new Blob([result.pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResultPdfUrl(url);
      } else {
        setError("Compilation failed. Check inputs or console log.");
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

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-12 text-center"
        >
          <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileSignature className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            PDF Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload your academic paper and logo to generate an accepted manuscript PDF with custom stamps and placements.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column: Uploads and Parameters */}
          <div className="space-y-6">

            {/* File Uploads */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <UploadCloud className="w-5 h-5 mr-2 text-blue-500" />
                Upload Assets
              </h2>

              <div className="space-y-4">
                <div
                  onClick={() => pdfInputRef.current?.click()}
                  className="relative group cursor-pointer"
                >
                  <div className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors
                    ${pdfFile ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'}`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      ref={pdfInputRef}
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                    {pdfFile ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                          {pdfFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                          Select Academic PDF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="relative group cursor-pointer"
                >
                  <div className={`p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors
                    ${logoFile ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500'}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={logoInputRef}
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    {logoFile ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                          {logoFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors">
                          Select Logo Image
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Logo Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Logo Tweak Settings
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">X-Shift</label>
                  <input
                    type="text"
                    value={xshift}
                    onChange={(e) => setXshift(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Angle</label>
                  <input
                    type="text"
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stamp Settings and Actions */}
          <div className="space-y-6">

            {/* Stamp Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Stamp Settings
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rotation Angle</label>
                  <input
                    type="text"
                    value={rotate}
                    onChange={(e) => setRotate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity (0-1)</label>
                  <input
                    type="text"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stamp Color (RGB)</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="R"
                      value={colorR}
                      onChange={(e) => setColorR(e.target.value)}
                      className="w-1/3 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none transition-shadow"
                    />
                    <input
                      type="text"
                      placeholder="G"
                      value={colorG}
                      onChange={(e) => setColorG(e.target.value)}
                      className="w-1/3 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition-shadow"
                    />
                    <input
                      type="text"
                      placeholder="B"
                      value={colorB}
                      onChange={(e) => setColorB(e.target.value)}
                      className="w-1/3 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
                  <input
                    type="text"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Baseline Skip</label>
                  <input
                    type="text"
                    value={baselineSkip}
                    onChange={(e) => setBaselineSkip(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
              </div>
            </motion.div>

            {/* Action and Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center h-48"
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
                  <a
                    href={resultPdfUrl}
                    download="accepted_manuscript.pdf"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    onClick={() => setResultPdfUrl(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Generate Another
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleCompile}
                  disabled={compiling || !pdfFile || !logoFile}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md flex items-center justify-center space-x-3
                    ${(compiling || !pdfFile || !logoFile)
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
                      <span>Generate PDF</span>
                    </>
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

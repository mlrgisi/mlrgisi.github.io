'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Database, 
  Code, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  BookOpen,
  FileText,
  Lightbulb,
  Cpu
} from 'lucide-react';

interface Neuron {
  id: number;
  x: number;
  y: number;
  active: boolean;
};

interface Connection {
  from: number;
  to: number;
  strength: number;
};

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string>('neural-network');
  const [isAnimating, setIsAnimating] = useState(true);

  // Neural Network Animation State
  const [neurons, setNeurons] = useState<Array<{id: number, x: number, y: number, active: boolean}>>([]);
  const [connections, setConnections] = useState<Array<{from: number, to: number, strength: number}>>([]);

  // Data Flow Animation State
  const [dataPoints, setDataPoints] = useState<Array<{id: number, x: number, y: number, progress: number}>>([]);

  // Initialize neural network
  useEffect(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    
    // Create layers
    const layers = [4, 6, 6, 3]; // Input, Hidden1, Hidden2, Output
    let neuronId = 0;
    
    layers.forEach((layerSize, layerIndex) => {
      for (let i = 0; i < layerSize; i++) {
        newNeurons.push({
          id: neuronId++,
          x: (layerIndex + 1) * 150,
          y: 100 + (i * 60) + (6 - layerSize) * 15,
          active: false
        });
      }
    });

    // Create connections between layers
    let currentNeuron = 0;
    layers.forEach((layerSize, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const nextLayerStart = currentNeuron + layerSize;
        const nextLayerSize = layers[layerIndex + 1];
        
        for (let i = 0; i < layerSize; i++) {
          for (let j = 0; j < nextLayerSize; j++) {
            newConnections.push({
              from: currentNeuron + i,
              to: nextLayerStart + j,
              strength: Math.random()
            });
          }
        }
      }
      currentNeuron += layerSize;
    });

    setNeurons(newNeurons);
    setConnections(newConnections);
  }, []);

  // Animate neural network
  useEffect(() => {
    if (!isAnimating || activeDemo !== 'neural-network') return;

    const interval = setInterval(() => {
      setNeurons(prev => prev.map(neuron => ({
        ...neuron,
        active: Math.random() > 0.7
      })));
    }, 800);

    return () => clearInterval(interval);
  }, [isAnimating, activeDemo]);

  // Initialize and animate data flow
  useEffect(() => {
    if (activeDemo !== 'data-flow') return;

    const newDataPoints = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 600,
      y: Math.random() * 400,
      progress: Math.random()
    }));
    setDataPoints(newDataPoints);

    if (!isAnimating) return;

    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(point => ({
        ...point,
        progress: (point.progress + 0.02) % 1,
        x: point.x + Math.sin(point.progress * Math.PI * 2) * 2,
        y: point.y + Math.cos(point.progress * Math.PI * 2) * 1
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating, activeDemo]);

  const demos = [
    {
      id: 'neural-network',
      title: 'Neural Network Visualization',
      description: 'Interactive visualization of a deep neural network with animated neuron activations',
      icon: Brain,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'data-flow',
      title: 'Data Processing Pipeline',
      description: 'Animated representation of data flowing through ML processing stages',
      icon: Database,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'algorithm',
      title: 'Algorithm Convergence',
      description: 'Visualization of gradient descent and optimization algorithms',
      icon: Zap,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'code-execution',
      title: 'Code Execution Flow',
      description: 'Step-by-step visualization of machine learning code execution',
      icon: Code,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const NeuralNetworkDemo = () => (
    <div className="relative w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Render connections */}
        {connections.map((conn, index) => {
          const fromNeuron = neurons[conn.from];
          const toNeuron = neurons[conn.to];
          if (!fromNeuron || !toNeuron) return null;
          
          return (
            <motion.line
              key={index}
              x1={fromNeuron.x}
              y1={fromNeuron.y}
              x2={toNeuron.x}
              y2={toNeuron.y}
              stroke={fromNeuron.active ? '#3B82F6' : '#E5E7EB'}
              strokeWidth={fromNeuron.active ? 2 : 1}
              opacity={conn.strength}
              animate={{
                stroke: fromNeuron.active ? '#3B82F6' : '#E5E7EB',
                strokeWidth: fromNeuron.active ? 2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}
        
        {/* Render neurons */}
        {neurons.map((neuron) => (
          <motion.circle
            key={neuron.id}
            cx={neuron.x}
            cy={neuron.y}
            r={12}
            fill={neuron.active ? '#3B82F6' : '#9CA3AF'}
            animate={{
              fill: neuron.active ? '#3B82F6' : '#9CA3AF',
              scale: neuron.active ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </svg>
      
      {/* Layer labels */}
      <div className="absolute bottom-4 left-4 flex space-x-20 text-sm text-gray-600 dark:text-gray-400">
        <span>Input</span>
        <span>Hidden 1</span>
        <span>Hidden 2</span>
        <span>Output</span>
      </div>
    </div>
  );

  const DataFlowDemo = () => (
    <div className="relative w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Processing stages */}
        {['Input', 'Preprocessing', 'Feature Extraction', 'Model', 'Output'].map((stage, index) => (
          <g key={stage}>
            <rect
              x={index * 120 + 50}
              y={150}
              width={80}
              height={60}
              fill="#E5E7EB"
              stroke="#9CA3AF"
              rx={8}
            />
            <text
              x={index * 120 + 90}
              y={185}
              textAnchor="middle"
              className="text-xs fill-gray-700 dark:fill-gray-300"
            >
              {stage}
            </text>
          </g>
        ))}
        
        {/* Animated data points */}
        {dataPoints.map((point) => (
          <motion.circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r={4}
            fill="#3B82F6"
            animate={{
              cx: point.x,
              cy: point.y,
              opacity: Math.sin(point.progress * Math.PI * 2) * 0.5 + 0.5
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </svg>
    </div>
  );

  const AlgorithmDemo = () => {
    const [iteration, setIteration] = useState(0);
    const [convergencePoints, setConvergencePoints] = useState<Array<{x: number, y: number}>>([]);

    useEffect(() => {
      if (!isAnimating || activeDemo !== 'algorithm') return;

      const interval = setInterval(() => {
        setIteration(prev => prev + 1);
        setConvergencePoints(prev => {
          const newPoint = {
            x: 300 + Math.cos(prev.length * 0.1) * (100 - prev.length * 2),
            y: 200 + Math.sin(prev.length * 0.1) * (100 - prev.length * 2)
          };
          return [...prev.slice(-20), newPoint];
        });
      }, 200);

      return () => clearInterval(interval);
    }, [isAnimating, activeDemo]);

    return (
      <div className="relative w-full h-96 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Contour lines */}
          {[50, 100, 150, 200].map((radius) => (
            <circle
              key={radius}
              cx={300}
              cy={200}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={1}
              opacity={0.5}
            />
          ))}
          
          {/* Convergence path */}
          {convergencePoints.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === convergencePoints.length - 1 ? 8 : 4}
              fill={index === convergencePoints.length - 1 ? '#EF4444' : '#3B82F6'}
              opacity={0.7 + (index / convergencePoints.length) * 0.3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
          
          {/* Path lines */}
          {convergencePoints.slice(1).map((point, index) => (
            <line
              key={index}
              x1={convergencePoints[index].x}
              y1={convergencePoints[index].y}
              x2={point.x}
              y2={point.y}
              stroke="#3B82F6"
              strokeWidth={2}
              opacity={0.6}
            />
          ))}
          
          {/* Global minimum */}
          <circle cx={300} cy={200} r={6} fill="#10B981" />
          <text x={310} y={205} className="text-xs fill-gray-700 dark:fill-gray-300">
            Global Minimum
          </text>
        </svg>
        
        <div className="absolute top-4 left-4 text-sm text-gray-600 dark:text-gray-400">
          Iteration: {iteration}
        </div>
      </div>
    );
  };

  const CodeExecutionDemo = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const codeLines = [
      'import numpy as np',
      'from sklearn.model_selection import train_test_split',
      'X_train, X_test, y_train, y_test = train_test_split(X, y)',
      'model = NeuralNetwork(layers=[784, 128, 64, 10])',
      'model.compile(optimizer="adam", loss="categorical_crossentropy")',
      'model.fit(X_train, y_train, epochs=100)',
      'predictions = model.predict(X_test)',
      'accuracy = accuracy_score(y_test, predictions)'
    ];

    useEffect(() => {
      if (!isAnimating || activeDemo !== 'code-execution') return;

      const interval = setInterval(() => {
        setCurrentLine(prev => (prev + 1) % codeLines.length);
      }, 1000);

      return () => clearInterval(interval);
    }, [isAnimating, activeDemo]);

    return (
      <div className="relative w-full h-96 bg-gray-900 rounded-xl overflow-hidden p-4">
        <div className="font-mono text-sm">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              className={`py-1 px-2 rounded ${
                index === currentLine 
                  ? 'bg-blue-600 text-white' 
                  : index < currentLine 
                    ? 'text-green-400' 
                    : 'text-gray-500'
              }`}
              animate={{
                backgroundColor: index === currentLine ? '#2563EB' : 'transparent',
                color: index === currentLine ? '#FFFFFF' : index < currentLine ? '#10B981' : '#6B7280'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-400 mr-4">{String(index + 1).padStart(2, '0')}</span>
              {line}
            </motion.div>
          ))}
        </div>
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
          Executing line {currentLine + 1} of {codeLines.length}
        </div>
      </div>
    );
  };

  const renderDemo = () => {
    switch (activeDemo) {
      case 'neural-network':
        return <NeuralNetworkDemo />;
      case 'data-flow':
        return <DataFlowDemo />;
      case 'algorithm':
        return <AlgorithmDemo />;
      case 'code-execution':
        return <CodeExecutionDemo />;
      default:
        return <NeuralNetworkDemo />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Lightbulb className="w-12 h-12 text-yellow-500" />
              <h1 className="text-5xl md:text-6xl font-bold text-gradient">
                Interactive Demos
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore interactive visualizations of machine learning concepts, algorithms, and data processing pipelines
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {demos.map((demo, index) => (
              <motion.button
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveDemo(demo.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  activeDemo === demo.id
                    ? 'bg-gradient-to-r ' + demo.color + ' text-white shadow-lg scale-105'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <demo.icon className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-bold mb-2">{demo.title}</h3>
                <p className={`text-sm ${
                  activeDemo === demo.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {demo.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Visualization */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {demos.find(d => d.id === activeDemo)?.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAnimating(!isAnimating)}
                    className={`p-2 rounded-lg transition-colors ${
                      isAnimating 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Reset demo state
                      setNeurons(prev => prev.map(n => ({ ...n, active: false })));
                      setDataPoints([]);
                    }}
                    className="p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Cpu className="w-4 h-4" />
                <span>Real-time Visualization</span>
              </div>
            </div>

            {/* Demo Container */}
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="research-card p-8 rounded-2xl"
            >
              {renderDemo()}
            </motion.div>

            {/* Demo Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                About This Demo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {demos.find(d => d.id === activeDemo)?.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
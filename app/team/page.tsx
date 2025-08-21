'use client';


import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, BookOpen, Award, Mail, Linkedin, Info, ChevronLeft, Github, LibraryIcon, TrendingUp } from 'lucide-react';

import { teamMembers, TeamMember } from '@/lib/team-data';
import { fetchDblpCounts, constructDblpQuery, DblpCounts } from '@/lib/dblp-api';
import { useLastUpdated } from '@/components/LastUpdatedContext';
import { CgProfile } from "react-icons/cg";

interface TeamMemberState {
  isLoadingDblp: boolean;
  dblpCounts: DblpCounts | null;
  showSidePanel: boolean;
  totalPaperCount: number | null;
  hasClickedFetch: boolean;
}


export default function TeamPage() {
  const { setLastUpdated } = useLastUpdated();

  // Initialize states for all members immediately
  const initialStates: Record<string, TeamMemberState> = {};
  teamMembers.forEach(member => {
    initialStates[member.id] = {
      isLoadingDblp: false,
      dblpCounts: null,
      showSidePanel: false,
      totalPaperCount: null,
      hasClickedFetch: false
    };
  });
  
  const [memberStates, setMemberStates] = useState<Record<string, TeamMemberState>>(initialStates);
  
  useEffect(() => {
    setLastUpdated('2025-07-15');
  }, [setLastUpdated]);

  // Auto-fetch for Principal Investigator
  useEffect(() => {
  const principalInvestigator = teamMembers.find(member => member.role === 'professor');
    if (principalInvestigator && principalInvestigator.dblpName) {
      fetchMemberDblpData(principalInvestigator.id, principalInvestigator.dblpName, true);
    }
  }, [setLastUpdated]);

  const fetchMemberDblpData = async (memberId: string, dblpName: string, isPrincipalInvestigator: boolean = false) => {
    setMemberStates(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        isLoadingDblp: true,
        hasClickedFetch: true
      }
    }));

    try {
      const query = constructDblpQuery(dblpName, isPrincipalInvestigator);
      const dblpCounts = await fetchDblpCounts(query);
      const member = teamMembers.find(m => m.id === memberId);
      const biasCount = member?.biasCount || 0;
      const totalCount = dblpCounts.total + biasCount;

      setMemberStates(prev => ({
        ...prev,
        [memberId]: {
          ...prev[memberId],
          isLoadingDblp: false,
          dblpCounts,
          totalPaperCount: totalCount
        }
      }));
    } catch (error) {
      console.error('Failed to fetch DBLP data:', error);
      setMemberStates(prev => ({
        ...prev,
        [memberId]: {
          ...prev[memberId],
          isLoadingDblp: false,
          dblpCounts: null,
          totalPaperCount: 0
        }
      }));
    }
  };

  const handlePaperCountClick = (member: TeamMember) => {
    if (!member.dblpName || memberStates[member.id]?.hasClickedFetch) return;
    fetchMemberDblpData(member.id, member.dblpName, member.role === 'professor');
  };

  const toggleSidePanel = (memberId: string) => {
    setMemberStates(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        showSidePanel: !prev[memberId]?.showSidePanel
      }
    }));
  };

  const handleClickOutside = (memberId: string) => {
    setMemberStates(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        showSidePanel: false
      }
    }));
  };

  const professor = teamMembers.find(member => member.role === 'professor');
  const currentMembers = teamMembers.filter(member => ['jrf', 'srf'].includes(member.role));
  const alumni = teamMembers.filter(member => ['alumni', 'adjunct'].includes(member.role));


  const getRoleColor = (role: string) => {
    switch (role) {
      case 'professor': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'srf': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'jrf': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'alumni': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case 'adjunct': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const FlippingBookLoader = () => (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-6">
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded-sm"
          animate={{
            rotateY: [0, 180, 0],
            scaleX: [1, 0.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 bg-blue-600 rounded-sm"
          animate={{
            rotateY: [180, 0, 180],
            scaleX: [0.1, 1, 0.1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
   
  const TeamMemberCard = ({ member, featured = false }: { member: TeamMember; featured?: boolean }) => {
    const memberState = memberStates[member.id];
    const sidePanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutsidePanel = (event: MouseEvent) => {
        if (sidePanelRef.current && !sidePanelRef.current.contains(event.target as Node)) {
          if (memberState?.showSidePanel) {
            handleClickOutside(member.id);
          }
        }
      };

      if (memberState?.showSidePanel) {
        document.addEventListener('mousedown', handleClickOutsidePanel);
        return () => document.removeEventListener('mousedown', handleClickOutsidePanel);
      }
    }, [memberState?.showSidePanel, member.id]);

    const shouldShowPaperBlock = () => {
      if (!memberState?.hasClickedFetch) return true;
      if (memberState.totalPaperCount === null) return true;
      return memberState.totalPaperCount > 0;
    };

    const renderPaperCountBlock = () => {
      if (!shouldShowPaperBlock()) return null;

      const isLoading = memberState?.isLoadingDblp;
      const hasData = memberState?.totalPaperCount !== null;
      const showSidePanel = memberState?.showSidePanel;

      return (
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <FlippingBookLoader />
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">Loading...</span>
              </motion.div>
            ) : showSidePanel && memberState?.dblpCounts ? (
              <motion.div
                key="sidepanel"
                ref={sidePanelRef}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="absolute inset-0 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-1 h-full text-xs">
                  <div className="text-center">
                    <div className="font-bold text-blue-500">{memberState.dblpCounts.journal}</div>
                    <div className="text-gray-600 dark:text-gray-400">Journal</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-500">{memberState.dblpCounts.conference}</div>
                    <div className="text-gray-600 dark:text-gray-400">Conf</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-500">{memberState.dblpCounts.preprint}</div>
                    <div className="text-gray-600 dark:text-gray-400">Preprint</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-500">{memberState.dblpCounts.other + (member.biasCount || 0)}</div>
                    <div className="text-gray-600 dark:text-gray-400">Other</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={hasData ? { y: 20, opacity: 0 } : { opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative"
              >
                <div className="flex items-center justify-center mb-1 relative">
                  <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                  <span 
                    className={`text-2xl font-bold text-gray-800 dark:text-gray-200 cursor-pointer ${
                      !memberState?.hasClickedFetch && member.dblpName ? 'filter blur-sm hover:blur-none transition-all' : ''
                    }`}
                    onClick={() => handlePaperCountClick(member)}
                  >
                    {hasData ? memberState.totalPaperCount : member.paperCount}
                  </span>
                  
                  {!memberState?.hasClickedFetch && member.dblpName && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute -top-1 -right-1 cursor-pointer"
                      onClick={() => handlePaperCountClick(member)}
                    >
                      <Info className="w-3 h-3 text-blue-500" />
                    </motion.div>
                  )}
                  
                  {hasData && memberState.totalPaperCount! > 0 && !showSidePanel && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSidePanel(member.id)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2"
                    >
                      <ChevronLeft className="w-3 h-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
                    </motion.button>
                  )}
                </div>
                
                {!memberState?.hasClickedFetch && member.dblpName && (
                  <div className="text-xs text-blue-500 cursor-pointer" onClick={() => handlePaperCountClick(member)}>
                    Click to fetch count from DBLP
                  </div>
                )}
                
                {memberState?.hasClickedFetch && !isLoading && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">Papers</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`team-card p-6 rounded-2xl ${featured ? 'lg:col-span-2' : ''}`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            {(member.image && (
            <img
              src={member.image.src}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            )) || (
            <CgProfile
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            )}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
              {member.role.toUpperCase()}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            {member.name}
          </h3>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {member.title}
          </p>

          {member.remark && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50">
                ✨ {member.remark}
              </span>
            </div>
          )}

          {member.bio && (
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {member.bio}
          </p>
          )}

          {/* Research Areas */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {member.researchAreas.map((area) => (
              <span
                key={area}
                className="research-tag px-3 py-1 rounded-full text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className={`grid gap-4 mb-6 w-full ${shouldShowPaperBlock() ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {renderPaperCountBlock()}
            
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {new Date(member.joiningDate).getFullYear()}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Joined</span>
            </div>

            {member.citations && (
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {member.citations}<sup>+</sup>
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Citations</span>
              </div>
            )}
          </div> 
          {/* </div><div className="flex items-center justify-center gap-4 mb-6 w-full">
          <div className="flex gap-4 mb-6"> 
            {member.paperCount && (
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <BookOpen className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {member.paperCount}<sup>+</sup>
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Papers</span>
            </div>
            )}
            {member.paperCount && (
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {new Date(member.joiningDate).getFullYear()}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Joined</span>
              </div>
            )}
            {!member.paperCount && (
              <div className="col-span-2 text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {new Date(member.joiningDate).getFullYear()}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Joined</span>
              </div>
            )}
            {member.citations && (
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {member.citations}<sup>+</sup>
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Citations</span>
              </div>
            )}
          </div>*/}

          {/* Social Links */}
          <div className="flex space-x-3">
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                target='_blank'
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            )}
            {member.website && (
              <motion.a
                href={member.website}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                target='_blank'
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {member.linkedin && (
              <motion.a
                href={member.linkedin}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                target='_blank'
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}
            {member.github && (
              <motion.a
                href={member.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                target='_blank'
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {member.scholar && (
              <motion.a
                href={member.scholar}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                target='_blank'
              >
                <LibraryIcon className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
      );
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Our Research Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Meet the brilliant minds driving innovation in machine learning, deep learning, and high-dimensional statistics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principal Investigator */}
      {professor && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gradient">
                Principal Adviser
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Leading our research vision and scientific direction
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <TeamMemberCard member={professor} featured />
            </div>
          </div>
        </section>
      )}

      {/* Current Team Members */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Research Fellows
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
               
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Alumni & Adjunct Members
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Former members who continue to make impact in the field
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {alumni.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

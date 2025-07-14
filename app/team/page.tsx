'use client';


import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, BookOpen, Award, Mail, Linkedin, Github, LibraryIcon } from 'lucide-react';
import Anish from '../../public/anish.png';
import Faizan from '../../public/faizan.png';
import Kushal from '../../public/kushal.png';
import Priyo from '../../public/priyobrata.png';
import Arghya from '../../public/arghya.png';
import Bhaskar from '../../public/bhaskar.png';
import Aniruddha from '../../public/aniruddha.png';
import Blank from '../../public/blank.jpeg';
import Susmita from '../../public/susmita.png';
import Indronil from '../../public/Indronil.png';
import Debolina from '../../public/debolina.png';
import Saptarshi from '../../public/saptarshi.png';
import Avisek from '../../public/Avisek.png';
import Shounak from '../../public/shounak.png';
import Abhishek from '../../public/abhishek.png';
import Sankha from '../../public/sankha.png';
import Swagatam from '../../public/swagatam.png';
import Arka from '../../public/Arka.jpeg';
import Shinjon from '../../public/shinjon.jpeg';
import Sandipan from '../../public/sandipan.png';
import Arkajyoti from '../../public/arkajyoti.jpg';
import Imon from '../../public/imon.jpeg';
import Sayantan from '../../public/sayantan.jpeg';
import Srinjoy from '../../public/srinjoy.jpg';
import Anal from '../../public/anal.jpeg';
import Arkaprabha from '../../public/arkaprabha.jpeg';
import { useLastUpdated } from '@/components/LastUpdatedContext';
import { CgProfile } from "react-icons/cg";






interface TeamMember {
  id: string;
  name: string;
  role: 'professor' | 'jrf' | 'srf' | 'alumni' | 'adjunct';
  title: string;
  remark?: string;
  image?: any;
  researchAreas: string[];
  joiningDate: string;
  paperCount?: number;
  website?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  bio?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Swagatam Das',
    role: 'professor',
    title: 'Principal Investigator & Lab Supervisor',
    image: Swagatam,
    researchAreas: ['Artificial Intelligence', 'Metaheuristics', 'Differential Evolution', 'Swarm Intelligence', 'Machine Learning'],
    joiningDate: '2011-08-01',
    paperCount: 604,
    website: 'http://www.isical.ac.in/~swagatam.das/',
    email: 'swagatam.das@isical.ac.in',
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=L8XYpAwAAAAJ&view_op=list_works&sortby=pubdate',
    bio: ' Professor-in-Charge (2024 – 26) Computer and Communication Sciences Division, ISI ',
  },
  {
    id: '2',
    name: 'Anish Chakrabarty',
    role: 'srf',
    title: 'SMU, PhD-Stat',
    remark: "Thesis Submitted",
    image: Anish,
    researchAreas: ['Deep Learning', 'High-dimensional Statistics'],
    joiningDate: '2019-01-15',
    paperCount: 10,
    scholar: 'https://scholar.google.com/citations?hl=en&user=KfCQY5oAAAAJ&view_op=list_works&sortby=pubdate',
    email: 'chakrabarty.anish@gmail.com?subject=[FromMLRGSite]',
    bio: 'Loading...',
  },
  {
    id: '3',
    name: 'Faizanuddin Ansari',
    role: 'srf',
    title: 'ECSU, PhD-CS',
    remark: "Thesis Submitted",
    image: Faizan,
    researchAreas: ['Long Tailed Imbalance', 'Meta Learning', 'AI for Health', 'Fairness', 'LLM'],
    joiningDate: '2019-09-01',
    paperCount: 7,
    email: 'faizanuddin_r@isical.ac.in?subject=[FromMLRGSite]',
    website: 'https://www.isical.ac.in/~faizanuddin_r/',
    github: 'https://github.com/ziaf/',
    linkedin: 'https://in.linkedin.com/in/faizanuddinansari',
    scholar: 'https://orcid.org/0009-0009-5517-8846',
    bio: "Most real-world datasets are far from ideal—they're imbalanced, biased, or simply too small to learn from effectively — and that's exactly where he comes in.",
  },
  {
    id: '4',
    name: 'Kushal Bose',
    role: 'srf',
    title: 'ECSU, PhD-CS',
    remark: "Thesis Submitted",
    image: Kushal,
    researchAreas: ['Geometric Deep Learning','Non-Euclidean Spaces'],
    joiningDate: '2019-01-10',
    paperCount: 9,
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=CifdghYAAAAJ&view_op=list_works&sortby=pubdate',
    linkedin: 'https://in.linkedin.com/in/kushal-bose-5405aa128',
    // instagram: 'https://www.instagram.com/kushalbose92/',
    bio: 'Loading...',
  },
  {
    id: '5',
    name: 'Indranil Ojha',
    role: 'srf',
    title: 'ECSU, PhD-CS',
    image: Indronil,
    researchAreas: ['Machine Learning'],
    joiningDate: '2019-01-10',
    scholar: 'https://scholar.google.com/citations?hl=en&user=TwUA3XIAAAAJ&view_op=list_works&sortby=pubdate',
    linkedin: 'https://in.linkedin.com/in/indranil-ojha-9934282',
    bio: 'Loading...',
  },
  {
    id: '6',
    name: 'Priyobrata Mondal',
    role: 'srf',
    title: 'ECSU, PhD-CS',
    image: Priyo,
    researchAreas: ['Imbalance', 'LongTailed Imbalance', 'Data Irregularity',  'Generative Modeling'],
    joiningDate: '2020-01-10',
    paperCount: 2,
    scholar: 'https://scholar.google.com/citations?hl=en&user=6SgZZG4AAAAJ&view_op=list_works&sortby=pubdate',
    email: 'priyobrata.mondal10@gmail.com?subject=[FromMLRGSite]',
    bio: 'Loading...',
  },
  {
    id: '7',
    name: 'Srinjoy Roy',
    role: 'srf',
    title: 'IAI, PhD-CS',
    image: Srinjoy,
    researchAreas: ['Reinforcement Learning'],
    joiningDate: '2020-01-10',
    linkedin: 'https://in.linkedin.com/in/srinjoy-roy-6846341a6',
    email: 'srinjoyroyonline@gmail.com ?subject=[FromMLRGSite]',
    bio: 'His research interests include reinforcement learning, general intelligence, and the explainability of reinforcement learning algorithms.',
  },
  {
    id: '8',
    name: 'Arghya Pratihar',
    role: 'srf',
    title: 'ECSU, PhD-CS',
    image: Arghya,
    researchAreas: ['Topological Deep Learning', 'Non-Euclidean Spaces'],
    joiningDate: '2022-01-10',
    paperCount: 2,
    linkedin: 'https://in.linkedin.com/in/arghya-pratihar-contactarghya',
    email: 'arghya.pratihar_r@isical.ac.in?subject=[FromMLRGSite]',
    bio: 'Loading...',
  },
  {
    id: '9',
    name: 'Aniruddha Mandal',
    role: 'jrf',
    title: 'ECSU, PhD-CS',
    image: Aniruddha,
    researchAreas: ['Graph Neural Network'],
    joiningDate: '2023-01-10',
    linkedin: 'https://in.linkedin.com/in/aniruddha-mandal-16061a103',
    bio: 'Loading...',
  },
  {
    id: '10',
    name: 'Bhaskar Pramanik',
    role: 'jrf',
    title: 'ECSU, PhD-CS',
    image: Bhaskar,
    researchAreas: ['Graph Neural Network'],
    joiningDate: '2023-01-10',
    linkedin: 'https://in.linkedin.com/in/bhaskar-pramanik-291904162',
    bio: 'Loading...',
  },
  {
    id: '11',
    name: 'Debanjan Dutta',
    role: 'jrf',
    title: 'ECSU, PhD-CS',
    researchAreas: ['Language Models', 'Formal Languages', 'Expressiveness'],
    joiningDate: '2023-01-10',
    website: 'https://www.isical.ac.in/~debanjandutta_r',
    email: 'debanjandutta_r@isical.ac.in?subject=[FromMLRGSite]',
    bio: 'Works on investigating the expressive power of Language Models from the lens of theoretical computer science.',
  },
  {
    id: '12',
    name: 'Shinjon Chakraborty',
    role: 'jrf',
    title: 'SMU, PhD-Stat',
    image: Shinjon,
    researchAreas: ['Causal Inference', 'Optimal Transport'],
    joiningDate: '2023-01-10',
    paperCount: 4,
    scholar: 'https://www.researchgate.net/profile/Shinjon_Chakraborty',
    linkedin: 'https://in.linkedin.com/in/shinjon-chakraborty-a684b4209',
    email: 'shinjonchakraborty07@gmail.com?subject=[FromMLRGSite]',
    bio: 'Currently on the path of exploring Causal Inference and Statistical Learning theory. He is also an enthusiast in Theoretical Statistics, and Asymptotic Inference.',
  },
  {
    id: '13',
    name: 'Pritam Mukherjee',
    role: 'jrf',
    title: 'ECSU, PhD-CS',
    researchAreas: ['Graph Learning'],
    joiningDate: '2024-01-10',
    bio: 'Loading....',
  },
  {
    id: '14',
    name: 'Dr. Susmita Ghosh',
    role: 'alumni',
    title: 'Data Scientist @ ThreeV Technologies, Inc.',
    image: Susmita,
    researchAreas: ['Machine Learning', 'Deep Learning', 'EEG'],
    joiningDate: '2018-03-01',
    paperCount: 7,
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=7yt-PN4AAAAJ&view_op=list_works&sortby=pubdate',
    linkedin: 'https://in.linkedin.com/in/susmita-ghosh-5223b8a1',
  },
  {
    id: '15',
    name: 'Dr. Sandipan Dhar',
    role: 'alumni',
    title: 'Postdoctoral Researcher @ IIT-Bombay',
    image: Sandipan,
    researchAreas: ['Deep Learning', 'Speech Synthesis', 'Speech Classification', 'Medical Imaging'],
    joiningDate: '2018-03-01',
    paperCount: 20,
    website: 'https://sites.google.com/view/sandipan1994',
    scholar: 'https://scholar.google.com/citations?hl=en&user=37kX7hYAAAAJ&view_op=list_works&sortby=pubdate',
    linkedin: 'https://www.linkedin.com/in/sandi94/',
    github: 'https://github.com/SandyPanda-MLDL'
  },
  {
    id: '16',
    name: 'Dr. Avisek Gupta',
    role: 'alumni',
    title: 'Assistant Professor  @ IAI, TCG-CREST',
    image: Avisek,
    researchAreas: ['Deep Learning', 'Machine Learning', 'Artifical Intelligence'],
    joiningDate: '2016-03-01',
    paperCount: 13,
    website: 'https://avisekgupta.github.io/',
    linkedin: 'https://www.linkedin.com/in/avisek-gupta-66956b96/',
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=mVhNXEWludgC&view_op=list_works&sortby=pubdate',
    github: 'https://github.com/Avisek20',
    email: 'avisek.gupta@tcgcrest.org?subject=[FromMLRGSite]'
  },
  {
    id: '17',
    name: 'Dr. Sankha Subhra Mullick',
    role: 'alumni',
    title: 'Senior AI Reseracher @ Dolby Laboratories',
    image: Sankha,
    researchAreas: ['Machine Learning', 'Class Imbalanced Learning', 'Evolutionary Optimization', 'Deep Learning'],
    joiningDate: '2016-03-01',
    paperCount: 18,
    website: 'https://sankhasubhra.github.io/',
    linkedin: 'https://www.linkedin.com/in/sankha-subhra-mullick-92652119',
    github: 'https://github.com/SankhaSubhra',
    scholar: 'https://scholar.google.com/citations?hl=en&user=QnzlBI8AAAAJ&view_op=list_works&sortby=pubdate',
    email: 'mullicksankhasubhra@gmail.com?subject=[FromMLRGSite]'
  },
  {
    id: '18',
    name: 'Dr. Shounak Datta',
    role: 'alumni',
    title: 'Senior Research Engineer @ ARM Inc.',
    image: Shounak,
    researchAreas: ['Machine Learning', 'Imbalanced Classification', 'Missing Data', 'Clustering', 'Optimization'],
    joiningDate: '2015-03-01',
    paperCount: 26,
    website: 'https://shounak-d.github.io/',
    linkedin: 'https://www.linkedin.com/in/shounak-datta-94782a169',
    github: 'https://github.com/Shounak-D',
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=qtW4ugoAAAAJ&view_op=list_works&sortby=pubdate',
    email: 'shounak.jaduniv@gmail.com?subject=[FromMLRGSite]'
  },
  {
    id: '19',
    name: 'Dr. Abhishek Kumar',
    role: 'adjunct',
    title: 'VSB-Technical University of Ostrava',
    image: Abhishek,
    researchAreas: ['Evolutionary Computation', 'Constraint Handling Techniques', 'Power Flow Algorithms', 'Power System'],
    joiningDate: '2022-03-01',
    paperCount: 69,
    website: 'https://abhisheka456.github.io/',
    github: 'https://github.com/abhisheka456/',
    scholar: 'https://scholar.google.com/citations?hl=en&user=uZRyTFIAAAAJ&view_op=list_works&sortby=pubdate',
    email: 'abhishek.kumar.eee13@iitbhu.ac.in?subject=[FromMLRGSite]'
  },
  {
    id: '20',
    name: 'Anal Roy Chowdhury',
    role: 'alumni',
    title: 'PhD Scholar @ IACS',
    image: Anal,
    researchAreas: ['Multi-View Clustering', 'Machine Learning', 'Deep Learning', 'Semiconductor Nanostructure'],
    joiningDate: '2021-03-01',
    paperCount: 7,
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=CukHpC4AAAAJ&view_op=list_works&sortby=pubdate',
    email: 'analroychowdhury084@gmail.com?subject=[FromMLRGSite]',
    linkedin: 'https://in.linkedin.com/in/anal-roy-chowdhury-00a696188',
    bio: 'Joined as PLP'
  },
  {
    id: '21',
    name: 'Arkaprabha Basu',
    role: 'alumni',
    title: 'PhD student @ UAEU',
    image: Arkaprabha,
    researchAreas: ['Multimodality', 'Large Language Model', 'Computer Vision'],
    joiningDate: '2021-03-01',
    paperCount: 11,
    email: 'arkaprabha17@gmail.com?subject=[FromMLRGSite]',
    scholar: 'https://scholar.google.com/citations?hl=en&user=7S_jA3IAAAAJ&view_op=list_works&sortby=pubdate',
    website: 'https://thecoder1012.github.io/',
    github: 'https://github.com/Thecoder1012',
    bio: 'Joined as PLP'
  },
  {
    id: '22',
    name: 'Dr. Arkajyoti Saha',
    role: 'alumni',
    title: 'Assistant Professor @ UC Irvine',
    image: Arkajyoti,
    researchAreas: ['Statistics', 'Machine Learning', 'Spatial Statistics', 'Artificial Intelligence'],
    joiningDate: '2015-03-01',
    paperCount: 20,
    website: 'https://www.arkajyotisaha.com/',
    email: 'arkajyos@uci.edu?subject=[FromMLRGSite]',
    bio: 'Joined as undergrad Student.'
  },
  {
    id: '23',
    name: 'Dr. Saptarshi Chakraborty',
    role: 'alumni',
    title: 'Assistant Professor @ University of Michigan',
    image: Saptarshi,
    researchAreas: ['Machine Learning', 'Clustering', 'Statistical Learning Theory', 'Deep Learning', 'Robust Statistics'],
    joiningDate: '2020-03-01',
    paperCount: 28,
    website: 'https://saptarshic27.github.io',
    github: 'https://github.com/saptarshic27',
    scholar: 'https://scholar.google.com/citations?hl=en&user=BAH6owQAAAAJ&view_op=list_works&sortby=pubdate',
    email: 'saptarshic@berkeley.edu?subject=[FromMLRGSite]',
    bio: 'Joined as undergrad Student.'
  },
  {
    id: '24',
    name: 'Debolina Paul',
    role: 'alumni',
    title: 'CKUENS Analytics',
    image: Debolina,
    researchAreas: ['Machine Learning', 'Deep Learning', 'Learning Theory', 'Optimization', 'Optimal Transport'],
    joiningDate: '2020-03-01',
    paperCount: 17,
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=TDakv1QAAAAJ&view_op=list_works&sortby=pubdate',
    bio: 'Joined as Undergrad Student.'
  },
  {
    id: '25',
    name: 'Dr. Imon Banerjee',
    role: 'alumni',
    title: 'Assistant Professor @ Northwestern University',
    image: Imon,
    researchAreas: ['Applied Statistics', 'Machine Learning', 'Theoretical Statistics'],
    joiningDate: '2019-03-01',
    paperCount: 8,
    website: 'https://ibanerj750.github.io/',
    scholar: 'https://scholar.google.com/citations?hl=en&user=9MotWmwAAAAJ&view_op=list_works&sortby=pubdate',
    // instagram: 'https://www.instagram.com/imon750/',
    bio: 'Joined as UnderGrad Student.'
  },
  {
    id: '26',
    name: 'Dr. Sayantan Kumar',
    role: 'alumni',
    title: 'Postdoctoral Fellow @ National Institures on Health',
    image: Sayantan,
    researchAreas: ['Machine Learning', 'AI in Healthcare', 'Biomedical Informatics', 'Precision Medicine'],
    joiningDate: '2019-03-01',
    paperCount: 23,
    email: 'kumarsayantan94@gmail.com?subject=[FromMLRGSite]',
    website: 'https://sayantankumar.github.io/',
    github: 'https://github.com/SayantanKumar',
    linkedin: 'https://www.linkedin.com/in/sayantan-kumar-14550812a',
    scholar: 'https://scholar.google.com/citations?hl=en&user=ytMVdOMAAAAJ&view_op=list_works&sortby=pubdate',
    bio: 'Joined as Undergrad Student.'
  },
  {
    id: '27',
    name: 'Dr. Arka Ghosh',
    role: 'alumni',
    title: 'Associate Researcher @ DeustoTech',
    image: Arka,
    researchAreas: ['Evolutionary Algorithm', 'Machine Learning'],
    joiningDate: '2017-03-01',
    paperCount: 23,
    email: 'arka.ghosh@deusto.es?subject=[FromMLRGSite]',
    scholar: 'https://scholar.google.co.in/citations?hl=en&user=dOR684AAAAAJ&view_op=list_works&sortby=pubdate',
    website: 'https://deustotech.deusto.es/en/member/ghosh-arka/',
    linkedin: 'https://www.linkedin.com/in/sayantan-kumar-14550812a',
    bio: 'Joined as Undergrad Student.'
  },
];

export default function TeamPage() {
  const { setLastUpdated } = useLastUpdated();
  
  useEffect(() => {
    setLastUpdated('2025-07-14');
  }, [setLastUpdated]);
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

  const TeamMemberCard = ({ member, featured = false }: { member: TeamMember; featured?: boolean }) => (
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
        <div className="grid grid-cols-2 gap-4 mb-6 w-full place-items-center">
        {/* <div className="flex gap-4 mb-6"> */}
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
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
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
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {new Date(member.joiningDate).getFullYear()}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Joined</span>
            </div>
          )}
        </div>

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

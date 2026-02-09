import Erricson from '../public/news/2025/Ericsson.png';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  uploadDate: string;
  type: 'publication' | 'award' | 'event' | 'announcement';
  content: string;
  detailedContent?: string;
  link?: string;
  images?: { url: any; caption: string }[];
  tags?: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: '2',
    title: 'Mr. Faizanuddin Ansari has sucessfully defended his PhD thesis.',
    date: '2026-02-09',
    uploadDate: '2026-02-09',
    type: 'award',
    content: 'Dr. Faizanuddin Ansari successfully defended his PhD thesis at ISI Kolkata and joins École Polytechnique & Paris Telecom as a postdoc!',
    images: [
      {
        url: '/news/2026/PhDDefense1.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Faizanuddin Ansari).'
      },
      {
        url: '/news/2026/PhDDefense3.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Faizanuddin Ansari).'
      },
      {
        url: '/news/2026/PhDDefense5.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Faizanuddin Ansari).'
      }
    ],
    tags: ['award']
  },
  {
    id: '1',
    title: 'Mr Anish Chakrabarty has sucessfully defended his PhD thesis.',
    date: '2026-02-04',
    uploadDate: '2026-02-09',
    type: 'award',
    content: 'Dr. Anish Chakraborty successfully defended his PhD thesis at ISI Kolkata and joins École Polytechnique & Paris Telecom as a postdoc!',
    images: [
      {
        url: '/news/2026/PhDDefense1.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Anish Chakrabarty).'
      },
      {
        url: '/news/2026/PhDDefense3.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Anish Chakrabarty).'
      },
      {
        url: '/news/2026/PhDDefense5.jpg',
        caption: 'A Journey from Mr. to Dr. (Dr. Anish Chakrabarty).'
      }
    ],
    tags: ['award']
  },
  {
    id: '8',
    title: 'IJCAI 2025',
    date: '2025-08-30',
    uploadDate: '2025-08-31',
    type: 'announcement',
    content: 'PI Dr. Swagatam Das presenting the joint work to IJCAI.',
    images: [
      {
        url: '/news/2025/IJCAI1.jpg',
        caption: 'Prof. Das at IJCAI 2025 (Guangzhou, China).'
      },
      {
        url: '/news/2025/IJCAI2.jpg',
        caption: 'Work on Dias.'
      },
      {
        url: '/news/2025/IJCAI3.jpg',
        caption: 'Co-authors: Supratik, Jyotishka, Debolina.'
      },
      {
        url: '/news/2025/IJCAI4.jpg',
        caption: ''
      }
    ]
  },
  {
    id: '6',
    title: 'Ericsson Fellow',
    date: '2025-07-30',
    uploadDate: '2025-08-31',
    type: 'announcement',
    content: 'We congratulate Soham Chakraborty (MTech, ISI) for being selected as Erricson Fellow.',
    images: [
      {
        url: '/news/2025/Ericsson.png',
        caption: ''
      }
    ],
  },
  {
    id: '5',
    title: 'Pre-PhD Seminars',
    date: '2025-06-20',
    uploadDate: '2025-06-20',
    type: 'event',
    content: 'We congratulate our SRFs Mr. Anish, Mr. Faizan, and Mr. Kushal for presenting their thoughtful works in the Pre-PhD Seminars.',
  },
  {
    id: '4',
    title: 'Recent Publications',
    date: '2025-06-10',
    uploadDate:'2025-06-10',
    type: 'publication',
    content: 'Works led by Anish, Faizanuddin, and Kushal have been published in StatComp, EAAI, and TNNLS  respectively.',
  },
  {
    id: '3',
    title: 'Mrs Susmita Ghosh has sucessfully defended her PhD thesis',
    date: '2025-05-16',
    uploadDate:'2025-05-16',
    type: 'award',
    content: 'We congratulate Mrs Susmita Ghosh on the successful defence of her doctoral research.',
  },
  {
    id: '2',
    type: 'announcement',
    title: 'New Research Members Join',
    date: '2025-06-15',
    uploadDate: '2025-06-15',
    content: 'We welcome two talented PhD students, Pritam and Bidesh, to our research group this semester.',
  },
  {
    id: '1',
    type: 'announcement',
    title: 'India AI',
    date: '2025-03-10',
    uploadDate: '2025-03-10',
    content: 'Mr. Shivam Jhangid (MTech) has received fellowship from India AI Mission under the supervision of Prof. Das.',
  }
];

export function getNewsItem(id: string): NewsItem | null {
  return newsItems.find(item => item.id === id) || null;
}

export function getAllNewsItems(): NewsItem[] {
  return newsItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

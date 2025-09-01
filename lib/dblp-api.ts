export interface DblpCounts {
  journal: number;
  conference: number;
  preprint: number;
  other: number;
  total: number;
}

export async function fetchDblpCounts(authorQuery: string): Promise<DblpCounts> {
  return new Promise((resolve, reject) => {
    // Create a unique callback name to avoid conflicts
    const callbackName = `dblpCallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize counts
    const counts: DblpCounts = {
      journal: 0,
      conference: 0,
      preprint: 0,
      other: 0,
      total: 0
    };

    // Create the callback function
    (window as any)[callbackName] = (data: any) => {
      try {
        // Get total count from hits
        if (data.result && data.result.hits && data.result.hits['@total']) {
          counts.total = parseInt(data.result.hits['@total'], 10) || 0;
        }

        // Parse completions for venue-wise counts
        if (data.result && data.result.completions && data.result.completions.c) {
          const completions = data.result.completions.c;
          
          completions.forEach((completion: any) => {
            const text = completion.text || '';
            const count = parseInt(completion['@sc'] || completion['@dc'] || '0', 10);
            
            if (text.includes('journals/corr:')) {
              counts.preprint += count;
            } else if (text.includes('journals/')) {
              counts.journal += count;
            } else if (text.includes('conf/')) {
              counts.conference += count;
            } else if (text.includes('series/')) {
              counts.other += count;
            } else {
              counts.other += count;
            }
          });
        }

        // Clean up
        delete (window as any)[callbackName];
        document.head.removeChild(script);
        
        resolve(counts);
      } catch (error) {
        // Clean up on error
        delete (window as any)[callbackName];
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        reject(error);
      }
    };

    // Construct the DBLP API URL
    const baseUrl = 'https://dblp.org/search/publ/api';
    const params = new URLSearchParams({
      callback: callbackName,
      q: authorQuery,
      compl: 'streamid',
      p: '0',
      h: '0', // We only need the total count, not individual papers
      c: '50', // Get up to 50 completion categories
      format: 'jsonp',
      _: Date.now().toString()
    });

    const url = `${baseUrl}?${params.toString()}`;

    // Create script element for JSONP
    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      // Clean up on error
      delete (window as any)[callbackName];
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      reject(new Error('Failed to load DBLP data'));
    };

    // Add timeout
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        delete (window as any)[callbackName];
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        reject(new Error('DBLP API request timeout'));
      }
    }, 20000); // 20 second timeout

    // Add script to head to trigger the request
    document.head.appendChild(script);
  });
}

export function constructDblpQuery(memberDblpName: string, isPrincipalInvestigator: boolean = false): string {
  if (isPrincipalInvestigator) {
    return `author:${memberDblpName}:`;
  } else {
    return `author:${memberDblpName}: author:Swagatam_Das:`;
  }
}

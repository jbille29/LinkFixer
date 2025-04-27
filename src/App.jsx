import { useState } from 'react';

function App() {
  const [urls, setUrls] = useState('');
  const [utm, setUtm] = useState({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  });
  const [results, setResults] = useState([]);

  const fixLinks = () => {
    const urlList = urls.split('\n').filter(Boolean);
  
    const fixed = urlList.map(url => {
      const separator = url.includes('?') ? '&' : '?';
      let newUrl = url + separator +
        `utm_source=${encodeURIComponent(utm.source)}&utm_medium=${encodeURIComponent(utm.medium)}&utm_campaign=${encodeURIComponent(utm.campaign)}`;
  
      if (utm.term) newUrl += `&utm_term=${encodeURIComponent(utm.term)}`;
      if (utm.content) newUrl += `&utm_content=${encodeURIComponent(utm.content)}`;
  
      return newUrl;
    });
  
    setResults(fixed);
  };
  
  const copyResults = () => {
    navigator.clipboard.writeText(results.join('\n'));
    alert('Copied to clipboard!');
  };  

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        LinkFixer
      </h1>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Quickly add UTM parameters to all your links — no coding required.
      </p>

      <textarea
        style={{ width: '100%', height: '150px', padding: '1rem', marginBottom: '1rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        placeholder="Paste your URLs here, one per line"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="utm_source"
          value={utm.source}
          onChange={(e) => setUtm({ ...utm, source: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="utm_medium"
          value={utm.medium}
          onChange={(e) => setUtm({ ...utm, medium: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="utm_campaign"
          value={utm.campaign}
          onChange={(e) => setUtm({ ...utm, campaign: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="utm_term (optional)"
          value={utm.term}
          onChange={(e) => setUtm({ ...utm, term: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="utm_content (optional)"
          value={utm.content}
          onChange={(e) => setUtm({ ...utm, content: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      <button
        onClick={fixLinks}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Fix Links
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Fixed Links:</h2>
            <button
              onClick={copyResults}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Copy All 
            </button>
          </div>
          <textarea
            style={{ width: '100%', height: '200px', padding: '1rem', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
            value={results.join('\n')}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default App;

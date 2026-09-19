import React, { useState, useEffect, useCallback } from 'react';
import { Listing, SearchResponse, ApiError } from './types';

const API_BASE_URL = 'http://localhost:8080/api/listings';

export default function ListingSearchApp() {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minBedrooms, setMinBedrooms] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [targetBudget, setTargetBudget] = useState<string>('');
  
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const executeSearch = useCallback(async (targetPage: number) => {
    setIsLoading(true);
    setUiError(null);

    try {
      const urlParams = new URLSearchParams();
      urlParams.append('page', targetPage.toString());
      urlParams.append('pageSize', pageSize.toString());
      
      if (minPrice) urlParams.append('minPrice', minPrice);
      if (maxPrice) urlParams.append('maxPrice', maxPrice);
      if (minBedrooms) urlParams.append('minBedrooms', minBedrooms);
      if (city.trim()) urlParams.append('city', city.trim());
      if (keyword.trim()) urlParams.append('keyword', keyword.trim());
      if (targetBudget) urlParams.append('targetBudget', targetBudget);

      const response = await fetch(`${API_BASE_URL}?${urlParams.toString()}`);
      
      if (!response.ok) {
        const errorPayload: ApiError = await response.json();
        throw new Error(errorPayload.detail || 'An unexpected error occurred.');
      }

      const resultPayload: SearchResponse = await response.json();
      setData(resultPayload);
      setPage(resultPayload.page);
    } catch (err: any) {
      setUiError(err.message || 'Failed to communicate with search API.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [minPrice, maxPrice, minBedrooms, city, keyword, targetBudget, pageSize]);

  useEffect(() => {
    executeSearch(page);
  }, [page]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(1);
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1 style={{ margin: '0 0 8px 0' }}>🏡 Property Listing Search Service</h1>
        <p style={{ color: '#666', margin: '0 0 24px 0' }}>Full-Stack MLS Query Dashboard</p>
      </header>

      <form onSubmit={handleFormSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Min Price (\$)</label>
            <input type="number" min="0" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="e.g. 400000" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Max Price (\$)</label>
            <input type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 550000" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Min Bedrooms</label>
            <input type="number" min="0" value={minBedrooms} onChange={e => setMinBedrooms(e.target.value)} placeholder="e.g. 2" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Springfield" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Keyword Search</label>
            <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. condo, pool" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>🎯 Target Budget (\$)</label>
            <input type="number" min="0" value={targetBudget} onChange={e => setTargetBudget(e.target.value)} placeholder="e.g. 450000" style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '2px solid #0056b3' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button type="submit" style={{ background: '#0056b3', color: 'white', border: 'none', padding: '10px 24px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Apply Filters</button>
          <label style={{ fontSize: '14px' }}>
            Per Page:{' '}
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ padding: '6px' }}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>
      </form>

      {isLoading && <div style={{ padding: '20px', background: '#e9ecef', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>🔄 Querying data provider feeds...</div>}
      {uiError && <div style={{ padding: '16px', background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '24px', fontWeight: 'bold' }}>⚠️ API Validation Conflict: {uiError}</div>}

      {!isLoading && !uiError && data && data.results.length === 0 && (
        <div style={{ padding: '40px', border: '2px dashed #ccc', textAlign: 'center', color: '#666', borderRadius: '8px' }}>🔍 No active matching property records located. Adjust your search filtering constraints above.</div>
      )}

      {!isLoading && data && data.results.length > 0 && (
        <div>
          <div style={{ marginBottom: '12px', color: '#666', fontWeight: '500' }}>Found {data.totalResults} results</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6' }}>
            <thead>
              <tr style={{ background: '#e9ecef', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px' }}>Address</th>
                <th style={{ padding: '12px' }}>City / State</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Configuration</th>
                <th style={{ padding: '12px' }}>Listed Date</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Relevance Match</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6', background: item.status === 'pending' ? '#fff3cd' : 'transparent' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.address}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{item.description}</div>
                  </td>
                  <td style={{ padding: '12px' }}>{item.city}, {item.state} {item.zip}</td>
                  <td style={{ padding: '12px', fontWeight: '600' }}>\${item.price.toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>{item.bedrooms}B / {item.bathrooms}Ba ({item.sqft} sqft)</td>
                  <td style={{ padding: '12px' }}>{item.listedDate}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <span style={{ background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' }}>{item.relevanceScore}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ padding: '8px 16px', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>◀ Previous</button>
            <span style={{ margin: '0 8px', fontWeight: '500' }}>Page <strong>{page}</strong> of {data.totalPages}</span>
            <button disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)} style={{ padding: '8px 16px', cursor: page >= data.totalPages ? 'not-allowed' : 'pointer' }}>Next ▶</button>
          </div>
        </div>
      )}
    </div>
  );
}

const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. We previously removed `relative` from `map-search-container` and added it to `map-search-bar`.
// Let's reverse that.
code = code.replace(
  '<div className="map-search-container">',
  '<div className="map-search-container relative">'
);

code = code.replace(
  '<div className="map-search-bar relative"',
  '<div className="map-search-bar"'
);

// 2. We need to move the dropdown from inside map-search-bar to inside map-search-container.
// Currently it looks like:
//            </button>
//
//            {/* Search Dropdown */}
//          {isSearchFocused && (
//            <div ...>
//               ...
//            </div>
//          )}
//            </div>
//          </div>
//
//        {/* Filter Pills & Controls */}

// Let's replace the whole structure using regex to be safe.
// We want to capture the map-search-bar contents and the dropdown.

const targetBlock = `            <div className="map-search-bar" style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'white', borderRadius: '999px', padding: '12px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search pandals, metro, toilets" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontWeight: '500', color: '#333' }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ padding: '4px', background: '#f3f4f6', borderRadius: '50%', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={14} />
                </button>
              )}
            <button 
              onClick={() => searchQuery ? setSearchQuery('') : null} 
              className="text-gray-600 ml-2 shrink-0"
            >
              {searchQuery ? <X size={20} /> : <Mic size={20} />}
            </button>

            {/* Search Dropdown */}
          {isSearchFocused && (
              <div 
                className="absolute top-full mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"
                style={{
                    left: '-58px',
                    width: 'calc(100vw - 20px)',
                    backgroundColor: '#ffffff',
                  opacity: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  borderRadius: '24px',
                  padding: '16px 0',
                  maxHeight: '65vh'
                }}
              >
                {searchQuery.trim() === '' ? (
                      !userLocation ? (
                        // LOCATION OFF: TRENDING CATEGORIES
                        <>
                          {formattedPujos.slice(0, 4).map(loc => renderSearchItem({...loc, rawDist: Infinity}))}
                        </>
                      ) : (
                        // LOCATION ON: NEARBY LIST
                        <>
                          {poorAccuracy && (
                            <div className="px-5 pb-3 pt-1">
                              <button 
                                onClick={(e) => { e.preventDefault(); startTracking(); }}
                                style={{ width: '100%', backgroundColor: '#f59e0b', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="12" y1="8" x2="12" y2="12"/>
                                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                Poor GPS signal. Tap to force refresh.
                              </button>
                            </div>
                          )}
                          {nearbySearchList.length > 0 ? (
                            nearbySearchList.map(loc => renderSearchItem(loc))
                          ) : (
                            <div className="px-5 py-6 text-sm text-center" style={{ color: '#6b7280' }}>No nearby locations found.</div>
                          )}
                          <div 
                              className="px-5 py-2 flex items-center justify-between cursor-pointer"
                              style={{ borderBottom: '1px solid #f9fafb' }}
                              onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="text-[14px] font-semibold truncate flex items-center gap-1.5" style={{ color: '#111827' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea' }}>
                                    <Home size={16} />
                                  </div>
                                  Home
                                </div>
                                <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px' }}>
                                  Saved home · {homeAddress}
                                </div>
                              </div>
                              <div className="shrink-0 text-[13px]" style={{ color: '#9333ea' }}>
                                0 m
                              </div>
                            </div>
                        </>
                      )
                    ) : (
                  // BEST MATCHES LIST
                  <>
                    <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">BEST MATCHES</div>
                    {searchResults.length > 0 ? (
                      searchResults.map(loc => renderSearchItem(loc))
                    ) : (
                      <div className="px-5 py-6 flex flex-col items-center justify-center">
                        <div className="text-sm font-bold mb-1" style={{ color: '#111827' }}>No nearby matches.</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Try searching for a different area.</div>
                        <button 
                          className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold" 
                          style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                          onMouseDown={() => setSearchQuery('')}
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            </div>
          </div>`;

const replaceBlock = `            <div className="map-search-bar" style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'white', borderRadius: '999px', padding: '12px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search pandals, metro, toilets" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', fontWeight: '500', color: '#333' }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ padding: '4px', background: '#f3f4f6', borderRadius: '50%', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={14} />
                </button>
              )}
            <button 
              onClick={() => searchQuery ? setSearchQuery('') : null} 
              className="text-gray-600 ml-2 shrink-0"
            >
              {searchQuery ? <X size={20} /> : <Mic size={20} />}
            </button>
            </div>

            {/* Search Dropdown */}
          {isSearchFocused && (
              <div 
                className="absolute top-full mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"
                style={{
                    left: '-6px',
                    right: '-6px',
                    width: 'auto',
                    backgroundColor: '#ffffff',
                  opacity: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  borderRadius: '24px',
                  padding: '16px 0',
                  maxHeight: '65vh'
                }}
              >
                {searchQuery.trim() === '' ? (
                      !userLocation ? (
                        // LOCATION OFF: TRENDING CATEGORIES
                        <>
                          {formattedPujos.slice(0, 4).map(loc => renderSearchItem({...loc, rawDist: Infinity}))}
                        </>
                      ) : (
                        // LOCATION ON: NEARBY LIST
                        <>
                          {poorAccuracy && (
                            <div className="px-5 pb-3 pt-1">
                              <button 
                                onClick={(e) => { e.preventDefault(); startTracking(); }}
                                style={{ width: '100%', backgroundColor: '#f59e0b', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="12" y1="8" x2="12" y2="12"/>
                                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                Poor GPS signal. Tap to force refresh.
                              </button>
                            </div>
                          )}
                          {nearbySearchList.length > 0 ? (
                            nearbySearchList.map(loc => renderSearchItem(loc))
                          ) : (
                            <div className="px-5 py-6 text-sm text-center" style={{ color: '#6b7280' }}>No nearby locations found.</div>
                          )}
                          <div 
                              className="px-5 py-2 flex items-center justify-between cursor-pointer"
                              style={{ borderBottom: '1px solid #f9fafb' }}
                              onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="text-[14px] font-semibold truncate flex items-center gap-1.5" style={{ color: '#111827' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea' }}>
                                    <Home size={16} />
                                  </div>
                                  Home
                                </div>
                                <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px' }}>
                                  Saved home · {homeAddress}
                                </div>
                              </div>
                              <div className="shrink-0 text-[13px]" style={{ color: '#9333ea' }}>
                                0 m
                              </div>
                            </div>
                        </>
                      )
                    ) : (
                  // BEST MATCHES LIST
                  <>
                    <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">BEST MATCHES</div>
                    {searchResults.length > 0 ? (
                      searchResults.map(loc => renderSearchItem(loc))
                    ) : (
                      <div className="px-5 py-6 flex flex-col items-center justify-center">
                        <div className="text-sm font-bold mb-1" style={{ color: '#111827' }}>No nearby matches.</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Try searching for a different area.</div>
                        <button 
                          className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold" 
                          style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                          onMouseDown={() => setSearchQuery('')}
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>`;

code = code.replace(targetBlock, replaceBlock);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed dropdown positioning logic.');

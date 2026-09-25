const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `{searchQuery.trim() === '' ? (
                  // NEARBY LIST
                  <>
                    <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">NEARBY</div>
                    {nearbySearchList.length > 0 ? (
                      nearbySearchList.map(loc => renderSearchItem(loc))
                    ) : (
                      <div className="px-5 py-6 text-sm text-center" style={{ color: '#6b7280' }}>No nearby locations found.</div>
                    )}
                  </>
                ) : (`;

const replacementStr = `{searchQuery.trim() === '' ? (
                  !userLocation ? (
                    // LOCATION OFF: TRENDING CATEGORIES
                    <>
                      <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">TRENDING CATEGORIES</div>
                      <div className="flex px-5 py-2 gap-2 overflow-x-auto hide-scrollbar" style={{ paddingBottom: '12px' }}>
                        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Pandal'); }}><img src="/pandel-icon.png" width="14" height="14" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Pandals</button>
                        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Metro'); }}><img src="/metro-icon.png" width="14" height="14" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Metro</button>
                        <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Toilet'); }}><img src="/toilet-icon.png" width="14" height="14" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Toilets</button>
                      </div>
                      <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">POPULAR SEARCHES</div>
                      {allPujos.slice(0, 4).map(loc => renderSearchItem({...loc, rawDist: Infinity}))}
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
                      <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">NEARBY</div>
                      {nearbySearchList.length > 0 ? (
                        nearbySearchList.map(loc => renderSearchItem(loc))
                      ) : (
                        <div className="px-5 py-6 text-sm text-center" style={{ color: '#6b7280' }}>No nearby locations found.</div>
                      )}
                    </>
                  )
                ) : (`;

if (mapPageCode.includes("No nearby locations found.</div>")) {
  mapPageCode = mapPageCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log('Successfully updated search recommendation UI.');
} else {
  console.log('Target string not found in MapPage.jsx');
}

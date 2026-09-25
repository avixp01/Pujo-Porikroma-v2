const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /\{\s*searchQuery\.trim\(\) === '' \?\s*\(\s*!userLocation \?\s*\(\s*\/\/\s*LOCATION OFF: TRENDING CATEGORIES[\s\S]*?\)\s*:\s*\(\s*\/\/\s*LOCATION ON: NEARBY LIST[\s\S]*?No nearby locations found\.<\/div>\s*\)\}\s*<\/>\s*\)\s*\)\s*:\s*\(/;

const replacementStr = `{searchQuery.trim() === '' ? (
                    !userLocation ? (
                      // LOCATION OFF: TRENDING CATEGORIES
                      <>
                        <div className="flex px-5 py-2 gap-4" style={{ paddingBottom: '12px' }}>
                          <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Pandal'); }}><img src="/pandel-icon.png" width="16" height="16" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Pandals</button>
                          <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Metro'); }}><img src="/metro-icon.png" width="16" height="16" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Metro</button>
                          <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Toilet'); }}><img src="/toilet-icon.png" width="16" height="16" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Toilets</button>
                        </div>
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
                          className="px-5 py-3 flex items-center gap-4 cursor-pointer"
                          style={{ borderBottom: '1px solid #f9fafb' }}
                          onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                        >
                          <div className="w-11 h-11 rounded-[12px] flex justify-center items-center shrink-0" style={{ backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff', color: '#9333ea' }}>
                            <Home size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] font-bold truncate" style={{ color: '#111827' }}>Home</div>
                            <div className="text-[12px] mt-0.5 truncate" style={{ color: '#6b7280', fontWeight: '500' }}>
                              Saved home · {homeAddress}
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-center shrink-0 ml-2">
                            <span className="text-[13px] font-bold leading-none" style={{ color: '#9333ea' }}>0 m</span>
                            <span className="text-[10px] text-gray-400 font-bold leading-none mt-[3px]">away</span>
                          </div>
                        </div>
                      </>
                    )
                  ) : (`;

if (regex.test(mapPageCode)) {
  mapPageCode = mapPageCode.replace(regex, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log('Successfully updated search UI to match Figma design.');
} else {
  console.log('Regex did not match.');
}

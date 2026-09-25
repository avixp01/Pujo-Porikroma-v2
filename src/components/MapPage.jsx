import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Search, Map as MapIcon, Route, ArrowLeft, Compass, LocateFixed, ChevronUp, Plus, X, Mic, Sun, Moon, Car, Bike, Train, TramFront, Footprints, Home, Clock, ArrowUpDown, MapPin, MoreVertical, Navigation, Edit2, Menu, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotate';
import './MapPage.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

import MarkerClusterGroup from 'react-leaflet-cluster';

import { allPujos } from '../data/allPujos.js';
import { allToilets } from '../data/toiletsManager.js';
import { allMetros } from '../data/metroManager.js';
import { allTrains } from '../data/trainManager.js';

console.log(`Successfully loaded ${allPujos.length} unique pandals!`);

const formattedPujos = allPujos.map((p, index) => ({
  id: `pujo-${index}`,
  type: 'pandal',
  name: p.name,
  category: p.category,
  lat: p.lat,
  lng: p.lng
}));

const formattedToilets = allToilets.map((t, index) => ({
  id: `toilet-${index}`,
  type: 'toilet',
  name: t.name || 'Public Toilet',
  lat: t.lat,
  lng: t.lng
}));

const formattedMetros = allMetros.map((m, index) => ({
  id: `metro-${index}`,
  type: 'metro',
  name: m.name,
  lat: m.lat,
  lng: m.lng
}));

const formattedTrains = allTrains.map((tr, index) => ({
  id: `train-${index}`,
  type: 'train',
  name: tr.name,
  lat: tr.lat,
  lng: tr.lng
}));

const locationData = [
  ...formattedPujos,
  ...formattedToilets,
  ...formattedMetros,
  ...formattedTrains
];

// Helper to create custom HTML markers
const createCustomIcon = (type, count) => {
  let bgColor = '#c0392b'; // deep red/coral for pandals
  if (type === 'metro') bgColor = '#2980b9'; // blue for metro
  if (type === 'toilet') bgColor = '#16a085'; // teal for toilet
  if (type === 'train') bgColor = '#8e44ad'; // purple for train

  const getEmoji = (t) => {
    if (t === 'pandal') return '⛩️';
    if (t === 'metro') return '🚇';
    if (t === 'toilet') return '🚻';
    if (t === 'train') return '🚆';
    return 'ðŸ“';
  };

  const html = `
    <div class="custom-marker" style="background-color: ${bgColor};">
      <span>${getEmoji(type)}</span>
    </div>
  `;

  return L.divIcon({
    className: 'custom-marker-wrapper',
    html,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Component to handle recentering when clicking a marker
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      if (typeof map.setBearing === 'function') {
        try { map.setBearing(0); } catch(e){}
      }
      map.flyTo(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
};

const MapEvents = ({ onDrag }) => {
  const map = useMap();
  React.useEffect(() => {
    map.on('dragstart', onDrag);
    return () => map.off('dragstart', onDrag);
  }, [map, onDrag]);
  return null;
};

const CustomMapControls = ({ handleLocateClick, isFollowing }) => {
  const map = useMap();
  const [bearing, setBearing] = useState(0);
  const [isCompassActive, setIsCompassActive] = useState(false);

  React.useEffect(() => {
    const updateBearing = () => {
      if (typeof map.getBearing === 'function') {
        setBearing(map.getBearing());
      }
    };
    
    updateBearing();
    map.on('rotate', updateBearing);
    map.on('move', updateBearing);
    return () => {
      map.off('rotate', updateBearing);
      map.off('move', updateBearing);
    };
  }, [map]);

  React.useEffect(() => {
    let handler;
    if (isCompassActive) {
      handler = (e) => {
        let heading = null;
        if (e.webkitCompassHeading) {
          heading = e.webkitCompassHeading;
        } else if (e.alpha !== null) {
          heading = 360 - e.alpha;
        }
        if (heading !== null && typeof map.setBearing === 'function') {
          try { map.setBearing(heading); } catch(err){}
        }
      };
      
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', handler);
      } else {
        window.addEventListener('deviceorientation', handler);
      }
    }
    return () => {
      if (handler) {
        window.removeEventListener('deviceorientationabsolute', handler);
        window.removeEventListener('deviceorientation', handler);
      }
    };
  }, [isCompassActive, map]);

  React.useEffect(() => {
    const onDrag = () => setIsCompassActive(false);
    map.on('dragstart', onDrag);
    return () => map.off('dragstart', onDrag);
  }, [map]);

  const handleCompassClick = async (e) => {
    e.stopPropagation();
    
    if (isCompassActive) {
      setIsCompassActive(false);
      if (typeof map.setBearing === 'function') {
        try { map.setBearing(0); } catch(err){}
      }
      return;
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          setIsCompassActive(true);
        }
      } catch (err) {
        console.error("Device orientation permission error", err);
      }
    } else {
      setIsCompassActive(true);
    }
  };
  
  return (
    <div className="map-action-buttons">
      <button className={`map-action-btn ${isCompassActive ? 'following-active' : ''}`} onClick={handleCompassClick}>
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `rotate(${-bearing}deg)`, transition: 'transform 0.1s ease-out' }}
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 5 L14.5 12 L9.5 12 Z" fill="currentColor"/>
          <path d="M12 19 L14.5 12 L9.5 12 Z" fill="currentColor"/>
        </svg>
      </button>
      <button className={`map-action-btn ${isFollowing ? 'following-active' : ''}`} onClick={handleLocateClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <path d="M12 2 v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 22 v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M2 12 h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 12 h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomIn(); }}>
        <span style={{ fontSize: '28px', fontWeight: '500', paddingBottom: '4px' }} className="leading-none text-gray-700">+</span>
      </button>
      <button className="map-action-btn" onClick={(e) => { e.stopPropagation(); map.zoomOut(); }}>
        <span style={{ fontSize: '28px', fontWeight: '500', paddingBottom: '4px' }} className="leading-none text-gray-700">−</span>
      </button>
    </div>
  );
};

const LiveTracker = ({ isFollowing, position }) => {
  const map = useMap();
  React.useEffect(() => {
    if (isFollowing && position) {
      map.panTo(position, { animate: true, duration: 0.5 });
    }
  }, [isFollowing, position, map]);
  return null;
};

// Removed nearbyMockData as we calculate dynamically

const MapPage = ({ onClose }) => {
  const [activeFilters, setActiveFilters] = useState(['pandal', 'toilet', 'metro', 'train']);
  const [plannedStops, setPlannedStops] = useState([]); // multi-select filter
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mapCenter, setMapCenter] = useState([22.5726, 88.3639]); // Default Kolkata
  const [mapZoom, setMapZoom] = useState(12);
  const [activeTab, setActiveTab] = useState('map'); // 'map' or 'routes'
  const [isRouteMenuOpen, setIsRouteMenuOpen] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDirectionPopupOpen, setIsDirectionPopupOpen] = useState(false);
  const [activeDirectionMode, setActiveDirectionMode] = useState('footprints');
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [crowdLevel, setCrowdLevel] = useState(3);
  const [rainStatus, setRainStatus] = useState('no_rain');
  const [navigationDestination, setNavigationDestination] = useState(null);
  const [isRouteSwapped, setIsRouteSwapped] = useState(false);
  const [customOrigin, setCustomOrigin] = useState(null);
  const [originSearch, setOriginSearch] = useState(""); // Will be set in useEffect
  const [destSearch, setDestSearch] = useState("");
  const [activeDirectionInput, setActiveDirectionInput] = useState('dest');
  const [routeData, setRouteData] = useState(null);
  const [transitRouteData, setTransitRouteData] = useState(null);
  const [metroRouteData, setMetroRouteData] = useState(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);
  
  const [userLocation, setUserLocation] = useState(null);
  const [homeAddress, setHomeAddress] = useState('...');
  const lastFetchedLocationRef = React.useRef(null);
  const [isTracking, setIsTracking] = useState(false);
  const [poorAccuracy, setPoorAccuracy] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isFollowingRef = React.useRef(false);
  const watchIdRef = React.useRef(null);

  const [nearbyPandals, setNearbyPandals] = useState([]);
  const handleFilterClick = (filterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filterType)) {
        if (prev.length === 1) return prev; // Prevent deselecting the last active filter
        return prev.filter(f => f !== filterType);
      } else {
        return [...prev, filterType];
      }
    });
    setSelectedLocation(null);
  };


  // Calculate distance in km (Haversine formula)
  React.useEffect(() => {
    if (!userLocation) {
      setHomeAddress('...');
      lastFetchedLocationRef.current = null;
      return;
    }
    
    // Fetch if haven't fetched yet, or if moved > ~1km (0.01 deg) to avoid spamming OSM API
    const movedSignificantly = !lastFetchedLocationRef.current || 
      Math.abs(lastFetchedLocationRef.current[0] - userLocation[0]) > 0.01 || 
      Math.abs(lastFetchedLocationRef.current[1] - userLocation[1]) > 0.01;
      
    if (movedSignificantly) {
      lastFetchedLocationRef.current = userLocation;
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}`);
          const data = await response.json();
          if (data && data.display_name) {
            const parts = data.display_name.split(',').slice(0, 3).map(p => p.trim());
            setHomeAddress(parts.join(', '));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [userLocation]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;  
    const dLon = (lon2 - lon1) * Math.PI / 180; 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  };

  useEffect(() => {
    const pandalsOnly = locationData.filter(loc => loc.type === 'pandal');
    if (userLocation) {
      const [lat, lng] = userLocation;
      const distances = pandalsOnly.map(p => {
        const distKm = getDistance(lat, lng, p.lat, p.lng);
        return {
          ...p,
          dist: distKm < 1 ? `${Math.round(distKm * 1000)} m away` : `${distKm.toFixed(1)} km away`,
          rawDist: distKm
        };
      });
      const within1km = distances.filter(p => p.rawDist <= 1);
      within1km.sort((a, b) => a.rawDist - b.rawDist);
      setNearbyPandals(within1km.slice(0, 5));
    } else {
      // Fallback state (shuffles randomly each time sheet is opened or location denied)
      const fallback = [...pandalsOnly]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(p => ({
          ...p,
          dist: "Distance unknown",
          rawDist: Infinity
        }));
      setNearbyPandals(fallback);
    }
  }, [userLocation, isNearbyOpen]);

  const setFollowingStatus = (status) => {
    setIsFollowing(status);
    isFollowingRef.current = status;
  };

  const startTracking = () => {
    setShowLocationPopup(false);
    if (navigator.geolocation) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      
      // Center the map immediately on first lock without polluting the live watch loop
      navigator.geolocation.getCurrentPosition((position) => {
        setFollowingStatus(true);
        setMapCenter([position.coords.latitude, position.coords.longitude]);
        setMapZoom(17);
      }, () => {}, { enableHighAccuracy: true, timeout: 5000 });
      
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          if (accuracy > 100) {
            setPoorAccuracy(true);
          } else {
            setPoorAccuracy(false);
          }

          setUserLocation([latitude, longitude]);
          setIsTracking(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsTracking(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
      );
      watchIdRef.current = id;
    }
  };


  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {
      React.useEffect(() => {
    if (isDirectionPopupOpen) {
       const defaultText = userLocation ? "Current Location" : ".....";
       if (navigationDestination) {
          setOriginSearch(isRouteSwapped ? navigationDestination.name : (customOrigin ? customOrigin.name : defaultText));
          setDestSearch(isRouteSwapped ? (customOrigin ? customOrigin.name : defaultText) : navigationDestination.name);
       } else {
          setOriginSearch(customOrigin ? customOrigin.name : defaultText);
          setDestSearch("");
          setActiveDirectionInput('dest');
       }
    }
  }, [isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation]);
  
  const fetchRouteData = async () => {
        setIsRoutingLoading(true);
        try {
          const originObj = isRouteSwapped ? navigationDestination : customOrigin;
            const destObj = isRouteSwapped ? customOrigin : navigationDestination;
            const startLat = originObj ? originObj.lat : (userLocation ? userLocation[0] : 22.5726);
            const startLng = originObj ? originObj.lng : (userLocation ? userLocation[1] : 88.3639);
            const endLat = destObj ? destObj.lat : (userLocation ? userLocation[0] : 22.5726);
            const endLng = destObj ? destObj.lng : (userLocation ? userLocation[1] : 88.3639);
          
          // Walking Route
          const osrmUrl = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?steps=true&geometries=geojson&overview=full`;
          const response = await fetch(osrmUrl);
          const data = await response.json();
          
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRouteData({
              coordinates,
              distance: route.distance,
              duration: route.duration,
              steps: route.legs[0].steps
            });
          } else {
            setRouteData({
              coordinates: [[startLat, startLng], [endLat, endLng]],
              distance: 0, duration: 0, steps: []
            });
          }

          // Train Route Simulation
          const calculateRoute = (stationList, routeName) => {
            let nearestOrigin = null;
            let minOriginDist = Infinity;
            let nearestDest = null;
            let minDestDist = Infinity;
            
            stationList.forEach(station => {
              const distToUser = Math.sqrt(Math.pow(station.lat - startLat, 2) + Math.pow(station.lng - startLng, 2));
              if (distToUser < minOriginDist) {
                minOriginDist = distToUser;
                nearestOrigin = station;
              }
              
              const distToDest = Math.sqrt(Math.pow(station.lat - endLat, 2) + Math.pow(station.lng - endLng, 2));
              if (distToDest < minDestDist) {
                minDestDist = distToDest;
                nearestDest = station;
              }
            });

            return {
              originStation: nearestOrigin,
              destStation: nearestDest,
              walkToOriginDist: (minOriginDist * 111).toFixed(1),
              walkToDestDist: (minDestDist * 111).toFixed(1),
              trainName: routeName,
              trainDuration: Math.floor(Math.random() * 30) + 15,
              departureTime: new Date(Date.now() + 5 * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };
          };

          setTransitRouteData(calculateRoute(allTrains, '31914 - Sealdah Local'));
          setMetroRouteData(calculateRoute(allMetros, 'Blue Line Metro'));

        } catch (error) {
          console.error("Routing error:", error);
        }
        setIsRoutingLoading(false);
      };
      
      fetchRouteData();
    }
  }, [isDirectionPopupOpen, navigationDestination, userLocation, isRouteSwapped, customOrigin]);

  // --- Browser History Management for Modals ---
  React.useEffect(() => {
    if (isDirectionPopupOpen) {
      window.history.pushState({ id: 'direction' }, '');
    } else if (window.history.state?.id === 'direction') {
      window.history.back();
    }
  }, [isDirectionPopupOpen]);

  React.useEffect(() => {
    if (showUpdatePopup) {
      window.history.pushState({ id: 'update' }, '');
    } else if (window.history.state?.id === 'update') {
      window.history.back();
    }
  }, [showUpdatePopup]);
  React.useEffect(() => {
    if (isNearbyOpen) {
      window.history.pushState({ id: 'nearby' }, '');
    } else if (window.history.state?.id === 'nearby') {
      window.history.back();
    }
  }, [isNearbyOpen]);

  React.useEffect(() => {
    if (selectedLocation) {
      window.history.pushState({ id: 'preview' }, '');
    } else if (window.history.state?.id === 'preview') {
      window.history.back();
    }
  }, [selectedLocation]);

  React.useEffect(() => {
    if (showLocationPopup) {
      window.history.pushState({ id: 'location-popup' }, '');
    } else if (window.history.state?.id === 'location-popup') {
      window.history.back();
    }
  }, [showLocationPopup]);

  React.useEffect(() => {
    if (activeTab === 'routes') {
      window.history.pushState({ id: 'routes' }, '');
    } else if (window.history.state?.id === 'routes') {
      window.history.back();
    }
  }, [activeTab]);

  React.useEffect(() => {
    const handlePopState = (e) => {
      const stateId = e.state?.id;
      if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
      if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
      if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
      if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
      if (stateId !== 'direction' && isDirectionPopupOpen) setIsDirectionPopupOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isNearbyOpen, selectedLocation, showLocationPopup, activeTab, isDirectionPopupOpen]);
  // ---------------------------------------------

  React.useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleNavigateClick = async () => {
    if (isTracking && userLocation) {
              setNavigationDestination(selectedLocation);
        setIsDirectionPopupOpen(true);
      return;
    }
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        startTracking();
                setNavigationDestination(selectedLocation);
        setIsDirectionPopupOpen(true);
      } else {
        setShowLocationPopup(true);
      }
    } catch (err) {
      setShowLocationPopup(true);
    }
  };

  const handleLocateClick = async (e) => {
    if (e) e.stopPropagation();
    
    if (isTracking && userLocation) {
      setFollowingStatus(true);
      setMapCenter([...userLocation]);
      setMapZoom(17);
      return;
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        startTracking();
      } else {
        setShowLocationPopup(true);
      }
    } catch (error) {
      setShowLocationPopup(true);
    }
  };

  const filteredData = locationData.filter(loc => activeFilters.includes(loc.type));
  
  const getRawDist = (loc) => {
    if (!userLocation) return Infinity;
    return getDistance(userLocation[0], userLocation[1], loc.lat, loc.lng);
  };

  const getDistString = (rawDist) => {
    if (rawDist === Infinity) return '';
    return rawDist < 1 ? `${Math.round(rawDist * 1000)} m away` : `${rawDist.toFixed(1)} km away`;
  };

  const nearbySearchList = React.useMemo(() => {
    const list = [...filteredData].map(loc => ({ ...loc, rawDist: getRawDist(loc) }));
    list.sort((a, b) => a.rawDist - b.rawDist);
    return list.slice(0, 5);
  }, [userLocation, filteredData]);

  const searchResults = React.useMemo(() => {
    if (searchQuery.trim() === '') return [];
    const query = searchQuery.toLowerCase().trim();
    const matches = filteredData
      .filter(loc => {
        const nameMatch = loc.name ? loc.name.toLowerCase().includes(query) : false;
        const catMatch = loc.category ? loc.category.toLowerCase().includes(query) : false;
        const typeMatch = loc.type ? loc.type.toLowerCase().includes(query) : false;
        return nameMatch || catMatch || typeMatch;
      })
      .map(loc => ({ ...loc, rawDist: getRawDist(loc) }));
    matches.sort((a, b) => a.rawDist - b.rawDist);
    return matches.slice(0, 5);
  }, [searchQuery, userLocation, filteredData]);

  const handleMarkerClick = (loc) => {
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(16);
  };

  const handleSearchSelect = (loc) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    setSelectedLocation(loc);
    setMapCenter([loc.lat, loc.lng]);
    setMapZoom(16);
  };

  const getItemTheme = (type) => {
    switch(type) {
      case 'pandal': 
          return { 
            color: '#b4860b', 
            bg: '#fee2e2', 
            icon: <img src="/pandel-icon.png" alt="pandal" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };
      case 'toilet': 
          return { 
            color: '#0d9488', 
            bg: '#ccfbf1', 
            icon: <img src="/toilet-icon.png" alt="toilet" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };
      case 'metro': 
          return { 
            color: '#2563eb', 
            bg: '#dbeafe', 
            icon: <img src="/metro-icon.png" alt="metro" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };
      case 'train': 
          return { 
            color: '#9333ea', 
            bg: '#f3e8ff', 
            icon: <img src="/train-icon.png" alt="train" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };
      default: 
        return { 
          color: '#6b7280', 
          bg: '#f3f4f6', 
          icon: <Search size={20} /> 
        };
    }
  };

  const renderSearchItem = (loc) => {
      const theme = getItemTheme(loc.type);
      const distStr = getDistString(loc.rawDist);
      let distFormatted = distStr ? distStr.replace(' away', '') : '';
        if (!distFormatted) {
          const pseudoRandom = Math.floor((loc.lat + loc.lng) * 100000) % 950 + 50;
          distFormatted = pseudoRandom < 1000 ? `${pseudoRandom} m` : `${(pseudoRandom / 1000).toFixed(1)} km`;
        }
      const categoryDisplay = loc.category ? `${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • ${loc.category}` : loc.type;
  
      return (
        <div 
          key={loc.id} 
          className="px-5 flex items-center justify-between cursor-pointer"
            style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '7px', paddingBottom: '7px' }}
          onMouseDown={() => handleSearchSelect(loc)}
        >
          <div className="flex-1 min-w-0 pr-2">
            <div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {theme.icon}
              </div>
              {loc.name}
            </div>
            <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
              <div className="shrink-0 flex flex-col items-end justify-center">
                <div className="text-[13px] font-extrabold" style={{ color: theme.color }}>{distFormatted}</div>
                <div className="text-[10px]" style={{ color: '#9ca3af', marginTop: '-2px' }}>away</div>
              </div>
            )}
        </div>
      );
    };

  return (
    <div className={`map-page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Top Search & Filter Bar */}
      <div className="map-top-bar">
        <div className="map-search-container relative">
          <button onClick={onClose} className="map-back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="map-search-bar" style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'white', borderRadius: '999px', padding: '12px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
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
              className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"
              style={{
                  left: '4px',
                  right: '4px',
                  width: 'auto',
                  marginTop: '12px',
                  backgroundColor: '#ffffff',
                opacity: 1,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                borderRadius: '24px',
                padding: '16px 13px',
                maxHeight: '65vh'
              }}
            >
                {/* UNCONDITIONAL NEARBY HEADING */}
                <div style={{ padding: '8px 20px 8px 1px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#9ca3af', marginTop: '-13px', marginBottom: '4px', borderBottom: '1px solid #e5e7eb', display: 'block', width: '100%', textAlign: 'left' }}>Matches Nearby</div>
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
                            className="px-5 flex items-center justify-between cursor-pointer"
            style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '7px', paddingBottom: '7px' }}
                            onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea' }}>
                                  <Home size={16} />
                                </div>
                                Home
                              </div>
                              <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' }}>
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

        {/* Filter Pills & Controls */}
        {!isSearchFocused && (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>
          <div className="map-filter-scroll hide-scrollbar" style={{ flex: 1 }}>
            <button 
              onClick={() => handleFilterClick('pandal')}
              className={`map-filter-pill ${activeFilters.includes('pandal') ? 'active-pandal' : ''}`}
            >
              <img src="/pandel-icon.png" width="12" height="12" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                PANDALS
            </button>
            <button 
              onClick={() => handleFilterClick('toilet')}
              className={`map-filter-pill ${activeFilters.includes('toilet') ? 'active-toilet' : ''}`}
            >
              <img src="/toilet-icon.png" width="12" height="12" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                TOILETS
            </button>
            <button 
              onClick={() => handleFilterClick('metro')}
              className={`map-filter-pill ${activeFilters.includes('metro') ? 'active-metro' : ''}`}
            >
              <img src="/metro-icon.png" width="12" height="12" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                METRO
            </button>
            <button 
              onClick={() => handleFilterClick('train')}
              className={`map-filter-pill ${activeFilters.includes('train') ? 'active-train' : ''}`}
            >
              <img src="/train-icon.png" width="12" height="12" alt="train" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                TRAIN
            </button>
          </div>
          
          
          </div>
        )}
        </div>

        {/* Map Area */}
      <div className="map-wrapper">
        <MapContainer 
          center={[22.5726, 88.3639]} 
          zoom={12} 
          zoomControl={false}
          rotate={true}
          touchRotate={true}
          rotateControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            key={isDarkMode ? 'dark' : 'light'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={isDarkMode 
              ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}`
              : `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}`
            }
            maxZoom={20}
          />
          
          <RecenterMap center={mapCenter} zoom={mapZoom} />
          <MapEvents onDrag={() => setFollowingStatus(false)} />
          <LiveTracker isFollowing={isFollowing} position={userLocation} />
          {isDirectionPopupOpen && navigationDestination && routeData && activeDirectionMode === 'footprints' && (
            <Polyline positions={routeData.coordinates} color="#3b82f6" weight={5} opacity={0.8} />
          )}
          {isDirectionPopupOpen && navigationDestination && transitRouteData && activeDirectionMode === 'train' && transitRouteData.originStation && transitRouteData.destStation && (
            <>
              <Polyline positions={[[renderStartLat, renderStartLng], [transitRouteData.originStation.lat, transitRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[transitRouteData.originStation.lat, transitRouteData.originStation.lng], [transitRouteData.destStation.lat, transitRouteData.destStation.lng]]} color="#16a085" weight={5} />
              <Polyline positions={[[transitRouteData.destStation.lat, transitRouteData.destStation.lng], [renderEndLat, renderEndLng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}
          {isDirectionPopupOpen && navigationDestination && metroRouteData && activeDirectionMode === 'metro' && metroRouteData.originStation && metroRouteData.destStation && (
            <>
              <Polyline positions={[[renderStartLat, renderStartLng], [metroRouteData.originStation.lat, metroRouteData.originStation.lng]]} color="#6b7280" weight={4} dashArray="5, 10" />
              <Polyline positions={[[metroRouteData.originStation.lat, metroRouteData.originStation.lng], [metroRouteData.destStation.lat, metroRouteData.destStation.lng]]} color="#8b5cf6" weight={5} />
              <Polyline positions={[[metroRouteData.destStation.lat, metroRouteData.destStation.lng], [renderEndLat, renderEndLng]]} color="#6b7280" weight={4} dashArray="5, 10" />
            </>
          )}

          <CustomMapControls handleLocateClick={handleLocateClick} isFollowing={isFollowing} />

          {userLocation && (
            <Marker 
              position={userLocation}
              icon={L.divIcon({
                className: 'custom-user-marker',
                html: `<div class="user-location-dot"><div class="pulse"></div></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
              zIndexOffset={1000} // Keep it above other markers
            />
          )}

          {(() => {
            const createClusterIcon = (cluster) => {
              const childCount = cluster.getChildCount();
              let c = ' marker-cluster-';
              if (childCount < 10) { c += 'small'; }
              else if (childCount < 100) { c += 'medium'; }
              else { c += 'large'; }
              
              let bgColor = '#c8963e';
              if (activeFilters.includes('toilet')) bgColor = '#2980b9';
              if (activeFilters.includes('metro')) bgColor = '#16a085';
              if (activeFilters.includes('train')) bgColor = '#8e44ad';

              return new L.DivIcon({ 
                html: `<div style="background-color: ${bgColor} !important; color: white; opacity: 0.9;"><span>${childCount}</span></div>`, 
                className: 'marker-cluster' + c, 
                iconSize: new L.Point(40, 40) 
              });
            };

            const pandalIconBright = new L.Icon({
              iconUrl: '/pandal-pin4.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const pandalIconDark = new L.Icon({
              iconUrl: '/pandel-pin6.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const toiletIconBright = new L.Icon({
              iconUrl: '/toilet-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const toiletIconDark = new L.Icon({
              iconUrl: '/toilet-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const metroIconBright = new L.Icon({
              iconUrl: '/metro-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const metroIconDark = new L.Icon({
              iconUrl: '/metro-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const trainIconBright = new L.Icon({
              iconUrl: '/train-day.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            const trainIconDark = new L.Icon({
              iconUrl: '/train-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            
            return (
              <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} disableClusteringAtZoom={17} maxClusterRadius={40}>
                {filteredData.map(loc => {
                  let markerIcon;
                  if (loc.type === 'pandal') {
                    markerIcon = isDarkMode ? pandalIconDark : pandalIconBright;
                  } else if (loc.type === 'toilet') {
                    markerIcon = isDarkMode ? toiletIconDark : toiletIconBright;
                  } else if (loc.type === 'metro') {
                    markerIcon = isDarkMode ? metroIconDark : metroIconBright;
                  } else if (loc.type === 'train') {
                    markerIcon = isDarkMode ? trainIconDark : trainIconBright;
                  } else {
                    markerIcon = createCustomIcon(loc.type, loc.count);
                  }
                  
                  return (
                    <Marker 
                      key={loc.id} 
                      position={[loc.lat, loc.lng]} 
                      eventHandlers={{
                        click: () => handleMarkerClick(loc)
                      }}
                      {...(markerIcon ? { icon: markerIcon } : {})}
                    />
                  );
                })}
              </MarkerClusterGroup>
            );
          })()}
        </MapContainer>
      </div>

      {/* Bottom Floating Preview Card */}
      <div className={`map-preview-card ${selectedLocation ? 'active' : ''}`}>
        <div className="detailed-preview-card">
          <div className="preview-header">
            <div className="preview-icon-box">
{selectedLocation?.type === 'toilet' ? (
                <img src="/toilet-icon.png" alt="toilet" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'metro' ? (
                <img src="/metro-icon.png" alt="metro" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'train' ? (
                <img src="/train-icon.png" alt="train" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : (
                <img src="/pandel-icon.png" alt="pandal" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              )}
</div>
            <div className="preview-title-block">
              <h3 className="preview-title">{selectedLocation ? selectedLocation.name : 'Select a location'}</h3>
              <p className="preview-subtitle">Ballygunge Place, Ballygunge</p>
            </div>
            <button className="preview-close-btn" onClick={() => setSelectedLocation(null)}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {(!selectedLocation || selectedLocation.type === 'pandal') && (
          <>
            <div className="preview-status-row">
            <div className="preview-status-card rain">
              <div className="status-card-header">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> Rain status
              </div>
              <div className="status-card-value">...</div>
              <div className="status-card-desc">No recent reports</div>
            </div>
            <div className="preview-status-card crowd">
              <div className="status-card-header">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#6b7280" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Crowd level
              </div>
              <div className="status-card-value">...</div>
              <div className="status-card-desc">Waiting for an update</div>
            </div>
          </div>

          <div className="preview-update-card">
            <div className="flex gap-3">
              <div className="mt-1">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#d97706">
                  <path d="M11 17l-5-5 5-5v10z" />
                  <path d="M18 17l-5-5 5-5v10z" />
                </svg>
              </div>
              <div className="update-text-block">
                <div className="update-title">Visited recently?</div>
                <div className="update-desc">Help others — your update is valid for 30 minutes</div>
              </div>
            </div>
            <button className="update-btn" onClick={() => setShowUpdatePopup(true)}>Update now ›</button>
          </div>

          <div className="preview-metro-info">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
              <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
            </svg>
            <span className="metro-name">Jatin Das Park</span> • exit <span className="metro-gate">Gate 3</span> • 2.4 km walk
          </div>
          </>
        )}

            <div className="preview-actions">
            <button className="btn-navigate" onClick={handleNavigateClick} style={{ flex: (!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') ? undefined : 1 }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
              </svg>
              Navigate
            </button>
            {(!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') && (
                <button className={`btn-route ${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}`} onClick={() => {
                    if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        setPlannedStops([...plannedStops, selectedLocation]);
                        setActiveTab('routes');
                      } else {
                        setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                      }
                    }
                  }}>
                    {selectedLocation && selectedLocation.type === 'train' ? (
                      <><Clock size={18} /> Timetable</>
                    ) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    ) : (
                      <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                    )}
                  </button>
            )}
          </div>
        </div>
      </div>

      {/* Poor GPS Warning */}
      {poorAccuracy && (
        <button 
          className="poor-gps-warning"
          onClick={(e) => { e.stopPropagation(); startTracking(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Poor GPS signal. Tap to force refresh.
        </button>
      )}
  
        {/* Left Action Buttons */}
        <div style={{ 
          position: 'absolute', 
          bottom: '90px', 
          left: '16px', 
          zIndex: 1000, 
          display: 'flex', 
          flexDirection: 'column',
          pointerEvents: 'none' 
        }}>
          <button 
            className="map-action-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="map-action-btn" onClick={() => { setNavigationDestination(null); setIsRouteSwapped(false); setIsDirectionPopupOpen(true); }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill={isDarkMode ? '#f9fafb' : 'black'}>
              <path d="M6 21 V11 a2 2 0 0 1 2-2 H13 V4 L19 10 L13 16 V11 H8 V21 Z" />
            </svg>
          </button>
        </div>

        {/* Nearby Overlay & Bottom Sheet */}
      <div className={`map-nearby-overlay ${isNearbyOpen ? 'open' : ''}`} onClick={() => setIsNearbyOpen(false)} />
      <div className={`map-nearby-sheet ${isNearbyOpen ? 'open' : ''}`}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer" onClick={() => setIsNearbyOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex justify-center items-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
                <path d="M12 4 L14 8 H10 Z" />
                <path d="M6 9 h12 v3 H6 Z" />
                <path d="M7 12 h2 v8 H7 Z" />
                <path d="M15 12 h2 v8 H15 Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm m-0">{userLocation ? `${nearbyPandals.length} pandals nearby` : "5 pandals nearby"}</h3>
              <p className="text-gray-500 text-xs m-0">Tap a pandal to preview • + to add to route</p>
            </div>
          </div>
          <ChevronUp className="text-gray-400" />
        </div>
        <div className="p-0 flex flex-col overflow-y-auto">
          {userLocation && nearbyPandals.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No pandals within 1 km.</div>
          ) : (
            nearbyPandals.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-50 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
                    <path d="M12 4 L14 8 H10 Z" />
                    <path d="M6 9 h12 v3 H6 Z" />
                    <path d="M7 12 h2 v8 H7 Z" />
                    <path d="M15 12 h2 v8 H15 Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm m-0 leading-tight">{item.name}</h4>
                  <p className="text-gray-500 text-xs m-0 mt-0.5">{item.dist} • {item.category}</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
                  <Plus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Routes View Overlay */}
      {activeTab === 'routes' && (
        <div className="routes-view-container">
          <div className="routes-header">
            <div>
              <h2 className="routes-header-title">Your route</h2>
              <p className="routes-header-subtitle">Tonight • 0 stops planned</p>
            </div>
            <div className="routes-menu-container">
              <button 
                className="routes-header-menu"
                onClick={() => setIsRouteMenuOpen(!isRouteMenuOpen)}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="12" cy="5" r="1"></circle>
                  <circle cx="12" cy="19" r="1"></circle>
                </svg>
              </button>
              
              {isRouteMenuOpen && (
                <div className="routes-dropdown-menu">
                  <button 
                    className="routes-dropdown-item"
                    onClick={() => {
                      // Add clear route logic here if needed in the future
                      setIsRouteMenuOpen(false);
                    }}
                  >
                    Clear route
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="routes-content" style={{ paddingBottom: '100px', backgroundColor: '#fafafa', minHeight: '100%' }}>
            {plannedStops.length === 0 ? (
              <div className="routes-empty-card">
                <div className="routes-empty-icon" style={{ borderColor: '#fef3c7' }}>
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l19-9-9 19-2-8-8-2z" />
                  </svg>
                </div>
                <h3 className="routes-empty-title">No stops yet</h3>
                <p className="routes-empty-desc">
                  Tap any pandal, metro or toilet on the map and add it to plan your route.
                </p>
                <button className="routes-browse-btn" onClick={() => { setActiveTab('map'); setSelectedLocation(null); }} style={{ backgroundColor: '#7c2d12', color: 'white' }}>
                  Browse the map
                </button>
              </div>
            ) : (
              <div className="routes-active-itinerary">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 16px 8px 16px', backgroundColor: 'white' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Your route</h2>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Tonight • {plannedStops.length} stops planned</p>
                  </div>
                  <button style={{ color: '#4b5563' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                  </button>
                </div>

                {/* Metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Stops</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{(plannedStops.length * 12.3).toFixed(1)} km</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Distance</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827' }}>{plannedStops.length * 23}m</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Est. time</div>
                  </div>
                </div>

                {/* Minimap Placeholder */}
                <div style={{ height: '180px', backgroundColor: '#e5e7eb', width: '100%', position: 'relative' }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: 'url(https://unpkg.com/leaflet@1.9.4/dist/images/layers.png)', backgroundSize: 'cover', opacity: 0.5 }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#7c2d12', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    <img src="/pandel-icon.png" alt="pandal" style={{ width: "16px", height: "16px", filter: "invert(1)" }} />
                  </div>
                </div>

                <div style={{ padding: '20px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Route timeline ({plannedStops.length}) <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'normal', marginLeft: '4px' }}>{plannedStops.length}/10</span></h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }} onClick={() => setPlannedStops([])}>Clear all</button>
                      <button style={{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>Edit stops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    </div>
                  </div>

                  <div className="route-timeline-list" style={{ position: 'relative' }}>
                    {plannedStops.map((stop, idx) => (
                      <div key={idx} style={{ display: 'flex', marginBottom: '0', position: 'relative', paddingBottom: '24px' }}>
                        {idx < plannedStops.length - 1 && <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: '0', width: '2px', backgroundColor: '#fcd34d', zIndex: 0 }}></div>}
                        
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#111827', zIndex: 1, flexShrink: 0, marginRight: '16px' }}>
                          {idx + 1}
                        </div>
                        
                        <div style={{ flex: 1, paddingBottom: '24px', borderBottom: idx < plannedStops.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '2px' }}>{stop.name}</div>
                              <div style={{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' }}>{stop.type}</div>
                              <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>ETA {idx * 15 + 10}m • {(idx * 2.4 + 1.2).toFixed(1)} km</div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', color: '#9ca3af' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c2d12', marginRight: '16px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </div>
                      <div>
                        <div style={{ color: '#7c2d12', fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Next stop</div>
                        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' }}>Search pandals or add from map</div>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>

                {/* FAB Overlay */}
                <div style={{ position: 'fixed', bottom: '80px', left: '0', right: '0', padding: '0 16px', zIndex: 100 }}>
                  <button className="start-nav-fab" style={{ width: '100%', backgroundColor: '#7c2d12', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 8px 24px rgba(124, 45, 18, 0.4)', gap: '8px' }} onClick={() => {
                    if (plannedStops.length > 0) {
                      setNavigationDestination(plannedStops[0]);
                      setActiveDirectionMode('car');
                      setIsDirectionPopupOpen(true);
                    }
                  }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                    </svg>
                    Start navigation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="map-bottom-nav">
        <div className="flex justify-around items-center h-full bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <button 
            className="flex flex-col items-center justify-center w-full h-full" 
            style={{ color: activeTab === 'map' ? '#dc2626' : '#9ca3af' }}
            onClick={() => setActiveTab('map')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}>
              <path d="M 3 21 L 21 21 L 17 13 L 7 13 Z" />
              <path d="M 8.5 13 L 12 21 L 15.5 13" />
              <path d="M12 2 C8.5 2 5.5 4.5 5.5 8 C5.5 12.5 12 17.5 12 17.5 C12 17.5 18.5 12.5 18.5 8 C18.5 4.5 15.5 2 12 2 Z" fill="#ffffff" />
              <circle cx="12" cy="8" r="2.5" />
            </svg>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Map</span>
          </button>
          <button 
              className="flex flex-col items-center justify-center w-full h-full relative" 
              style={{ color: activeTab === 'routes' ? '#7c2d12' : '#9ca3af' }}
              onClick={() => setActiveTab('routes')}
            >
              {plannedStops.length > 0 && (
                <div style={{ position: 'absolute', top: '4px', right: '25%', backgroundColor: '#7c2d12', color: 'white', fontSize: '9px', fontWeight: 'bold', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {plannedStops.length}
                </div>
              )}
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginBottom: '4px' }}>
              <path d="M 7 2 C 4.24 2 2 4.24 2 7 C 2 11.5 7 16 7 16 C 7 16 12 11.5 12 7 C 12 4.24 9.76 2 7 2 Z M 7 9 C 5.9 9 5 8.1 5 7 C 5 5.9 5.9 5 7 5 C 8.1 5 9 5.9 9 7 C 9 8.1 8.1 9 7 9 Z" fill="currentColor" />
              <path d="M 17 8 C 14.24 8 12 10.24 12 13 C 12 17.5 17 22 17 22 C 17 22 22 17.5 22 13 C 22 10.24 19.76 8 17 8 Z M 17 15 C 15.9 15 15 14.1 15 13 C 15 11.9 15.9 11 17 11 C 18.1 11 19 11.9 19 13 C 19 14.1 18.1 15 17 15 Z" fill="currentColor" />
              <path d="M 11.5 6 L 16.5 6 C 17.6 6 18.2 6.8 17.5 7.7 L 6.5 16.3 C 5.8 17.2 6.4 18 7.5 18 L 12.5 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Routes</span>
          </button>
        </div>
      </div>

      {/* Location Request Popup */}
      {showLocationPopup && (
        <div className="location-popup-overlay" onClick={() => setShowLocationPopup(false)}>
          <div className="location-popup-card" onClick={e => e.stopPropagation()}>
            <button className="location-popup-close" onClick={() => setShowLocationPopup(false)}>
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 1L1 13M1 1l12 12" />
              </svg>
            </button>
            <div className="location-popup-icon-container">
              <div className="location-popup-icon-bg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#b91c1c">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
            <h2 className="location-popup-title">Turn on location to find you</h2>
            <p className="location-popup-desc">
              Sharodiya needs your location to centre the map on where you are and show pandals near you.
            </p>
            <button className="location-popup-allow" onClick={startTracking}>
              Allow location
            </button>
            <button className="location-popup-deny" onClick={() => setShowLocationPopup(false)}>
              Not now
            </button>
          </div>
        </div>
      )}
    
      {/* Direction Popup Overlay */}
      {isDirectionPopupOpen && (
        <div className={`direction-popup-wrapper ${isDarkMode ? 'dark-mode' : ''} ${navigationDestination ? 'is-navigating' : ''}`}>
          {/* Header */}
          <div className="direction-header">
            <div className="direction-top-row">
              <button className="direction-back-btn" onClick={() => { setIsDirectionPopupOpen(false); setSelectedLocation(null); }}>
                <ArrowLeft size={24} />
              </button>
              <div className="direction-inputs-container">
                <div className="direction-input-group">
                  <div className="direction-dots">
                    <Home size={14} color="#3b82f6" style={{ marginBottom: '2px' }} />
                    <div className="dot-line" />
                    <MapPin size={16} color="#ea4335" style={{ marginTop: '4px' }} />
                  </div>
                  <div className="direction-input-fields">
    <input type="text" className="direction-input" placeholder="Current Location" 
      value={isRouteSwapped ? destSearch : originSearch} 
      onChange={(e) => {
        if (isRouteSwapped) {
           setDestSearch(e.target.value);
           setActiveDirectionInput('dest');
           if (navigationDestination) setNavigationDestination(null);
        } else {
           setOriginSearch(e.target.value);
           setActiveDirectionInput('origin');
           if (customOrigin) setCustomOrigin(null);
        }
      }}
      onFocus={() => setActiveDirectionInput(isRouteSwapped ? 'dest' : 'origin')}
    />
    <input type="text" className="direction-input" placeholder="Destination" 
      value={isRouteSwapped ? originSearch : destSearch} 
      onChange={(e) => {
        if (isRouteSwapped) {
           setOriginSearch(e.target.value);
           setActiveDirectionInput('origin');
           if (customOrigin) setCustomOrigin(null);
        } else {
           setDestSearch(e.target.value);
           setActiveDirectionInput('dest');
           if (navigationDestination) setNavigationDestination(null);
        }
      }}
      onFocus={() => setActiveDirectionInput(isRouteSwapped ? 'origin' : 'dest')}
    />
  </div>
                </div>
                <button className="direction-swap-btn" onClick={() => {
    setIsRouteSwapped(prev => !prev);
      const newOrigin = isRouteSwapped ? customOrigin : navigationDestination;
      if (newOrigin) {
         setMapCenter([newOrigin.lat, newOrigin.lng]);
      } else if (userLocation) {
         setMapCenter([userLocation[0], userLocation[1]]);
      }
  }}>
                  <ArrowUpDown size={20} />
                </button>
              </div>
            </div>
            
            {!navigationDestination && (
              <div className="direction-modes">
                <button className={`mode-btn ${activeDirectionMode === 'car' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('car')}><img src="/pandel-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal mode" /></button>
                <button className={`mode-btn ${activeDirectionMode === 'bike' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('bike')}><img src="/toilet-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet mode" /></button>
                <button className={`mode-btn ${activeDirectionMode === 'train' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('train')}><img src="/metro-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro mode" /></button>
                <button className={`mode-btn ${activeDirectionMode === 'footprints' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('footprints')}><img src="/train-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="train mode" /></button>
              </div>
            )}
          </div>
          
          {/* List */}
            {navigationDestination ? (
              <div className="navigation-details-panel">
                <div className="nav-bottom-tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', gap: '16px' }}>
                  <button className={`nav-tab-btn ${activeDirectionMode === 'footprints' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('footprints')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'footprints' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'footprints' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Footprints size={24} />
                  </button>
                  <button className={`nav-tab-btn ${activeDirectionMode === 'metro' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('metro')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'metro' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'metro' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <TramFront size={24} />
                  </button>
                  <button className={`nav-tab-btn ${activeDirectionMode === 'train' ? 'active' : ''}`} onClick={() => setActiveDirectionMode('train')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'train' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'train' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Train size={24} />
                  </button>
                </div>
                {isRoutingLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Calculating route...</div>
                ) : activeDirectionMode === 'footprints' && routeData ? (
                  <div className="walk-directions">
                    <div className="walk-summary">
                      <div className="walk-time">
                        {(() => {
                          const totalMins = Math.ceil(routeData.duration / 60);
                          return totalMins >= 60 ? `${Math.floor(totalMins / 60)} hr ${totalMins % 60} min` : `${totalMins} min`;
                        })()}
                        {' '}
                        <span className="walk-dist">({(routeData.distance / 1000).toFixed(1)} km)</span>
                      </div>
                      <div className="walk-warning">Use caution – walking directions may not always reflect real-world conditions.</div>
                    </div>
                    <div className="walk-steps">
                      <div className="step-item">
                        <div className="step-icon-col"><div className="dot-icon blue"></div></div>
                        <div className="step-content border-b">{isRouteSwapped ? navigationDestination.name : (userLocation ? "Current Location" : ".....")}</div>
                      </div>
                      {routeData.steps.map((step, idx) => (
                        <div className="step-item" key={idx}>
                          <div className="step-icon-col">
                            {step.maneuver.type.includes('turn') || step.maneuver.modifier ? (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                            )}
                          </div>
                          <div className="step-content border-b">
                            <div className="step-instruction">{step.maneuver.instruction || `Head ${step.maneuver.modifier || 'straight'}`}</div>
                            <div className="step-distance">{step.distance} m</div>
                          </div>
                        </div>
                      ))}
                      <div className="step-item">
                        <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                        <div className="step-content border-b">{isRouteSwapped ? (userLocation ? "Current Location" : ".....") : navigationDestination.name}</div>
                      </div>
                    </div>
                    <div className="start-btn-container">
                      <button className="nav-start-btn"><svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" /></svg> Start</button>
                    </div>
                  </div>
                ) : (activeDirectionMode === 'train' || activeDirectionMode === 'metro') ? (
                  (() => {
                    const activeRoute = activeDirectionMode === 'train' ? transitRouteData : metroRouteData;
                    if (!activeRoute) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading route...</div>;
                    return (
                      <div className="transit-directions">
                        <div className="transit-summary">
                          <div className="transit-time">
                            {(() => {
                              const totalMins = Math.ceil((parseFloat(activeRoute.walkToOriginDist) + parseFloat(activeRoute.walkToDestDist))*15) + activeRoute.trainDuration;
                              return totalMins >= 60 ? `${Math.floor(totalMins / 60)} hr ${totalMins % 60} min` : `${totalMins} min`;
                            })()}
                          </div>
                          <div className="transit-depart">Leave {activeRoute.departureTime}</div>
                        </div>
                        <div className="transit-steps">
                          <div className="step-item">
                            <div className="step-icon-col"><div className="dot-icon blue"></div><div className="dotted-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">{isRouteSwapped ? navigationDestination.name : (userLocation ? "Current Location" : ".....")}</div>
                              <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(activeRoute.walkToOriginDist * 15).toFixed(0)} min ({activeRoute.walkToOriginDist} km)</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><div className="train-circle-icon">{activeDirectionMode === 'metro' ? <TramFront size={14} color="white"/> : <Train size={14} color="white"/>}</div><div className="solid-line blue-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.originStation?.name || 'Nearest Station'}</div>
                              <div className="step-pill" style={{ backgroundColor: activeDirectionMode === 'metro' ? '#ede9fe' : '#e0e7ff', color: activeDirectionMode === 'metro' ? '#5b21b6' : '#3730a3' }}>{activeRoute.trainName}</div>
                              <div className="step-subtitle">On time • Platform 2</div>
                              <div className="step-detail">Ride {activeRoute.trainDuration} min</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><div className="train-circle-icon">{activeDirectionMode === 'metro' ? <TramFront size={14} color="white"/> : <Train size={14} color="white"/>}</div><div className="dotted-line"></div></div>
                            <div className="step-content">
                              <div className="step-title">{activeRoute.destStation?.name || 'Destination Station'}</div>
                              <div className="step-instruction" style={{marginTop: '12px'}}><Footprints size={14}/> Walk {(activeRoute.walkToDestDist * 15).toFixed(0)} min ({activeRoute.walkToDestDist} km)</div>
                            </div>
                          </div>
                          <div className="step-item">
                            <div className="step-icon-col"><MapPin size={18} color="#ea4335" /></div>
                            <div className="step-content">{isRouteSwapped ? (userLocation ? "Current Location" : ".....") : navigationDestination.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Select Walk or Train mode for directions</div>
                )}
              </div>
            ) : (
              <>
            {/* Static Home Button (Pinned) */}
            <div className="direction-list-item" style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', zIndex: 5, paddingBottom: 0, cursor: 'pointer' }} onClick={() => {
    const targetInput = isRouteSwapped ? (activeDirectionInput === 'origin' ? 'dest' : 'origin') : activeDirectionInput;
    if (targetInput === 'origin') {
       setCustomOrigin(null);
       setOriginSearch(userLocation ? "Current Location" : ".....");
    } else {
       if (userLocation) {
          setNavigationDestination({ name: 'Home', lat: userLocation[0], lng: userLocation[1], type: 'home' });
          setDestSearch('Home');
       }
    }
  }}>
              <div className="item-icon home"><Home size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title" style={{ color: isDarkMode ? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: '600' }}>Home</div>
                <div className="item-subtitle">{homeAddress}</div>
              </div>
            </div>
            
            <div className="direction-list">
                {(() => {
                  let locs = [];
                  if (activeDirectionMode === 'car') locs = allPujos;
                  else if (activeDirectionMode === 'bike') locs = allToilets;
                  else if (activeDirectionMode === 'train') locs = allMetros;
                  else if (activeDirectionMode === 'footprints') locs = allTrains;
                  let sorted = [...locs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                  const filterText = activeDirectionInput === 'origin' ? originSearch : destSearch;
                  if (filterText && filterText !== "Current Location" && filterText !== ".....") {
                    const lower = filterText.toLowerCase();
                    sorted = sorted.filter(l => (l.name || '').toLowerCase().includes(lower));
                  }
                  if (sorted.length === 0) return <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '15px' }}>No result found</div>;
                  return null;
                })()}
                {(() => {
                let locs = [];
                if (activeDirectionMode === 'car') locs = allPujos;
                else if (activeDirectionMode === 'bike') locs = allToilets;
                else if (activeDirectionMode === 'train') locs = allMetros;
                else if (activeDirectionMode === 'footprints') locs = allTrains;
                let sorted = [...locs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                  const filterText = activeDirectionInput === 'origin' ? originSearch : destSearch;
                  if (filterText && filterText !== "Current Location" && filterText !== ".....") {
                    const lower = filterText.toLowerCase();
                    sorted = sorted.filter(l => (l.name || '').toLowerCase().includes(lower));
                  }
                  return sorted;
                })().map((loc, index, arr) => (
                  <div className="direction-list-item" key={index} onClick={() => {
                        const targetInput = isRouteSwapped ? (activeDirectionInput === 'origin' ? 'dest' : 'origin') : activeDirectionInput;
                        if (targetInput === 'origin') {
                           setCustomOrigin(loc);
                           setOriginSearch(loc.name);
                        } else {
                           setNavigationDestination(loc);
                           setDestSearch(loc.name);
                        }
                    }}>
                  <div className="item-icon">
                    {activeDirectionMode === 'car' && <img src="/pandel-icon.png" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal" />}
                    {activeDirectionMode === 'bike' && <img src="/toilet-icon.png" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet" />}
                    {activeDirectionMode === 'train' && <img src="/metro-icon.png" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro" />}
                    {activeDirectionMode === 'footprints' && <img src="/train-icon.png" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="train" />}
                  </div>
                  <div className={`item-content ${index !== arr.length - 1 ? 'border-b' : ''}`}>
                    <div className="item-title" style={{ color: isDarkMode ? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: '600' }}>{loc.name}</div>
                    <div className="item-subtitle">{loc.address || 'Kolkata, West Bengal'}</div>
                  </div>
                </div>
              ))}
            </div>
            </>
            )}
          </div>
        )}


        {/* Share Live Update Popup */}
        {showUpdatePopup && (
          <div className="share-update-overlay" onClick={() => setShowUpdatePopup(false)}>
            <div className="share-update-popup" onClick={e => e.stopPropagation()}>
              <div className="share-popup-header">
                <button className="share-popup-close" onClick={() => setShowUpdatePopup(false)}>
                  <X size={16} />
                </button>
                <h3 className="share-popup-title">Share live update</h3>
              </div>
              
              <div className="share-popup-location">
                <div className="preview-icon-box">
{selectedLocation?.type === 'toilet' ? (
                <img src="/toilet-icon.png" alt="toilet" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'metro' ? (
                <img src="/metro-icon.png" alt="metro" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'train' ? (
                <img src="/train-icon.png" alt="train" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : (
                <img src="/pandel-icon.png" alt="pandal" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              )}
</div>
                <div className="preview-title-block">
                  <h4 className="share-loc-title">{selectedLocation ? selectedLocation.name : 'Unknown Location'}</h4>
                  <p className="share-loc-subtitle">◈ {selectedLocation?.address || 'Ballygunge Place, Ballygunge'}</p>
                </div>
              </div>
              
              <p className="share-popup-desc">
                Your update helps other pujo lovers. Valid for 30 minutes.
              </p>
              
              <div className="share-section">
                <h4 className="share-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> 
                  Rain status
                </h4>
                <div className="rain-options">
                  <button className={`rain-btn ${rainStatus === 'no_rain' ? 'active' : ''}`} onClick={() => setRainStatus('no_rain')}>
                    <Sun size={24} color={rainStatus === 'no_rain' ? '#cc5550' : '#6b7280'} />
                    <span>No rain</span>
                  </button>
                  <button className={`rain-btn ${rainStatus === 'drizzle' ? 'active' : ''}`} onClick={() => setRainStatus('drizzle')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'drizzle' ? '#2563eb' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 16v6"></path><path d="M16 16v6"></path></svg>
                    <span>Drizzle</span>
                  </button>
                  <button className={`rain-btn ${rainStatus === 'raining' ? 'active' : ''}`} onClick={() => setRainStatus('raining')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'raining' ? '#b91c1c' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 14v6"></path><path d="M12 16v6"></path><path d="M16 14v6"></path></svg>
                    <span>Raining</span>
                  </button>
                  <button className={`rain-btn ${rainStatus === 'heavy' ? 'active' : ''}`} onClick={() => setRainStatus('heavy')}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke={rainStatus === 'heavy' ? '#374151' : '#6b7280'} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path><path d="M20 14v6"></path></svg>
                    <span>Heavy rain</span>
                  </button>
                </div>
              </div>
              
              <div className="share-section">
                <h4 className="share-section-title">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Crowd level
                </h4>
                
                <div className="crowd-display">
                  <div className="crowd-score" style={{ color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b' }}>
                    {crowdLevel}/10
                  </div>
                  <div className="crowd-text-container">
                    <div className="crowd-status" style={{ color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b' }}>
                      {crowdLevel <= 3 ? 'Easy entry' : crowdLevel <= 6 ? 'Moderate' : crowdLevel <= 8 ? 'Busy' : 'Very crowded'}
                    </div>
                    <div className="crowd-subtext">
                      {crowdLevel <= 3 ? 'Little or no queue right now.' : crowdLevel <= 6 ? 'A short queue, moving steadily.' : crowdLevel <= 8 ? 'Expect a wait, but it\'s moving.' : 'Long queue and a slower entry.'}
                    </div>
                  </div>
                </div>
                
                <div className="crowd-slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={crowdLevel} 
                    onChange={(e) => setCrowdLevel(parseInt(e.target.value))} 
                    className="crowd-slider" 
                    style={{
                      background: `linear-gradient(to right, ${crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'} 0%, ${crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'} ${(crowdLevel - 1) * 11.1}%, #e5e7eb ${(crowdLevel - 1) * 11.1}%, #e5e7eb 100%)`,
                      color: crowdLevel <= 3 ? '#16a34a' : crowdLevel <= 6 ? '#b45309' : crowdLevel <= 8 ? '#b91c1c' : '#991b1b'
                    }}
                  />
                  <div className="slider-labels">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                  </div>
                </div>
              </div>
              
              <div className="share-popup-footer">
                <div className="share-warning">◈ Move closer to the pandal or mark a recent visit to update.</div>
                <button className="share-submit-btn" disabled>➤ Submit update</button>
                <button className="share-not-now-btn" onClick={() => setShowUpdatePopup(false)}>Not now</button>
              </div>
            </div>
          </div>
        )}

      </div>
  );
};

export default MapPage;

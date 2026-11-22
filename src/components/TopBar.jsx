import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';
import { FaBell } from 'react-icons/fa';
import { Menu } from 'lucide-react';
import { fetchProfile } from '../api/services';
import { getToken } from '../utils/auth';
import { BASE_URL } from '../api/frontend';

const pages = [
  { name: 'Home', path: '/v1/home' },
  { name: 'Profile', path: '/v1/profile/profile' },
  { name: 'Onboard Dashboard', path: '/v1/employeehub/dashboard' },
  { name: 'Assets Dashboard', path: '/v1/assets/dashboard' },
  { name: 'Attendance Daily', path: '/v1/attendance/daily' },
  { name: 'Leaves Apply', path: '/v1/leaves/apply' },
];

const TopBar = ({ onOpenMobileMenu }) => {
  const [time, setTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  const token = getToken();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchProfile(token);
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setFilteredPages([]);
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim() === '') {
      setFilteredPages([]);
      return;
    }

    const filtered = pages.filter((page) =>
      page.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredPages(filtered);
  };

  const onSelectPage = (path) => {
    setSearchTerm('');
    setFilteredPages([]);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    // const postLogoutRedirectUri = encodeURIComponent(`${BASE_URL}/login`);
    // window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;
    navigate('/login');
  };


  const renderAvatar = () => {
    if (profile?.profileImageUrl && !imageError) {
      return (
        <img
          className="shrink-0 rounded-full"
          style={{ width: '40px', height: '40px' }}
          src={profile.profileImageUrl}
          alt="Avatar"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      );
    }

    const initials = (() => {
      if (!profile?.fullName) return 'U';
      const words = profile.fullName.trim().split(/\s+/);
      if (words.length === 1) {
        return words[0][0].toUpperCase();
      } else if (words.length === 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      } else {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
      }
    })();

    return (
      <div
        className="shrink-0 rounded-full bg-gray-500 text-white font-bold flex items-center justify-center"
        style={{ width: '40px', height: '40px' }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-mobile-menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={22} color="#FFFFFF" />
        </button>

        <input
          ref={searchRef}
          type="text"
          className="topbar-search"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearchChange}
          autoComplete="off"
        />
        {filteredPages.length > 0 && (
          <div className="search-dropdown">
            {filteredPages.map((page) => (
              <div
                key={page.name}
                className="search-item"
                onMouseDown={() => onSelectPage(page.path)} // ← FIX
              >
                {page.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-right" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => navigate('/v2/home')}
          className="topbar-v2-btn"
        >
          <span className="topbar-v2-label-full">✨ Modern Theme (v2)</span>
          <span className="topbar-v2-label-short">✨ v2</span>
        </button>

        <div className="topbar-time flex flex-col items-end leading-tight shrink-0">
          <p className="text-xs font-semibold text-white/95 m-0">{time.toDateString()}</p>
          <p className="text-[11px] font-mono text-[#60F61B] font-bold m-0 mt-0.5">{time.toLocaleTimeString()}</p>
        </div>

        <div className="flex items-center" style={{ gap: '12px' }}>
          <button
            type="button"
            className="topbar-notif-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              width: '36px',
              height: '36px',
              border: '1px solid #C3B7FF',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Notifications"
          >
            <FaBell size={20} color="#C3B7FF" />
          </button>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            ref={profileRef}
          >
            {renderAvatar()}
            <div className="grow">
              <h1 className="text-white text-base font-semibold leading-tight">
                {profile?.fullName || 'Loading...'}
              </h1>
              <p className="text-sm text-gray-300">
                {profile?.position || ''}
              </p>
            </div>
          </div>

          {dropdownVisible && (
            <div className="dropdown-panel absolute right-4 mt-2 bg-white text-black rounded shadow-md z-50 min-w-[160px]">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/profile/profile')}
              >
                View Profile
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';
import { fetchProfile } from '../../api/services';
import { getToken } from '../../utils/auth';
import { Skeleton } from '../skeletons/Skeleton';

function ProfileCard({ user }) {
  const [profileData, setProfileData] = useState(user || null);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const defaultUser = {
    profileImageUrl: '',
    fullName: 'N/A',
    employeeId: 'N/A',
    email: 'N/A',
    position: 'N/A',
    reportingManagerName: 'N/A',
    dateOfJoining: new Date(),
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = getToken(); 
        if (!token) throw new Error('User token not found');

        const profile = await fetchProfile(token);
        setProfileData(profile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      loadProfile();
    }
  }, [user]);

  const handleClick = () => {
    navigate("/profile/profile");
  };

  const displayData = profileData || defaultUser;

  const renderAvatar = () => {
    const hasImage = displayData.profileImageUrl && !imageError;
  
    if (hasImage) {
      return (
        <img
          src={displayData.profileImageUrl}
          alt="Profile"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      );
    }
  
    const initials = (() => {
      if (!displayData?.fullName) return 'U';
    
      const words = displayData.fullName.trim().split(/\s+/);
      if (words.length === 1) {
        return words[0][0].toUpperCase();
      } else if (words.length === 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      } else {
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
      }
    })();
    
  
    return (
      <div className="profile-image initials">
        <div className="icon-placeholder">
          <h1>{initials}</h1>
        </div>
      </div>
    );
  };
  

  if (loading) {
    return (
      <div className="profile_card" style={{ minHeight: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <Skeleton width="54px" height="54px" radius="50%" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
            <Skeleton width="60%" height="16px" />
            <Skeleton width="45%" height="11px" />
            <Skeleton width="30%" height="10px" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '14px 0' }}>
          <Skeleton width="90%" height="11px" />
          <Skeleton width="75%" height="11px" />
          <Skeleton width="65%" height="11px" />
        </div>
        <Skeleton width="100%" height="34px" radius="6px" />
      </div>
    );
  }
  if (error) return <div className="profile_card error">{error}</div>;

  return (
    <div className="profile_card">
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-image">
            {renderAvatar()}
          </div>
          <div className="employee-details">
            <h4 className="profile-name">{displayData.fullName || 'N/A'}</h4>
            <span>{displayData.email || 'N/A'}</span>
            <span>{displayData.employeeId || 'N/A'}</span>
          </div>
        </div>

        <div className="profile-right">
          <p>
            <span>Position:</span> <span>{displayData.position || 'N/A'}</span>
          </p>
          <p>
            <span>Reporting Manager:</span> <span>{displayData.reportingManagerName || 'N/A'}</span>
          </p>
          <p>
            <span>Date of Joining:</span>{' '}
            <span>
              {displayData.dateOfJoining
                ? new Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }).format(new Date(displayData.dateOfJoining))
                : 'N/A'}
            </span>
          </p>
          <button className="check-profile-button" onClick={handleClick}>
            Check Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

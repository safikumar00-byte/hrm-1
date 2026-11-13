import { useState, useEffect, useRef, useMemo } from 'react';
import { getToken } from '../../utils/auth';
import { fetchClockStatus, clockIn, clockOut, fetchTodaySessions } from '../../api/clock';
import { fetchProfile } from '../../api/services';
import { fetchAnnouncements, fetchEvents } from '../../api/general';
import { getUpcomingBirthdays } from '../../api/employee';
import { getCurrentLocation, reverseGeocode } from '../../utils/locationUtils';
import { parseUTCToLocalDate } from '../../utils/dateUtils';
import { getWeekDateRange, formatDateRange } from '../../utils/dateRangeUtils';

export function useDashboardData() {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      return {
        fullName: parsed?.fullName || 'Admin User',
        firstName: parsed?.firstName || 'Admin',
        employeeId: parsed?.employeeId || 'EMP001',
        email: parsed?.email || 'admin@cvm.com',
        position: parsed?.position || 'Lead HR Architect / Platform Admin',
        department: parsed?.department || 'People Operations & Tech',
        reportingManagerName: parsed?.reportingManagerName || 'Executive Director',
        dateOfJoining: parsed?.dateOfJoining || '2024-01-15',
        profileImageUrl: parsed?.profileImageUrl || '',
        performanceStatus: 'Top Performer',
      };
    } catch {
      return {
        fullName: 'Admin User',
        firstName: 'Admin',
        employeeId: 'EMP001',
        email: 'admin@cvm.com',
        position: 'Lead HR Architect / Platform Admin',
        department: 'People Operations & Tech',
        reportingManagerName: 'Executive Director',
        dateOfJoining: '2024-01-15',
        profileImageUrl: '',
        performanceStatus: 'Top Performer',
      };
    }
  });

  // 2. Time Tracker State
  const [clockedIn, setClockedIn] = useState(true);
  const [seconds, setSeconds] = useState(14821); // ~04:07:01
  const [locationMessage, setLocationMessage] = useState('San Francisco HQ • Office IP Verified');
  const [clockLoading, setClockLoading] = useState(false);
  const [lastWeekSummary, setLastWeekSummary] = useState({
    range: 'Nov 02 - Nov 08',
    hours: '40.5 hrs',
  });

  // 3. Weekly Attendance Data
  const [attendanceData, setAttendanceData] = useState([
    { day: 'Mon', hours: 8.5, isToday: false },
    { day: 'Tue', hours: 8.0, isToday: false },
    { day: 'Wed', hours: 8.2, isToday: false },
    { day: 'Thu', hours: 7.8, isToday: true },
    { day: 'Fri', hours: 8.0, isToday: false },
    { day: 'Sat', hours: 0.0, isToday: false },
    { day: 'Sun', hours: 0.0, isToday: false },
  ]);

  // 4. Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Annual Company Offsite 2026',
      description: 'Mark your calendars! The annual winter summit will take place next month in Lake Tahoe.',
      date: '2 hours ago',
      category: 'Company',
      categoryColor: 'primary',
    },
    {
      id: 2,
      title: 'New Health & Wellness Benefits',
      description: 'Annual wellness reimbursements and gym allowances are now open for employee enrollment.',
      date: 'Yesterday',
      category: 'Benefits',
      categoryColor: 'purple',
    },
    {
      id: 3,
      title: 'HRMS Platform 2.0 Released',
      description: 'Welcome to the upgraded HRMS interface with enhanced payroll, attendance, and live telemetry.',
      date: 'Nov 10',
      category: 'Product',
      categoryColor: 'blue',
    },
  ]);

  // 5. Events State
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Quarterly All-Hands Meeting',
      date: 'Nov 14, 2026',
      time: '10:00 AM - 11:30 AM',
      type: 'Townhall',
      location: 'Auditorium A & Zoom',
    },
    {
      id: 2,
      title: 'Tech Talk & Demo Day',
      date: 'Nov 18, 2026',
      time: '03:30 PM - 05:00 PM',
      type: 'Engineering',
      location: 'Conference Room B',
    },
    {
      id: 3,
      title: 'Design Review & Architecture Sync',
      date: 'Nov 20, 2026',
      time: '02:00 PM - 03:00 PM',
      type: 'Design',
      location: 'Huddle Room 4',
    },
  ]);

  // 6. Birthdays State
  const [birthdays, setBirthdays] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      department: 'Product Design',
      date: 'Today! 🎂',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      id: 2,
      name: 'Michael Chen',
      department: 'Core Infrastructure',
      date: 'Tomorrow',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: 3,
      name: 'Emily Davis',
      department: 'People Operations',
      date: 'Nov 18',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
  ]);

  // Dynamic live timer ticking
  useEffect(() => {
    let interval = null;
    if (clockedIn) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedIn]);

  // Fetch real data on mount
  useEffect(() => {
    const token = getToken();

    // 1. Fetch Profile
    if (token) {
      fetchProfile(token)
        .then((data) => {
          if (data && (data.fullName || data.employeeId)) {
            setProfile((prev) => ({
              ...prev,
              fullName: data.fullName || prev.fullName,
              employeeId: data.employeeId || prev.employeeId,
              email: data.email || prev.email,
              position: data.position || prev.position,
              department: data.department || prev.department,
              reportingManagerName: data.reportingManagerName || prev.reportingManagerName,
              dateOfJoining: data.dateOfJoining || prev.dateOfJoining,
              profileImageUrl: data.profileImageUrl || prev.profileImageUrl,
            }));
          }
        })
        .catch(() => {});
    }

    // 2. Fetch Sessions & Clock Status
    if (token) {
      fetchTodaySessions(token)
        .then((data) => {
          if (data && data.currentStatus) {
            setClockedIn(data.currentStatus === 'Clocked In');
          }
        })
        .catch(() => {});

      fetchClockStatus(token)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Update attendance data if available
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const todayStr = new Date().toISOString().split('T')[0];
            const mapped = daysOfWeek.map((day) => {
              const found = data.find((r) => {
                if (!r.date) return false;
                const d = new Date(r.date);
                return d.toLocaleDateString('en-US', { weekday: 'short' }) === day;
              });
              return {
                day,
                hours: found ? parseFloat(found.totalHours || 0) : 0,
                isToday: found ? found.date.startsWith(todayStr) : false,
              };
            });
            if (mapped.some((m) => m.hours > 0)) {
              setAttendanceData(mapped);
            }
          }
        })
        .catch(() => {});
    }

    // 3. Fetch Announcements
    fetch('/api/general/announcements')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(
            data.map((item, idx) => ({
              id: item.id || idx,
              title: item.title,
              description: item.description,
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent',
              category: item.category || (idx === 0 ? 'Company' : idx === 1 ? 'Benefits' : 'General'),
              categoryColor: idx % 3 === 0 ? 'primary' : idx % 3 === 1 ? 'purple' : 'blue',
            }))
          );
        }
      })
      .catch(() => {});

    // 4. Fetch Events
    fetch('/api/general/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});

    // 5. Fetch Birthdays
    if (token) {
      getUpcomingBirthdays(token)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setBirthdays(
              data.slice(0, 5).map((emp, i) => ({
                id: emp.id || i,
                name: emp.fullName || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Colleague',
                department: emp.department || 'Enterprise Member',
                date: 'Upcoming',
                avatar: emp.profileImageUrl || '',
              }))
            );
          }
        })
        .catch(() => {});
    }
  }, []);

  // Clock In / Clock Out Handlers
  const handleToggleClock = async () => {
    setClockLoading(true);
    const token = getToken();

    try {
      if (clockedIn) {
        // Clock Out
        if (token) {
          try {
            const coords = await getCurrentLocation().catch(() => ({ latitude: 37.7749, longitude: -122.4194 }));
            const locName = await reverseGeocode(coords.latitude, coords.longitude).catch(() => 'Office HQ');
            setLocationMessage(locName);
            await clockOut(token, {
              clockOutlatitude: coords.latitude,
              clockOutlongitude: coords.longitude,
            });
          } catch {
            // fallback
          }
        }
        setClockedIn(false);
      } else {
        // Clock In
        if (token) {
          try {
            const coords = await getCurrentLocation().catch(() => ({ latitude: 37.7749, longitude: -122.4194 }));
            const locName = await reverseGeocode(coords.latitude, coords.longitude).catch(() => 'Office HQ');
            setLocationMessage(locName);
            await clockIn(token, {
              clockInlatitude: coords.latitude,
              clockInlongitude: coords.longitude,
            });
          } catch {
            // fallback
          }
        }
        setClockedIn(true);
      }
    } finally {
      setClockLoading(false);
    }
  };

  return {
    profile,
    clockedIn,
    seconds,
    locationMessage,
    clockLoading,
    handleToggleClock,
    lastWeekSummary,
    attendanceData,
    announcements,
    events,
    birthdays,
  };
}

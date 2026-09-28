import { useState } from 'react';
import ProfileSelect from '@/screens/ProfileSelect';
import AddProfile from '@/screens/AddProfile';
import Dashboard from '@/screens/Dashboard';
import LessonScreen from '@/screens/LessonScreen';
import TimeUp from '@/screens/TimeUp';
import Settings from '@/screens/Settings';
import PlacementTest from '@/screens/PlacementTest';
import { getOrCreateTodayLesson, getChildById } from '@/lib/api';
import type { ChildProfile, Lesson, Screen } from '@/types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('profiles');
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [todayLesson, setTodayLesson] = useState<Lesson | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  async function handleSelectChild(child: ChildProfile) {
    setSelectedChild(child);

    // New profiles that haven't taken the placement test go to Placement Test first
    if (!child.placement_done) {
      setScreen('placement-test');
      return;
    }

    // Existing profiles go straight to dashboard
    setLessonLoading(true);
    setLessonError(null);
    setScreen('dashboard');
    try {
      const lesson = await getOrCreateTodayLesson(child);
      setTodayLesson(lesson);
    } catch (e) {
      setLessonError(e instanceof Error ? e.message : 'Could not load lesson');
    } finally {
      setLessonLoading(false);
    }
  }

  async function handlePlacementDone(updatedChild: ChildProfile) {
    // After placement test, load today's lesson and go to dashboard
    setSelectedChild(updatedChild);
    setLessonLoading(true);
    setLessonError(null);
    setScreen('dashboard');
    try {
      const lesson = await getOrCreateTodayLesson(updatedChild);
      setTodayLesson(lesson);
    } catch (e) {
      setLessonError(e instanceof Error ? e.message : 'Could not load lesson');
    } finally {
      setLessonLoading(false);
    }
  }

  function handleBackToProfiles() {
    setSelectedChild(null);
    setTodayLesson(null);
    setScreen('profiles');
  }

  async function handleBackFromLesson() {
    // Refresh child data from DB to get updated stars (reward was already saved)
    if (selectedChild) {
      const fresh = await getChildById(selectedChild.id);
      if (fresh) setSelectedChild(fresh);
    }
    setScreen('dashboard');
  }

  if (screen === 'profiles') {
    return (
      <ProfileSelect
        onSelectChild={handleSelectChild}
        onAddProfile={() => setScreen('add-profile')}
        onOpenSettings={() => setScreen('settings')}
      />
    );
  }

  if (screen === 'add-profile') {
    return (
      <AddProfile
        onBack={() => setScreen('profiles')}
        onCreated={(child) => handleSelectChild(child)}
      />
    );
  }

  if (screen === 'settings') {
    return <Settings onBack={() => setScreen('profiles')} />;
  }

  if (screen === 'time-up' && selectedChild) {
    return <TimeUp child={selectedChild} onBack={handleBackToProfiles} />;
  }

  if (screen === 'placement-test' && selectedChild) {
    return (
      <PlacementTest
        child={selectedChild}
        onDone={handlePlacementDone}
        onBack={handleBackToProfiles}
      />
    );
  }

  if (screen === 'lesson' && selectedChild && todayLesson) {
    return (
      <LessonScreen
        child={selectedChild}
        lesson={todayLesson}
        onBack={handleBackFromLesson}
        onComplete={(starsEarned) => {
          if (selectedChild) {
            setSelectedChild({ ...selectedChild, stars: selectedChild.stars + starsEarned });
          }
        }}
      />
    );
  }

  if (screen === 'dashboard' && selectedChild) {
    if (lessonLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl animate-spin-slow mb-4">🦸</div>
            <p className="text-white text-2xl font-black">Đang chuẩn bị phiêu lưu...</p>
          </div>
        </div>
      );
    }
    if (lessonError || !todayLesson) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center max-w-md">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-blue-200 font-bold text-lg mb-4">
              {lessonError || 'Không thể tải bài học hôm nay'}
            </p>
            <button
              onClick={handleBackToProfiles}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black rounded-2xl px-6 py-3 hover:scale-105 transition-transform"
            >
              Quay lại
            </button>
          </div>
        </div>
      );
    }
    return (
      <Dashboard
        child={selectedChild}
        lesson={todayLesson}
        onStartLesson={() => setScreen('lesson')}
        onBack={handleBackToProfiles}
        onTimeUp={() => setScreen('time-up')}
      />
    );
  }

  return (
    <ProfileSelect
      onSelectChild={handleSelectChild}
      onAddProfile={() => setScreen('add-profile')}
      onOpenSettings={() => setScreen('settings')}
    />
  );
}

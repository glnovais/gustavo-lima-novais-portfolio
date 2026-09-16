import { ArrowRight, BookOpenCheck, GraduationCap } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function EducationRoadmap() {
  const { t } = useI18n();
  const roadmap = [[t('roadmap.infrastructureA'), t('roadmap.infrastructureB')], [t('roadmap.networkA'), t('roadmap.networkB')], [t('roadmap.opsA'), t('roadmap.opsB')], [t('roadmap.techA'), t('roadmap.techB')]];

  return <section className="section"><div className="container-shell">
    <div className="grid xl:grid-cols-2 gap-5">
      <div className="panel p-6 md:p-7">
        <div className="section-kicker">{t('education.kicker')}</div>
        <GraduationCap size={28} className="text-cyan-300 mt-2"/>
        <h2 className="text-2xl font-semibold mt-6">{t('education.title')}</h2>
        <p className="text-slate-300 mt-2 font-medium">{t('education.school')}</p>
        <span className="badge mt-4"><i className="badge-dot status-pulse"/>{t('education.status')}</span>
        <p className="text-slate-400 leading-7 mt-5">{t('education.copy')}</p>
      </div>

      <div className="panel p-6 md:p-7">
        <div className="section-kicker">{t('roadmap.kicker')}</div>
        <h2 className="text-2xl font-semibold mt-2">{t('roadmap.title')}</h2>
        <div className="space-y-3 mt-7">
          {roadmap.map(([a, b]) => <div key={a} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl border border-white/5 p-4"><span className="text-sm">{a}</span><ArrowRight size={15} className="text-cyan-300"/><span className="text-sm text-cyan-200">{b}</span></div>)}
        </div>
      </div>
    </div>

    <div className="panel p-6 md:p-7 mt-5">
      <div className="section-kicker">{t('courses.kicker')}</div>
      <BookOpenCheck size={24} className="text-cyan-300"/>
      <h2 className="text-xl font-semibold mt-5">{t('courses.title')}</h2>
      <div className="grid md:grid-cols-2 gap-3 mt-5">
        <div className="course-row"><strong>{t('courses.course1')}</strong><span>{t('courses.provider')}</span></div>
        <div className="course-row"><strong>{t('courses.course2')}</strong><span>{t('courses.provider')}</span></div>
      </div>
    </div>
  </div></section>;
}
